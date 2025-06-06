from flask import Flask, render_template, request, jsonify
import numpy as np
import pickle
import pandas as pd
from sklearn.preprocessing import StandardScaler
import onnxruntime as ort
from flask_cors import CORS


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})



def load_model(modelfile):
    loaded_model = pickle.load(open(modelfile, 'rb'))
    return loaded_model


@app.route('/startup', methods=['POST', 'GET'])
def startup():
    try:
        print("start")
        return 'start'
    except Exception as e:
        return str(e)



@app.route('/predict_fertilizer', methods=['POST', 'GET'])
def predict_another():
    try:
        loaded_model = load_model('Models/fertilizer_model.pkl')

        data = request.get_json()
        features = [float(data[f]) for f in ['soil', 'crop', 'N', 'K', 'P']]
        df = pd.DataFrame([features])


        df.columns = ["Soil Type", "Crop Type", "Nitrogen", "Potassium", "Phosphorus"]
        features = np.array(features).reshape(1, -1)
        scaler = pickle.load(open('Models/fertilizer_scaler.pkl', 'rb'))
        scaled_features = scaler.transform(features)
        prediction = loaded_model.predict(scaled_features)
        prediction = str(prediction)
        
        

        result = prediction[2:-2] + " is the predicted fertilizer"
    except Exception as e:
        result = e
    return str(result)


@app.route('/predict', methods=['GET','POST'])
def predict():
    try:
        # collection = create_collection_mongo()
        # loaded_model = load_model('Models/finalized_model.pkl')
        scaler = pickle.load(open('Models/finalized_scaler.pkl', 'rb'))

        session = ort.InferenceSession("Models/finalized_model.onnx")
        

        data = request.get_json()
        features = [float(data[f]) for f in ['N', 'P', 'K', 'temp', 'humidity']]

        features = np.array(features).reshape(1, -1)

        scaled_features = scaler.transform(features).astype(np.float32)

        # input_tensor = torch.tensor(scaled_features, dtype=torch.float32)
        input_name = session.get_inputs()[0].name
        output = session.run(None, {input_name: scaled_features})[0]
        # output = loaded_model(input_tensor)
        # result = output.argmax(dim=1).item()
        result = int(np.argmax(output))
        class_mapping = {'apple': 0, 'banana': 1, 'blackgram': 2, 'chickpea': 3, 'coconut': 4, 'coffee': 5, 'cotton': 6, 'grapes': 7, 'jute': 8, 'kidneybeans': 9, 'lentil': 10, 'maize': 11, 'mango': 12, 'mothbeans': 13, 'mungbean': 14, 'muskmelon': 15, 'orange': 16, 'papaya': 17, 'pigeonpeas': 18, 'pomegranate': 19, 'rice': 20, 'watermelon': 21}
        predicted_crop = [crop for crop, label in class_mapping.items() if label == result][0]

        result = f"{predicted_crop} is the predicted crop"
    except Exception as e:
        result = e
        print(e)

    return str(result)


if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)


Live link: https://fieldly-ai.vercel.app/


# Fieldly

**Fieldly** is a full-stack web application combining a **React (Vite)** frontend and a **Flask** backend, designed to provide a fast, modern, and scalable project.

## 📂 Project Structure
```
/Fieldly
/frontend → React + Vite frontend
/backend → Flask backend
```
---

## 🚀 Getting Started

### Prerequisites

- **Node.js** - v20.18.1
- **Python** - 3.11.4
- **pip**, **pipenv**, or **poetry** (for Python dependencies)

---

## 🌐 Frontend (React + Vite)

### Setup
1. Navigate to the frontend folder:
```bash
cd frontend
```
2.Install dependencies:
```bash
npm install
```
3. Start the development server:
```
npm run dev
```
4. Open app in your browser
```
http://localhost:5173
```

# 🛠️ Fieldly Backend

This is the **Flask backend** for the Fieldly application.

1. (Optional) Create a virtual environment:
```
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

```

2. Install dependencies:
```
pip install -r requirements.txt
```

3. Run the Flask development server:

```
python app.py
```

The server will start at: http://127.0.0.1:5000

To ensure the React frontend correctly communicates with the Flask backend, you need to update the Axios requests in the **Crop Prediction** and **Fertilizer** components.
change 
```
axios.post('https://fieldly-ai-v5e3.onrender.com/predict')
```
to 
```
axios.post('http://localhost:5000/predict')
```

in CropPredict,jsx and FertilizerPredict.jsx 




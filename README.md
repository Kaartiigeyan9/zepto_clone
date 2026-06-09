# Zepto Clone

This workspace contains a FastAPI backend and a React (Vite) frontend implementing a Zepto-style quick-commerce UI.

Backend (FastAPI):

- Location: `backend/`
- Run:

```powershell
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

API endpoints:
- `GET /products` — returns sample product list (supports `category` and `q` query params)

Frontend (React + Vite):

- Location: `frontend/`
- Run:

```powershell
cd frontend
npm install
npm run dev
```

Notes:
- App is mobile-first (max width ~390px) and uses a simple `CartContext` for cart state.
- Product images use `https://placehold.co/` placeholders.
# zepto_clone
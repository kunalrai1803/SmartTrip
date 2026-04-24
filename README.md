# SmartTrip Travel Planner

SmartTrip is a production-ready, beginner-friendly full-stack travel planner for Indian cities. It is a rule-based travel planner that generates trip schedules based on user input. Users can sign up, choose a city, select places to visit, and instantly get a day-wise itinerary with restaurant, food, and transport suggestions.

## Tech Stack

- Frontend: React + Vite + Tailwind CSS
- Backend: Flask + REST APIs
- Data: Local JSON dataset
- Deployment: Vercel (frontend) + Render (backend)

## Project Structure

```text
Smart_Trip/
├── backend/
├── dataset/
├── frontend/
├── render.yaml
└── README.md
```

## Features

- Login and signup with local JSON storage
- State and city selection
- Budget and trip duration input
- Famous places selection with checkboxes
- Rule-based plan generation
- Day-wise balanced schedule
- Budget-aware restaurant recommendations
- Local food highlights
- Simple transport suggestions
- Responsive fintech-inspired UI with glassmorphism

## Local Setup

### 1. Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Backend runs on `http://localhost:5000`.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

## Environment Variables

### Backend

Create `backend/.env` from `backend/.env.example`.

```env
FLASK_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173
```

### Frontend

Create `frontend/.env` from `frontend/.env.example`.

```env
VITE_API_BASE_URL=http://localhost:5000
```

## API Endpoints

- `POST /signup`
- `POST /login`
- `GET /locations`
- `GET /get_places?state=...&city=...`
- `POST /generate_plan`

## Deployment

### Frontend on Vercel

1. Import the `frontend` folder into Vercel.
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variable:
   - `VITE_API_BASE_URL=https://your-render-backend.onrender.com`

### Backend on Render

1. Create a new Web Service from the repository.
2. Set root directory to `backend`
3. Build command:

```bash
pip install -r requirements.txt
```

4. Start command:

```bash
gunicorn app:app
```

5. Add environment variables:
   - `FLASK_ENV=production`
   - `FRONTEND_URL=https://your-vercel-app.vercel.app`

`render.yaml` is included for easy setup.

## Rule-Based Planning Logic

- Schedule Generator:
  - Splits selected places evenly across trip days
  - Prevents one day from becoming overloaded
- Transport Suggestion:
  - Nearby: Walk / Auto
  - Medium: Metro / Bike
  - Far: Taxi / Bus
- Budget Logic:
  - Low budget: casual and value-focused suggestions
  - Medium budget: balanced recommendations
  - High budget: premium dining and convenience options

## Notes

- No paid APIs
- No database required
- Clean modular code for easy learning and extension
"# SmartTrip" 

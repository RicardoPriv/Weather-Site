# Weather App

A simple Weather UI built with **vanilla JS** + **Vite**. Users can search for a city and view **today’s weather** (and a basic **7-day forecast** section).

## Features
- City search form
- Loading spinner while fetching
- Weather “card” UI for today
- 7-day forecast rendering (template + CSS support)
- Error state UI:  
  **“Error: Country Could Not Be Found”** / **“Please Try Again”**

## Tech Stack
- Frontend: **Vite**
- Language: **JavaScript (ES modules)**
- Styling: **CSS files in `src/styles/`**

## Project Structure (high level)
- `frontend/src/main.js` — App entry + mounts components
- `frontend/src/components/`
  - `searchForm.js` — handles submit + calls the weather API
  - `loadingSpin.js` — loading UI tied to store state
  - `weatherDisplay.js` — renders weather today/forecast templates
  - `errorMessage.js` — renders error UI tied to store state
  - `templates/weatherHtml.js` — HTML template functions for today/forecast
- `frontend/src/api/weather.js` — fetch wrapper (Visual Crossing API)
- `frontend/src/store/store.js` — app state container

## Getting Started

### 1) Install dependencies
```bash
cd frontend
npm install
```

### 2) Run dev server
```bash
npm run dev -- --host 0.0.0.0 --strictPort --port 5173
```

Then open:
- http://localhost:5173/

### 3) Build for production
```bash
cd frontend
npm run build
```

## Configuration
API calls are made in:
- `frontend/src/api/weather.js`

It uses:
- `API_URL` = Visual Crossing timeline endpoint
- `API_KEY` = API key string (currently hardcoded in that file)

> If you change the API key, edit `frontend/src/api/weather.js`.

## How it works
1. User submits the form in `searchForm.js`
2. `fetchWeatherData()` calls the Visual Crossing API
3. The store updates state:
   - `LOADING` → spinner shown
   - `SUCCESS` → weather UI shown
   - `ERROR` → error UI shown
4. `weatherDisplay.js` subscribes to store updates and rerenders the weather template

## Notes / Known limitations
- The forecast template section is present, but data mapping may be incomplete depending on the Visual Crossing response shape.
- The API key is currently hardcoded in the repo file (not ideal for production).

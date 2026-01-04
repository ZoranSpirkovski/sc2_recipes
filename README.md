# SC2 Terran Production Recipe Calculator

An interactive web application for StarCraft II Terran players to design "production recipes" - configurations of buildings and units that can be continuously produced given a specific economy.

## Features

- Set number of bases and workers per base
- Toggle Terran units on/off with building counts
- Real-time calculation of resource balance (income vs spending)
- Color-coded feedback (green=surplus, yellow=optimal, red=deficit)
- Auto-calculated supply depot requirements
- Generate professional PDF recipe cards for printing

## Quick Start

### Backend (Python/Flask)

```bash
cd backend
pip install -r requirements.txt
python app.py
```

The backend runs on `http://localhost:5000`.

### Frontend (React/Vite)

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:3000` and proxies API requests to the backend.

## Usage

1. **Set Economy**: Adjust bases and workers per base
2. **Select Units**: Check units you want to produce and set building counts
3. **Monitor Balance**: Watch the resource balance update in real-time
4. **Generate PDF**: Click "Generate PDF" to download a printable recipe card

## Tech Stack

- **Frontend**: React 18, Vite
- **Backend**: Python 3, Flask, ReportLab
- **PDF Generation**: ReportLab (server-side)

## API Endpoints

- `GET /api/units` - Get units grouped by building
- `GET /api/unit-data` - Get raw unit data
- `POST /api/calculate` - Calculate production stats for a recipe
- `POST /api/generate-pdf` - Generate and download PDF for a recipe

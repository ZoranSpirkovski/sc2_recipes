#!/bin/bash

# SC2 Recipe Calculator - Startup Script
# Starts both backend (Flask) and frontend (Vite) servers

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Starting SC2 Recipe Calculator..."
echo ""

# Check for Python dependencies
if ! python -c "import flask, reportlab" 2>/dev/null; then
    echo "Installing Python dependencies..."
    pip install -r "$SCRIPT_DIR/backend/requirements.txt" -q
fi

# Check for Node dependencies
if [ ! -d "$SCRIPT_DIR/frontend/node_modules" ]; then
    echo "Installing Node dependencies..."
    cd "$SCRIPT_DIR/frontend" && npm install
fi

# Start backend in background
echo "Starting backend on http://localhost:5000..."
cd "$SCRIPT_DIR/backend"
python app.py &
BACKEND_PID=$!

# Give backend a moment to start
sleep 1

# Start frontend
echo "Starting frontend on http://localhost:3000..."
cd "$SCRIPT_DIR/frontend"
npm run dev &
FRONTEND_PID=$!

echo ""
echo "Both servers running!"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop both servers"

# Cleanup function
cleanup() {
    echo ""
    echo "Shutting down..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

trap cleanup SIGINT SIGTERM

# Wait for both processes
wait

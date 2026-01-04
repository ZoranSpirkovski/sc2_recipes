@echo off
REM SC2 Recipe Calculator - Startup Script for Windows
REM Starts both backend (Flask) and frontend (Vite) servers

echo Starting SC2 Recipe Calculator...
echo.

REM Get the directory where this script is located
set SCRIPT_DIR=%~dp0

REM Check and install Python dependencies
python -c "import flask, reportlab" 2>nul
if errorlevel 1 (
    echo Installing Python dependencies...
    pip install -r "%SCRIPT_DIR%backend\requirements.txt" -q
)

REM Check and install Node dependencies
if not exist "%SCRIPT_DIR%frontend\node_modules" (
    echo Installing Node dependencies...
    cd /d "%SCRIPT_DIR%frontend"
    call npm install
)

REM Start backend in new window
echo Starting backend on http://localhost:5000...
start "SC2 Backend" cmd /c "cd /d "%SCRIPT_DIR%backend" && python app.py"

REM Wait a moment for backend to start
timeout /t 2 /nobreak >nul

REM Start frontend in new window
echo Starting frontend on http://localhost:3000...
start "SC2 Frontend" cmd /c "cd /d "%SCRIPT_DIR%frontend" && npm run dev"

echo.
echo Both servers running!
echo   Frontend: http://localhost:3000
echo   Backend:  http://localhost:5000
echo.
echo Close the server windows to stop, or press any key to open the app...
pause >nul

start http://localhost:3000

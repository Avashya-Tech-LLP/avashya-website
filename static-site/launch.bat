@echo off
echo Starting Avashya Static Website...
echo.
echo Opening browser at http://localhost:8080
echo.
echo Press Ctrl+C to stop the server
echo.

start http://localhost:8080
python -m http.server 8080

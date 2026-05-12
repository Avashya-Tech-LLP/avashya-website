#!/bin/bash

echo "Starting Avashya Static Website..."
echo ""
echo "Opening browser at http://localhost:8080"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Try to open the browser
if command -v xdg-open > /dev/null; then
    xdg-open http://localhost:8080
elif command -v open > /dev/null; then
    open http://localhost:8080
fi

# Start the server
python3 -m http.server 8080

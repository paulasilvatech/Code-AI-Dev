#!/bin/bash

echo "🚀 Starting local web server for AI Code Development Workshop"
echo "=============================================="

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    echo "Starting server with Python 3..."
    echo "Server will be available at: http://localhost:8000"
    python3 -m http.server 8000
# Check if Python 2 is available
elif command -v python &> /dev/null; then
    echo "Starting server with Python 2..."
    echo "Server will be available at: http://localhost:8000"
    python -m SimpleHTTPServer 8000
# Check if Node.js is available
elif command -v npx &> /dev/null; then
    echo "Starting server with Node.js..."
    echo "Server will be available at: http://localhost:8080"
    npx http-server -p 8080
else
    echo "❌ No suitable web server found."
    echo "Please install Python or Node.js to run a local server."
    echo ""
    echo "Alternatively, you can open index.html directly in your browser."
    exit 1
fi 
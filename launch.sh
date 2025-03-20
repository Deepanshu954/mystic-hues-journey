
#!/bin/bash

# Print banner
echo "==================================================="
echo "🚀 Starting Mystic India Cultural Heritage Project"
echo "==================================================="

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js and npm first."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start the development server
echo "🚀 Starting development server..."
echo "The application will be available at: http://localhost:8080"
npm run dev

exit 0

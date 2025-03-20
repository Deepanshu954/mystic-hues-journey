
#!/bin/bash

# Print banner
echo "======================================================"
echo "🚀 Launching Mystic India - Cultural Journey Explorer"
echo "======================================================"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js and npm first."
    exit 1
fi

# Check for Node.js version
NODE_VERSION=$(node -v | cut -d. -f1 | sed 's/v//')
if [ "$NODE_VERSION" -lt 14 ]; then
    echo "❌ Node.js version 14 or higher is required. Current version: $(node -v)"
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start the Lovable development server
echo "🚀 Starting Lovable development server..."
echo "The application will be available at: http://localhost:8080"
npm run dev

exit 0

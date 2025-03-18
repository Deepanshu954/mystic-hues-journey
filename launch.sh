
#!/bin/bash

# Colors for pretty output
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

echo -e "${PURPLE}=======================================${NC}"
echo -e "${PURPLE}🕉️  Launching Mystic India Application${NC}"
echo -e "${PURPLE}=======================================${NC}"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js v16 or higher.${NC}"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d. -f1 | tr -d 'v')
if [ "$NODE_VERSION" -lt 16 ]; then
    echo -e "${RED}❌ Node.js version must be 16 or higher. Current version: $(node -v)${NC}"
    exit 1
fi

echo -e "${YELLOW}🔍 Checking dependencies...${NC}"

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ package.json not found. Make sure you're in the correct directory.${NC}"
    exit 1
fi

# Add build:dev script to package.json if it doesn't exist
if ! grep -q "\"build:dev\"" package.json; then
    echo -e "${YELLOW}⚠️ Adding build:dev script to package.json...${NC}"
    # Use Node.js to modify the package.json
    node -e "
        const fs = require('fs');
        const pkg = JSON.parse(fs.readFileSync('package.json'));
        pkg.scripts = pkg.scripts || {};
        pkg.scripts['build:dev'] = 'vite build --mode development';
        fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
    "
    echo -e "${GREEN}✅ build:dev script added to package.json${NC}"
fi

# Check for installed dependencies
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installing dependencies (this may take a while)...${NC}"
    npm install
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Failed to install dependencies. Please check your internet connection and try again.${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✅ Dependencies already installed${NC}"
    
    # Optional: Check if any dependencies need updating
    echo -e "${YELLOW}🔄 Checking for dependency updates...${NC}"
    npm outdated --depth=0
fi

# Make script executable
chmod +x launch.sh

echo -e "\n${CYAN}=== Mystic India Application Information ===${NC}"
echo -e "${GREEN}• Theme:${NC} Light/Dark mode toggle available in the top navigation"
echo -e "${GREEN}• Pages:${NC} Home, States, Culture, Festivals, Food"
echo -e "${GREEN}• Features:${NC} Interactive UI, Background Video, Responsive Design"
echo -e "${YELLOW}• Tip:${NC} For best experience, view in a modern browser with good internet connection\n"

echo -e "${YELLOW}🚀 Starting the application...${NC}"
echo -e "${CYAN}The application will be available at: ${GREEN}http://localhost:5173${NC}\n"

# Start the development server with improved output
npm run dev



#!/usr/bin/env node

/**
 * Mystic India Application Launcher
 * This script provides a convenient way to start the application
 * and handles common startup issues.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');
const open = require('open');

// Display banner
console.log('\n\x1b[1;35m╔════════════════════════════════════════════════════════════╗');
console.log('║                                                            ║');
console.log('║  🕉️  Mystic India - Cultural Journey Explorer              ║');
console.log('║                                                            ║');
console.log('╚════════════════════════════════════════════════════════════╝\x1b[0m\n');

// Check for Node.js version
const nodeVersion = process.version.match(/^v(\d+)\./)[1];
if (Number(nodeVersion) < 16) {
  console.error('\x1b[31m❌ Node.js version 16 or higher is required. Current version:', process.version);
  console.log('Please update your Node.js installation: https://nodejs.org/\x1b[0m\n');
  process.exit(1);
}

// Path to node_modules
const nodeModulesPath = path.join(__dirname, 'node_modules');

// Check if dependencies are installed
if (!fs.existsSync(nodeModulesPath) || !fs.existsSync(path.join(nodeModulesPath, 'open'))) {
  console.log('\x1b[33m📦 Installing dependencies...\x1b[0m');
  try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('\x1b[32m✅ Dependencies installed successfully!\x1b[0m\n');
  } catch (error) {
    console.error('\x1b[31m❌ Failed to install dependencies. Error:', error.message, '\x1b[0m\n');
    process.exit(1);
  }
}

// Check if server is already running
function isPortInUse(port) {
  return new Promise((resolve) => {
    const server = http.createServer();
    server.once('error', () => {
      resolve(true);
    });
    server.once('listening', () => {
      server.close();
      resolve(false);
    });
    server.listen(port);
  });
}

// Check if server is already running on port 8080
isPortInUse(8080).then(async (inUse) => {
  if (inUse) {
    console.log('\x1b[36m🔄 App server is already running on port 8080\x1b[0m');
    console.log('\x1b[36m🌐 Opening http://localhost:8080 in your browser\x1b[0m\n');
    await open('http://localhost:8080');
  } else {
    // Start development server
    console.log('\x1b[36m🚀 Starting development server...\x1b[0m');
    console.log('\x1b[36m🌐 The application will be available at: http://localhost:8080\x1b[0m\n');

    try {
      execSync('npm run dev', { stdio: 'inherit' });
    } catch (error) {
      console.error('\x1b[31m❌ Failed to start development server. Error:', error.message, '\x1b[0m\n');
      process.exit(1);
    }
  }
});

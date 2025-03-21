#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

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
if (!fs.existsSync(nodeModulesPath)) {
  console.log('\x1b[33m📦 Installing dependencies...\x1b[0m');
  try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('\x1b[32m✅ Dependencies installed successfully!\x1b[0m\n');
  } catch (error) {
    console.error('\x1b[31m❌ Failed to install dependencies. Error:', error.message, '\x1b[0m\n');
    process.exit(1);
  }
}

// Start development server
console.log('\x1b[36m🚀 Starting development server...\x1b[0m');
console.log('\x1b[36m🌐 The application will be available at: http://localhost:8080\x1b[0m\n');

try {
  execSync('npm run dev', { stdio: 'inherit' });
} catch (error) {
  console.error('\x1b[31m❌ Failed to start development server. Error:', error.message, '\x1b[0m\n');
  process.exit(1);
}

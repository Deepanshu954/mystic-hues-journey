#!/usr/bin/env node

import { execSync, exec } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ANSI color codes for pretty console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  purple: '\x1b[35m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m'
};

// Pretty console logging
const log = {
  info: (msg) => console.log(colors.cyan, '📢', msg, colors.reset),
  success: (msg) => console.log(colors.green, '✅', msg, colors.reset),
  warning: (msg) => console.log(colors.yellow, '⚠️', msg, colors.reset),
  error: (msg) => console.log(colors.red, '❌', msg, colors.reset),
  title: (msg) => console.log('\n', colors.purple + colors.bright, msg, colors.reset, '\n')
};

// Check if a port is in use
const isPortInUse = (port) => {
  return new Promise((resolve) => {
    const server = http.createServer();
    server.once('error', () => resolve(true));
    server.once('listening', () => {
      server.close();
      resolve(false);
    });
    server.listen(port);
  });
};

// Check if all required files exist
const checkRequiredFiles = () => {
  const requiredFiles = [
    'package.json',
    'src/main.tsx',
    'src/App.tsx',
    'index.html',
    'vite.config.ts'
  ];

  const missingFiles = requiredFiles.filter(file => !fs.existsSync(path.join(process.cwd(), file)));
  
  if (missingFiles.length > 0) {
    log.error('Missing required files:');
    missingFiles.forEach(file => log.error(`- ${file}`));
    return false;
  }
  return true;
};

// Main function to start the application
async function startMysticIndia() {
  log.title('🕉️  Welcome to Mystic India');

  // Check required files
  if (!checkRequiredFiles()) {
    log.error('Please make sure you are in the correct directory with all required files.');
    process.exit(1);
  }

  try {
    // Check if port 5173 (Vite's default port) is available
    const portInUse = await isPortInUse(5173);
    if (portInUse) {
      log.warning('Default port 5173 is already in use. Will use next available port.');
    }

    // Check Node.js version
    const nodeVersion = process.version.match(/^v(\d+)\./)[1];
    if (nodeVersion < 16) {
      log.error('Node.js version 16 or higher is required.');
      process.exit(1);
    }

    // Install dependencies
    log.info('Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });
    log.success('Dependencies installed successfully!');

    // Start development server
    log.info('Starting development server...');
    log.info('The application will open in your default browser shortly...');
    
    // Use cross-platform command to open browser
    const openCommand = process.platform === 'win32' ? 'start' : process.platform === 'darwin' ? 'open' : 'xdg-open';
    
    // Wait for 2 seconds before opening browser to allow server to start
    setTimeout(() => {
      exec(`${openCommand} http://localhost:5173`, (error) => {
        if (error) {
          log.warning('Could not open browser automatically. Please open http://localhost:5173 manually.');
        }
      });
    }, 2000);

    // Start the development server
    execSync('npm run dev', { stdio: 'inherit' });
  } catch (error) {
    log.error('An error occurred:');
    log.error(error.message);
    process.exit(1);
  }
}

// Start the application
startMysticIndia();
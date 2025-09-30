import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define colors for console output
const colors = {
  main: '\x1b[36m', // Cyan
  scraper: '\x1b[35m', // Magenta
  error: '\x1b[31m', // Red
  reset: '\x1b[0m' // Reset
};

// Function to start a server
function startServer(name, command, args, cwd, color) {
  console.log(`${color}Starting ${name} server...${colors.reset}`);
  
  const server = spawn(command, args, {
    cwd,
    shell: true,
    stdio: 'pipe'
  });
  
  server.stdout.on('data', (data) => {
    console.log(`${color}[${name}] ${data.toString().trim()}${colors.reset}`);
  });
  
  server.stderr.on('data', (data) => {
    console.error(`${colors.error}[${name} ERROR] ${data.toString().trim()}${colors.reset}`);
  });
  
  server.on('close', (code) => {
    console.log(`${color}[${name}] Server exited with code ${code}${colors.reset}`);
    // Restart server if it crashes
    if (code !== 0 && code !== null) {
      console.log(`${color}[${name}] Restarting server...${colors.reset}`);
      setTimeout(() => {
        startServer(name, command, args, cwd, color);
      }, 5000);
    }
  });
  
  return server;
}

// Start main server
const mainServerPath = path.join(__dirname, 'server');
const mainServer = startServer('Main Server', 'npm', ['run', 'dev'], mainServerPath, colors.main);

// Start scraper server
const scraperServerPath = path.join(__dirname, 'diksha-scraper');
const scraperServer = startServer('Scraper Server', 'npm', ['run', 'dev'], scraperServerPath, colors.scraper);

// Handle process termination
process.on('SIGINT', () => {
  console.log('\nShutting down servers...');
  mainServer.kill();
  scraperServer.kill();
  process.exit(0);
});
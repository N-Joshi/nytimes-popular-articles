// open-coverage-report.js
const { exec } = require('child_process');
const path = require('path');

// Determine the platform-specific command to open the file
const platform = process.platform;
const coverageDir = path.resolve(__dirname, 'coverage/lcov-report/index.html');

let openCommand;

switch (platform) {
  case 'darwin': // macOS
    openCommand = `open ${coverageDir}`;
    break;
  case 'win32': // Windows
    openCommand = `start ${coverageDir}`;
    break;
  case 'linux': // Linux
    openCommand = `xdg-open ${coverageDir}`;
    break;
  default:
    throw new Error(`Unsupported platform: ${platform}`);
}

exec(openCommand, (error) => {
  if (error) {
    console.error(`Error opening coverage report: ${error.message}`);
    process.exit(1);
  }
});

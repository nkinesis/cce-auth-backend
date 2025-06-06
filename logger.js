// logger.js
const fs = require("fs");
const path = require("path");
const config = require("./config");
const logFile = path.join(__dirname, "app.log");

function logToFile(...args) {
  // Log to a file
  if (config.logToFile) {
    const timestamp = new Date().toISOString();
    const message = args
      .map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : arg))
      .join(" ");
    const fullMessage = `[${timestamp}] ${message}\n`;

    // Append to log file
    fs.appendFile(logFile, fullMessage, (err) => {
      if (err) console.error("Failed to write to log file:", err);
    });
  }

  // Still log to console if you want
  if (config.verbose) {
    console.log(...args);
  }
}

module.exports = logToFile;

const { createLogger, format, transports } = require('winston');
const path = require('path');
require('winston-daily-rotate-file');

// Define log format
const logFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.errors({ stack: true }), // Capture error stack traces
  format.json()
);

// Configure Winston logger
const logger = createLogger({
  level: 'info', // Default level
  format: logFormat,
  transports: [
    new transports.Console({ format: format.simple() }), // Log to console
    new transports.DailyRotateFile({
      filename: path.join(__dirname, '../logs/error-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      level: 'error', // Only log errors
      maxSize: '10m', // Max file size before rotation
      maxFiles: '30d' // Keep logs for 30 days
    }),
    new transports.DailyRotateFile({
      filename: path.join(__dirname, '../logs/combined-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxSize: '10m',
      maxFiles: '30d'
    })
  ]
});

module.exports = logger;

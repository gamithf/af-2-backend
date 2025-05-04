const logger = require('./logger');
const dotenv = require('dotenv');

dotenv.config();

const errorHandler = (err, req, res, next) => {
  logger.error('Unhandled Error', { 
    message: err.message, 
    stack: err.stack, 
    route: req.originalUrl 
  });

  res.status(err.status || 500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
};

module.exports = errorHandler;

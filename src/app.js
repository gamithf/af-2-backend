const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./utils/errorHandler');

const authRoutes = require('./routes/authRoutes');
const favouritesRoutes = require('./routes/favouritesRoutes');

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(helmet()); // Add security headers
app.use(morgan('dev')); // Log HTTP requests
app.use(express.json()); // Parse JSON request bodies

// Rate limiting to prevent brute-force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use('/api/auth', authRoutes); 
app.use('/api/favourites', favouritesRoutes);

// Error handling middleware
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('AF-2 Backend');
});
 

module.exports = app;
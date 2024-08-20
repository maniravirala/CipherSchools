const express = require('express');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

// Import Routes
const authRoutes = require('./routes/authRoutes');
const testRoutes = require('./routes/testRoutes');
const submissionRoutes = require('./routes/submissionRoutes');
const questionRoutes = require('./routes/questionRoutes');

// Initialize app
const app = express();

// Middleware
app.use(express.json()); // For parsing application/json
app.use(cookieParser()); // For parsing cookies

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// Connect to DB
connectDB();

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/test', testRoutes);
app.use('/api/submission', submissionRoutes);
app.use('/api/question', questionRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
require('./cronJobs/evaluateTests');


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
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

console.log(process.env.CLIENT_URL);

// Connect to DB
connectDB();

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/test', testRoutes);
app.use('/api/submission', submissionRoutes);
app.use('/api/question', questionRoutes);


app.get('/', (req, res) => {
  res.send('Welcome to Exam Studio API');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

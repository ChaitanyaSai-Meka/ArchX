const express = require('express');
const cors = require('cors');
require('dotenv').config();

const database = require('./config/database');

const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Database Connection
database.connect();

// Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Backend Server is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

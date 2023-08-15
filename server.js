const express = require('express');
const routes = require('./routes'); 
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes
app.use('/api/users', require('./routes/api/userRoutes'));
app.use('/api/thoughts', require('./routes/api/thoughtRoutes'));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

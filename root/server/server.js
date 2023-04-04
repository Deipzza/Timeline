const express = require('express');
const morgan = require('morgan');
const routes = require('./routes/items.routes');
const { mongoose } = require('./database');

const app = express();

// Settings
app.set('port', process.env.PORT || 5000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json()); // Detect if info received was json

// Routes
app.use('/api/items', routes);

// Start the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`)
});
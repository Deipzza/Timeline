const mongoose = require('mongoose');
// const URI = 'mongodb://127.0.0.1:27017/timeline';
const URI = 'mongodb://mongo:27017/timeline';

// Conection to DB
mongoose.connect(URI)
  .then(db => console.log('DB is connected'))
  .catch(err => console.log('Error: ' + err));

module.exports = mongoose;
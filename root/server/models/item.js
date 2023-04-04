const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create Schema object for items
const ItemSchema = new Schema({
  large_description: {type: String, required: true},
  short_description: {type: String, required: true},
  date : {type: Date, required: true}
});

// Create Model
const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;
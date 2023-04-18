const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create Schema object for items
const ItemSchema = new Schema({
  largeDescription: {type: String, required: true},
  shortDescription: {type: String, required: true},
  time : {type: String, required: true}
});

// Create Model
const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;
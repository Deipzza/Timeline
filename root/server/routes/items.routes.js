const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// List all items
router.get('/', async (req, res) => {
  const items = await Item.find({});
  res.json(items);
});

// Add items
router.post('/', async (req, res) => {
  if(req.body.largeDescription && req.body.shortDescription && req.body.date) {
    await Item.create(req.body);
    res.json({status: 'Item saved'});
  } else {
    res.json({error: 'Some inputs are empty'});
  }
});

// Update one item
router.put('/:id', async(req, res) => {
  await Item.findByIdAndUpdate(req.params.id, req.body);
  res.json({status: 'Item deleted'});
});

// Delete one item
router.delete('/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({status: 'Item deleted'});
});

module.exports = router;
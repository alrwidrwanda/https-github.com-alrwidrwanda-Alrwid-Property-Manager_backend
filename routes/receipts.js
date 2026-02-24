const express = require('express');
const router = express.Router();
const Receipt = require('../models/Receipt');
const validateObjectId = require('../middleware/validateObjectId');

router.param('id', validateObjectId);

router.get('/', async (req, res, next) => {
  try {
    const receipts = await Receipt.find().sort({ created_date: -1 });
    res.json({ success: true, count: receipts.length, data: receipts });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const receipt = await Receipt.findById(req.params.id);
    if (!receipt) {
      return res.status(404).json({ success: false, message: 'Receipt not found' });
    }
    res.json({ success: true, data: receipt });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const receipt = await Receipt.create(req.body);
    res.status(201).json({ success: true, data: receipt });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const receipt = await Receipt.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!receipt) {
      return res.status(404).json({ success: false, message: 'Receipt not found' });
    }
    res.json({ success: true, data: receipt });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const receipt = await Receipt.findByIdAndDelete(req.params.id);
    if (!receipt) {
      return res.status(404).json({ success: false, message: 'Receipt not found' });
    }
    res.status(200).json({ success: true, message: 'Receipt deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');
const validateObjectId = require('../middleware/validateObjectId');

router.param('id', validateObjectId);

router.get('/', async (req, res, next) => {
  try {
    const sortParam = req.query.sort || '-created_date';
    const sortField = sortParam.startsWith('-') ? sortParam.slice(1) : sortParam;
    const sortOrder = sortParam.startsWith('-') ? -1 : 1;
    const sales = await Sale.find().sort({ [sortField]: sortOrder });
    res.json({ success: true, count: sales.length, data: sales });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const sale = await Sale.findById(req.params.id);
    if (!sale) {
      return res.status(404).json({ success: false, message: 'Sale not found' });
    }
    res.json({ success: true, data: sale });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const sale = await Sale.create(req.body);
    res.status(201).json({ success: true, data: sale });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const sale = await Sale.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!sale) {
      return res.status(404).json({ success: false, message: 'Sale not found' });
    }
    res.json({ success: true, data: sale });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const sale = await Sale.findByIdAndDelete(req.params.id);
    if (!sale) {
      return res.status(404).json({ success: false, message: 'Sale not found' });
    }
    res.status(200).json({ success: true, message: 'Sale deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const validateObjectId = require('../middleware/validateObjectId');

router.param('id', validateObjectId);

router.get('/', async (req, res, next) => {
  try {
    const sortParam = req.query.sort || '-payment_date';
    const sortField = sortParam.startsWith('-') ? sortParam.slice(1) : sortParam;
    const sortOrder = sortParam.startsWith('-') ? -1 : 1;
    const payments = await Payment.find().sort({ [sortField]: sortOrder });
    res.json({ success: true, count: payments.length, data: payments });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }
    res.json({ success: true, data: payment });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const payment = await Payment.create(req.body);
    res.status(201).json({ success: true, data: payment });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }
    res.json({ success: true, data: payment });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }
    res.status(200).json({ success: true, message: 'Payment deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

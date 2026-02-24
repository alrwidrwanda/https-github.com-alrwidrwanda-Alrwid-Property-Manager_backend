const express = require('express');
const router = express.Router();
const DefaultedSale = require('../models/DefaultedSale');
const validateObjectId = require('../middleware/validateObjectId');

router.param('id', validateObjectId);

router.get('/', async (req, res, next) => {
  try {
    const sortParam = req.query.sort || '-defaulted_date';
    const sortField = sortParam.startsWith('-') ? sortParam.slice(1) : sortParam;
    const sortOrder = sortParam.startsWith('-') ? -1 : 1;
    const defaultedSales = await DefaultedSale.find().sort({ [sortField]: sortOrder });
    res.json({ success: true, count: defaultedSales.length, data: defaultedSales });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const defaultedSale = await DefaultedSale.findById(req.params.id);
    if (!defaultedSale) {
      return res.status(404).json({ success: false, message: 'Defaulted sale not found' });
    }
    res.json({ success: true, data: defaultedSale });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const defaultedSale = await DefaultedSale.create(req.body);
    res.status(201).json({ success: true, data: defaultedSale });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const defaultedSale = await DefaultedSale.findByIdAndDelete(req.params.id);
    if (!defaultedSale) {
      return res.status(404).json({ success: false, message: 'Defaulted sale not found' });
    }
    res.status(200).json({ success: true, message: 'Defaulted sale deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

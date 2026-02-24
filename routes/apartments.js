const express = require('express');
const router = express.Router();
const Apartment = require('../models/Apartment');
const validateObjectId = require('../middleware/validateObjectId');

router.param('id', validateObjectId);

/**
 * @desc    Create a new apartment
 * @route   POST /api/apartments
 * @access  Public
 */
router.post('/', async (req, res, next) => {
  try {
    const apartment = await Apartment.create(req.body);
    res.status(201).json({
      success: true,
      data: apartment,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @desc    Get all apartments
 * @route   GET /api/apartments
 * @access  Public
 */
router.get('/', async (req, res, next) => {
  try {
    const sortParam = req.query.sort || '-created_date';
    const sortField = sortParam.startsWith('-') ? sortParam.slice(1) : sortParam;
    const sortOrder = sortParam.startsWith('-') ? -1 : 1;
    const sortObj = { [sortField]: sortOrder };
    const apartments = await Apartment.find().sort(sortObj);
    res.json({
      success: true,
      count: apartments.length,
      data: apartments,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @desc    Get single apartment by ID
 * @route   GET /api/apartments/:id
 * @access  Public
 */
router.get('/:id', async (req, res, next) => {
  try {
    const apartment = await Apartment.findById(req.params.id);
    if (!apartment) {
      return res.status(404).json({
        success: false,
        message: 'Apartment not found',
      });
    }
    res.json({
      success: true,
      data: apartment,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @desc    Update apartment
 * @route   PUT /api/apartments/:id
 * @access  Public
 */
router.put('/:id', async (req, res, next) => {
  try {
    const apartment = await Apartment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!apartment) {
      return res.status(404).json({
        success: false,
        message: 'Apartment not found',
      });
    }
    res.json({
      success: true,
      data: apartment,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @desc    Delete apartment
 * @route   DELETE /api/apartments/:id
 * @access  Public
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const apartment = await Apartment.findByIdAndDelete(req.params.id);
    if (!apartment) {
      return res.status(404).json({
        success: false,
        message: 'Apartment not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Apartment deleted successfully',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
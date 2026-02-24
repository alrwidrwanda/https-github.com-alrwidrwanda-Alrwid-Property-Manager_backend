const express = require('express');
const router = express.Router();
const ApartmentReservation = require('../models/ApartmentReservation');
const validateObjectId = require('../middleware/validateObjectId');

router.param('id', validateObjectId);

router.get('/', async (req, res, next) => {
  try {
    const sortParam = req.query.sort || '-created_date';
    const sortField = sortParam.startsWith('-') ? sortParam.slice(1) : sortParam;
    const sortOrder = sortParam.startsWith('-') ? -1 : 1;
    const reservations = await ApartmentReservation.find().sort({ [sortField]: sortOrder });
    res.json({ success: true, count: reservations.length, data: reservations });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const reservation = await ApartmentReservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }
    res.json({ success: true, data: reservation });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const reservation = await ApartmentReservation.create(req.body);
    res.status(201).json({ success: true, data: reservation });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const reservation = await ApartmentReservation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }
    res.json({ success: true, data: reservation });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const reservation = await ApartmentReservation.findByIdAndDelete(req.params.id);
    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }
    res.status(200).json({ success: true, message: 'Reservation deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

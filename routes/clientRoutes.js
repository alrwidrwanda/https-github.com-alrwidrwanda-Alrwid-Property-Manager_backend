const express = require('express');
const {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} = require('../controllers/clientController');
const validateObjectId = require('../middleware/validateObjectId');

const router = express.Router();

// /api/clients
router.route('/').get(getAllClients).post(createClient);

// /api/clients/:id
router
  .route('/:id')
  .get(validateObjectId, getClientById)
  .put(validateObjectId, updateClient)
  .delete(validateObjectId, deleteClient);

module.exports = router;


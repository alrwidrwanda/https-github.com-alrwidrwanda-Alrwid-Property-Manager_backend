const express = require('express');
const router = express.Router();
const {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} = require('../controllers/itemController');
const validateObjectId = require('../middleware/validateObjectId');

// Apply ObjectId validation to routes with :id parameter
router.param('id', validateObjectId);

router.route('/').get(getAllItems).post(createItem);
router.route('/:id').get(getItemById).put(updateItem).delete(deleteItem);

module.exports = router;

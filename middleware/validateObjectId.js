const mongoose = require('mongoose');

/**
 * Middleware to validate MongoDB ObjectId in route parameters
 */
const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID format',
    });
  }
  
  next();
};

module.exports = validateObjectId;

/**
 * 404 Not Found middleware
 * Handles requests to routes that don't exist
 */
const notFound = (req, res, next) => {
  const error = new Error(`Route not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

module.exports = notFound;

/**
 * Global error-handling middleware.
 * Catches all errors passed via next(error) and returns a uniform JSON response.
 */
const errorHandler = (err, req, res, _next) => {
  console.error(`❌ Error: ${err.message}`);
  console.error(err.stack);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      error: "Validation Error",
      details: messages,
    });
  }

  // Mongoose cast error (invalid ObjectId, etc.)
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      error: `Invalid value for ${err.path}: ${err.value}`,
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue).join(", ");
    return res.status(409).json({
      success: false,
      error: `Duplicate value for field(s): ${field}`,
    });
  }

  // Default server error
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;

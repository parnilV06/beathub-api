const express = require("express");
const router = express.Router();
const getTopArtists = require("../aggregations/top-artists");
const getUserActivity = require("../aggregations/user-activity");
const { protect, authorize } = require("../middlewares/authMiddleware");

// GET /api/analytics/top-artists
router.get("/top-artists", protect, authorize("admin"), async (req, res, next) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 10, 50);
    const results = await getTopArtists(limit);

    res.status(200).json({
      success: true,
      data: results,
      count: results.length,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/analytics/user-activity
router.get("/user-activity", protect, authorize("admin"), async (req, res, next) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 10, 50);
    const results = await getUserActivity(limit);

    res.status(200).json({
      success: true,
      data: results,
      count: results.length,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

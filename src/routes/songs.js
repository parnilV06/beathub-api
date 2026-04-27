const express = require("express");
const router = express.Router();
const { getSongs, createSong } = require("../controllers/songController");
const { protect, authorize } = require("../middlewares/authMiddleware");

// GET /api/songs → protected for general users
router.get("/", protect, getSongs);

// POST /api/songs → protected for admins
router.post("/", protect, authorize("admin"), createSong);

module.exports = router;

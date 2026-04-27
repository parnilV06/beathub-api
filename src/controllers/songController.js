const mongoose = require("mongoose");
const Song = require("../models/Song");
const { encodeCursor, decodeCursor } = require("../utils/cursor");

const getSongs = async (req, res) => {
  try {
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 100);
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const skip = (page - 1) * limit;

    const songs = await Song.find()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Song.countDocuments();
    const hasMore = skip + songs.length < total;

    res.status(200).json({
      success: true,
      data: songs,
      pagination: {
        page,
        limit,
        total,
        hasMore,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

const createSong = async (req, res) => {
  res.status(201).json({ success: true, message: "Song created" });
};

module.exports = { getSongs, createSong };

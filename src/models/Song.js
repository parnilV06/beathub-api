const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Song title is required"],
      trim: true,
      maxlength: [300, "Song title cannot exceed 300 characters"],
    },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      required: [true, "Artist reference is required"],
    },
    album: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
    },
    duration: {
      type: Number,
      required: [true, "Duration is required"],
      min: [1, "Duration must be at least 1 second"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

songSchema.index({ artist: 1 });
songSchema.index({ album: 1 });
songSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Song", songSchema);

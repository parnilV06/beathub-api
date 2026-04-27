const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Album title is required"],
      trim: true,
      maxlength: [300, "Album title cannot exceed 300 characters"],
    },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      required: [true, "Artist reference is required"],
    },
    releaseDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

albumSchema.index({ artist: 1 });
albumSchema.index({ releaseDate: -1 });

module.exports = mongoose.model("Album", albumSchema);

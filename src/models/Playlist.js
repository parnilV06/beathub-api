const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Playlist name is required"],
      trim: true,
      maxlength: [200, "Playlist name cannot exceed 200 characters"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },
    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
      },
    ],
  },
  { timestamps: true }
);

playlistSchema.index({ user: 1 });

module.exports = mongoose.model("Playlist", playlistSchema);

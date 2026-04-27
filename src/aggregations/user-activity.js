const Playlist = require("../models/Playlist");

/**
 * Aggregation: User Activity
 * Provides a summary of user activity based on playlists.
 * Counts number of playlists and total songs per user.
 *
 * @param {number} limit - Maximum number of users to return (default: 10)
 * @returns {Promise<Array>} Aggregation result
 */
const getUserActivity = async (limit = 10) => {
  const pipeline = [
    {
      $group: {
        _id: "$user",
        playlistCount: { $sum: 1 },
        totalSongs: { $sum: { $size: "$songs" } },
      },
    },
    { $sort: { playlistCount: -1 } },
    { $limit: limit },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "userInfo",
      },
    },
    { $unwind: "$userInfo" },
    {
      $project: {
        _id: 0,
        userId: "$_id",
        username: "$userInfo.username",
        email: "$userInfo.email",
        playlistCount: 1,
        totalSongs: 1,
      },
    },
  ];

  return Playlist.aggregate(pipeline);
};

module.exports = getUserActivity;

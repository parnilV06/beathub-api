const Song = require("../models/Song");

/**
 * Aggregation: Top Artists
 * Groups songs by artist, counts the number of songs per artist,
 * and sorts in descending order of song count.
 *
 * @param {number} limit - Maximum number of artists to return (default: 10)
 * @returns {Promise<Array>} Aggregation result
 */
const getTopArtists = async (limit = 10) => {
  const pipeline = [
    {
      $group: {
        _id: "$artist",
        songCount: { $sum: 1 },
        totalDuration: { $sum: "$duration" },
      },
    },
    { $sort: { songCount: -1 } },
    { $limit: limit },
    {
      $lookup: {
        from: "artists",
        localField: "_id",
        foreignField: "_id",
        as: "artistInfo",
      },
    },
    { $unwind: "$artistInfo" },
    {
      $project: {
        _id: 0,
        artistId: "$_id",
        name: "$artistInfo.name",
        genre: "$artistInfo.genre",
        songCount: 1,
        totalDuration: 1,
      },
    },
  ];

  return Song.aggregate(pipeline);
};

module.exports = getTopArtists;

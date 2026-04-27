require("dotenv").config();
const mongoose = require("mongoose");
const Song = require("../models/Song");
const Artist = require("../models/Artist");

const seedSongs = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    await Song.deleteMany({});
    await Artist.deleteMany({});
    console.log("Cleared existing data");

    // Create a dummy artist (Song.artist is required)
    const artist = await Artist.create({ name: "Seed Artist", genre: "Pop" });

    const songs = [];
    for (let i = 1; i <= 30; i++) {
      songs.push({
        title: `Song ${i}`,
        artist: artist._id,
        duration: Math.floor(Math.random() * 200) + 120,
        createdAt: new Date(Date.now() - (30 - i) * 60000),
      });
    }

    await Song.insertMany(songs);
    console.log(`Inserted ${songs.length} songs`);
    console.log("Seeding successful");

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedSongs();

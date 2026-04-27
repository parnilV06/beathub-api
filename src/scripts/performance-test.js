require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Song = require("../models/Song");

/**
 * Simple performance test — measures query execution times.
 */
const runPerformanceTest = async () => {
  try {
    await connectDB();

    console.log("⏱️  Starting performance tests...\n");

    // Test 1: Find all songs (no filter)
    let start = Date.now();
    const allSongs = await Song.find({}).lean();
    let duration = Date.now() - start;
    console.log(`📌 Find all songs: ${allSongs.length} docs in ${duration}ms`);

    // Test 2: Find songs with populate
    start = Date.now();
    const populated = await Song.find({})
      .populate("artist", "name")
      .populate("album", "title")
      .lean();
    duration = Date.now() - start;
    console.log(`📌 Find all songs (populated): ${populated.length} docs in ${duration}ms`);

    // Test 3: Find songs sorted by _id descending with limit
    start = Date.now();
    const paginated = await Song.find({}).sort({ _id: -1 }).limit(10).lean();
    duration = Date.now() - start;
    console.log(`📌 Paginated query (limit 10): ${paginated.length} docs in ${duration}ms`);

    // Test 4: Aggregation — group by artist
    start = Date.now();
    const grouped = await Song.aggregate([
      { $group: { _id: "$artist", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    duration = Date.now() - start;
    console.log(`📌 Group by artist aggregation: ${grouped.length} groups in ${duration}ms`);

    // Test 5: Count documents
    start = Date.now();
    const count = await Song.countDocuments({});
    duration = Date.now() - start;
    console.log(`📌 Count documents: ${count} in ${duration}ms`);

    console.log("\n✅ Performance tests complete!");
    process.exit(0);
  } catch (error) {
    console.error(`❌ Performance test error: ${error.message}`);
    process.exit(1);
  }
};

runPerformanceTest();

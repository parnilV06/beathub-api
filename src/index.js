require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");

// Route imports
const songRoutes = require("./routes/songs");
const analyticsRoutes = require("./routes/analytics");
const authRoutes = require("./routes/auth");

const app = express();

// --------------- Middleware ---------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const apiLimiter = require("./middlewares/rateLimiter");
app.use("/api", apiLimiter);

// --------------- Routes ---------------
app.get("/", (_req, res) => {
  res.json({
    message: "🎵 BeatHub API is running",
    version: "1.0.0",
    endpoints: {
      songs: "/api/songs",
      analytics: "/api/analytics/top-artists | /api/analytics/user-activity",
    },
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/analytics", analyticsRoutes);

// --------------- Error Handling ---------------
app.use(errorHandler);

// --------------- Start Server ---------------
const PORT = Number(process.env.PORT) || 5000;
const PORT_RETRIES = Number(process.env.PORT_RETRIES) || 10;

console.log("dotenv loaded");
console.log(`PORT from env: ${PORT}`);

const startServer = async () => {
  await connectDB();

  const startListening = (port, retriesLeft) =>
    new Promise((resolve, reject) => {
      const server = app.listen(port, () => resolve({ server, port }));

      server.on("error", (err) => {
        if (err.code === "EADDRINUSE" && retriesLeft > 0) {
          const nextPort = port + 1;
          console.warn(
            `⚠️ Port ${port} is already in use. Retrying on ${nextPort}...`
          );
          resolve(startListening(nextPort, retriesLeft - 1));
          return;
        }

        reject(err);
      });
    });

  const { port } = await startListening(PORT, PORT_RETRIES);
  console.log(`🚀 BeatHub server running on http://localhost:${port}`);
};

startServer();

module.exports = app;

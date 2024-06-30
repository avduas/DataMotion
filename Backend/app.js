const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Wrappers
const { queryDatabase, closeDatabasePool } = require("./db/Postrgesql_db");
const { redisClient } = require("./db/redisUtils");

// Routes
const authRouter = require("./routes/authroutes");
const templateRoutes = require("./routes/templates");
const pipeRoutes = require("./routes/pipeline");
const dataRoutes = require("./routes/dataRoute");

const app = express();
const PORT = process.env.PORT || 3010;


// app.use((req, res, next) => {
//     console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
//     next();
// });
//////////////////////////////
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
/////////////////////////////

app.use(cookieParser());

app.use("/api", authRouter);
app.use("/api", templateRoutes);
app.use("/api", pipeRoutes);
app.use("/api", dataRoutes);

// Static files for frontend
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("/*", async (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  queryDatabase()
    .then(() => {
      console.log("Database connection established successfully");
    })
    .catch((err) => {
      console.error("Error connecting to database:", err);
    });
});

process.on("SIGINT", async () => {
  console.log("Server shutting down...");

  await closeDatabasePool();

  redisClient.quit(function (err, reply) {
    if (err) {
      console.error("Error quitting Redis:", err);
    } else {
      console.log("Redis connection closed");
    }
    process.exit();
  });
});

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./Routes/userRoute");
const chatRoute = require("./Routes/chatRoute");
const messageRoute = require("./Routes/messageRoute");
require("dotenv").config();

const app = express();
const http = require("http").createServer(app);

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to our Chat App APIs...");
});

// MongoDB connection
const uri = process.env.ATLAS_URI;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connection established"))
  .catch((error) => console.log("❌ MongoDB connection failed:", error.message));

// Start server
const PORT = process.env.PORT || 5000;
http.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});

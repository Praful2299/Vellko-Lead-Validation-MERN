const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const sourceRoutes = require("./src/routes/sourceRoutes");
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const leadRoutes = require("./src/routes/leadRoutes");
const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// DB connect
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/sources", sourceRoutes);
app.get("/", (req, res) => {
  res.send("API running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));

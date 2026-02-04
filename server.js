require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
connectDB();

const app = express();
const port = process.env.PORT || 5000;

const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");

app.use(express.json());
app.use(cors());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Backend is running" });
});

app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});

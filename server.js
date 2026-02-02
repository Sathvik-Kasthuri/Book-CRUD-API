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

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);

app.listen(port, () => {
  console.log(`Server running on the port : ${port}`);
});

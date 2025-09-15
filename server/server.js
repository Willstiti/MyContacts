const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });
const { handleLogin } = require("./src/controllers/AuthController");

dotenv.config();

const app = express();
const PORT = 3500;

app.use(express.json());

app.post("/register", handleLogin);

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error("MongoDB connection error:", err));
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const setupSwagger = require("./src/config/swagger");
const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });

const authRoutes = require("./src/routes/authRoute");
const contactRoutes = require("./src/routes/contactRoutes")

dotenv.config();

const app = express();
const PORT = 3500;

app.use(cors());
app.use(express.json())
setupSwagger(app);

app.use("/", authRoutes);
app.use("/", contactRoutes);

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error("MongoDB connection error:", err));
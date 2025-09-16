const express = require("express");
const {getLoggedInUser} = require("../controllers/AuthController")
const {protect} = require("../middlewares/requireAuth")
const router = express.Router();

router.get("/test", protect, getLoggedInUser);

module.exports = router;
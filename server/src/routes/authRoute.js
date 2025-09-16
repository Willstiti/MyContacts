const express = require("express");
const router = express.Router();
const { handleNewUser } = require("../controllers/UserController");
const { handleLogin } = require("../controllers/AuthController");

router.route('/login').post(handleLogin);
router.route('/register').post(handleNewUser);

module.exports = router;
const express = require("express");
const {getLoggedInUser} = require("../controllers/AuthController")
const {protect} = require("../middlewares/requireAuth")
const {getUserContact, createContact, editContact, deleteContact} = require("../controllers/ContactController")

const router = express.Router();

router.post("/contact/add", protect, createContact);
router.get("/contact/list", protect, getUserContact);
router.patch("/contact/:id", protect, editContact);
router.delete("/contact/:id", protect, deleteContact);

module.exports = router;
const express = require("express");
const router = express.Router();

const {
  publicValidateLead,
  getUserLeads,
} = require("../controllers/leadController");

const auth = require("../middleware/auth");

// PUBLIC API
router.post("/validate", publicValidateLead);

// PROTECTED (dashboard)
router.get("/", auth, getUserLeads);

module.exports = router;

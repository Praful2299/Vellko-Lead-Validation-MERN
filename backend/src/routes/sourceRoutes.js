const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
  createSource,
  getSources,
} = require("../controllers/sourceController");

router.post("/create", auth, createSource);
router.get("/", auth, getSources);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  signup,
  verifyEmail,
  login,
  me,
} = require("../controllers/authController");

const auth = require("../middleware/auth");

router.post("/signup", signup);
router.get("/verify/:token", verifyEmail);
router.post("/login", login);
router.get("/me", auth, me);

module.exports = router;

const { sendEmail } = require("../utils/sendEmail");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

// SIGNUP
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = uuidv4();

    user = await User.create({
      name,
      email,
      password: hashedPassword,
      verificationToken,
    });

    // --- send verification email ---
    const link = `${process.env.CLIENT_URL}/verify/${verificationToken}`;

    await sendEmail(
      email,
      "Verify your email",
      `
        <h2>Hello ${name},</h2>
        <p>Please verify your email by clicking below:</p>
        <a href="${link}">Verify Email</a>
      `
    );

    res.json({
      message: "Signup successful! Check your email to verify.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// VERIFY EMAIL
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({ verificationToken: token });

    if (!user) return res.status(400).json({ message: "Invalid token" });

    user.verified = true;
    user.verificationToken = null;

    await user.save();

    // --- send welcome email ---
    await sendEmail(
      user.email,
      "Welcome 🎉",
      `<h2>Welcome ${user.name}</h2>
       <p>Your email has been verified successfully.</p>`
    );

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.verified)
      return res
        .status(401)
        .json({ message: "Please verify your email first" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGGED-IN USER DATA
exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const Source = require("../models/Source");
const Lead = require("../models/Lead");

// basic validation helpers
const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
const validatePhone = (phone) => /^[0-9]{8,15}$/.test(phone);

// PUBLIC API
exports.publicValidateLead = async (req, res) => {
  try {
    const { email, phone, apiKey, sourceId } = req.body;

    // required fields check
    if (!email || !phone || !apiKey || !sourceId) {
      return res
        .status(400)
        .json({ message: "email, phone, apiKey, sourceId are required" });
    }

    // verify source + api key match
    const source = await Source.findOne({ apiKey, sourceId });

    if (!source) {
      return res.status(401).json({ message: "Invalid API Key or Source Id" });
    }

    // perform validation
    const isEmailValid = validateEmail(email);
    const isPhoneValid = validatePhone(phone);

    const status =
      isEmailValid && isPhoneValid ? "valid" : "invalid";

    // save lead
    await Lead.create({
      email,
      phone,
      status,
      sourceId,
      userId: source.userId,
    });

    // return response
    return res.json({
      status,
      message:
        status === "valid"
          ? "Lead is valid"
          : "Invalid email or phone number",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// GET LEADS FOR LOGGED-IN USER
exports.getUserLeads = async (req, res) => {
  try {
    const { sourceId } = req.query;

    let filter = { userId: req.user.userId };

    if (sourceId) filter.sourceId = sourceId;

    const leads = await Lead.find(filter).sort({ createdAt: -1 });

    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

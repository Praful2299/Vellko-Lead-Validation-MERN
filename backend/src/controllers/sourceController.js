const Source = require("../models/Source");
const { v4: uuidv4 } = require("uuid");

// CREATE SOURCE
exports.createSource = async (req, res) => {
  try {
    const { sourceName } = req.body;

    if (!sourceName)
      return res.status(400).json({ message: "Source name is required" });

    const sourceId = uuidv4(); // unique id for source
    const apiKey = uuidv4();   // api key

    const newSource = await Source.create({
      sourceName,
      sourceId,
      apiKey,
      userId: req.user.userId,
    });

    res.json({
      message: "Source created successfully",
      source: newSource,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL SOURCES FOR LOGGED-IN USER
exports.getSources = async (req, res) => {
  try {
    const sources = await Source.find({ userId: req.user.userId });

    res.json(sources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

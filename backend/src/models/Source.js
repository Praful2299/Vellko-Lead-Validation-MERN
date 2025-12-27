const mongoose = require("mongoose");

const sourceSchema = new mongoose.Schema(
  {
    sourceName: { type: String, required: true },

    sourceId: {
      type: String,
      required: true,
      unique: true,
    },

    apiKey: {
      type: String,
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Source", sourceSchema);

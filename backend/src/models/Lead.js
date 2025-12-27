const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    phone: { type: String, required: true },

    status: {
      type: String,
      enum: ["valid", "invalid"],
      required: true,
    },

    sourceId: {
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

module.exports = mongoose.model("Lead", leadSchema);

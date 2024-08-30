const mongoose = require("mongoose");

const rewardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  associatedWith: { type: String, enum: ["Community", "Goal"], required: true },
});

const Reward = mongoose.model("Reward", rewardSchema);

module.exports = Reward;

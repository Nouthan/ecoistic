const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {type:String, default: "Goal"},
  appliance: { type: String, required: true },
  difficulty: { type: String, required: true },
  timeFrame: { type: String, required: true },
  unit: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
  coins: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

goalSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;

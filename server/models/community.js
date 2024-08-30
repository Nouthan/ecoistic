const mongoose = require("mongoose");
const { Schema } = mongoose;

const communitySchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  type: {type:String, default: "Community"},
  target: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  coins: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Community = mongoose.model("Community", communitySchema);

module.exports = Community;

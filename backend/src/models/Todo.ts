import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  text: { type: String, required: true },
  status: {
    type: Boolean,
    default: true,
  },
});
TodoSchema.index({ user: 1, text: 1 }, { unique: true });
export default mongoose.model("todo", TodoSchema);

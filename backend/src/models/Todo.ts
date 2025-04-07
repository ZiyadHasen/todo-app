import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

export default mongoose.model("todo", TodoSchema);

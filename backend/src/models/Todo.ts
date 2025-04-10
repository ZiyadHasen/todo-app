import mongoose from "mongoose";
import { Status } from "../constants/constants";

const TodoSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  text: { type: String, required: true },
  status: {
    type: String,
    enum: [Status.ACTIVE, Status.COMPLETED],
    default: Status.ACTIVE,
  },
});
TodoSchema.index({ user: 1, text: 1 }, { unique: true });
export default mongoose.model("todo", TodoSchema);

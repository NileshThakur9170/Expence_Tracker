import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // ✅ fixed (capital + consistent)
      required: true,
    },
    type: {
      type: String,
      default: "income",
    },
  },
  {
    timestamps: true, // ✅ CORRECT PLACE
  }
);

// ✅ safer model creation
const incomeModel =
  mongoose.models.Income || mongoose.model("Income", incomeSchema);

export default incomeModel;
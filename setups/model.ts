import mongoose from "mongoose";

const Accountschema = new mongoose.Schema(
  {
    phone: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: String,
    role: Number,
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    collection: "accounts",
  }
);

export const Account =
  mongoose.models.accounts || mongoose.model("accounts", Accountschema);

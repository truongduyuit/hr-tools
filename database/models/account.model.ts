import mongoose from "mongoose";
import { AccountRoles } from "../../contants/enum";

export interface IAccountModel extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  phone: string;
  password: string;
  name: string;
  role: AccountRoles;
  status: boolean;
}

const schema = new mongoose.Schema(
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
    timestamps: true,
  }
);

export const Account =
  mongoose.models.accounts || mongoose.model<IAccountModel>("accounts", schema);

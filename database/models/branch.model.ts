import mongoose from "mongoose";

export interface IBranchModel extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  symbol: string;
  province: string;
  district: string;
  detail: string;
  type: string;
  hotline: string;
  email: string;
  lead: string;
  status: boolean;
}

const schema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      index: true,
    },
    province: {
      type: String,
      index: true,
    },
    district: {
      type: String,
      index: true,
    },
    detail: {
      type: String,
    },
    type: {
      type: String,
    },
    hotline: {
      type: String,
      index: true,
    },
    email: {
      type: String,
      index: true,
    },
    lead: {
      type: String,
    },
    status: {
      type: Boolean,
      index: true,
      default: true,
    },
  },
  {
    collection: "branch",
    timestamps: true,
  }
);

schema.set("toObject", { virtuals: true });
schema.set("toJSON", { virtuals: true });

export const Branch =
  mongoose.models.branch || mongoose.model<IBranchModel>("branch", schema);

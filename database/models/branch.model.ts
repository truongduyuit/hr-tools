import mongoose from "mongoose";

export interface IBranchModel extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  symbol: string;
  address: mongoose.Types.ObjectId;
  type: string;
  hotline: string;
  lead: string;
  status: string
}

const schema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      index: true
    },
    address: {
      type: mongoose.Types.ObjectId,
      index: true
    },
    type: {
      type: String,
    },
    hotline: {
      type: String,
      index: true
    },
    lead: {
      type: String,
    },
    status: {
      type: String,
      index: true
    }
  },
  {
    collection: "branch",
    timestamps: true,
  }
);

export const Branch =
  mongoose.models.branch || mongoose.model<IBranchModel>("branch", schema);

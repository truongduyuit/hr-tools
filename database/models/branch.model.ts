import mongoose from "mongoose";

export interface IBranchModel extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  symbol: string;
  addressId: mongoose.Types.ObjectId;
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
    addressId: {
      type: mongoose.Types.ObjectId,
      index: true,
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

schema.virtual("addressInfo", {
  ref: "address",
  localField: "addressId",
  foreignField: "_id",
  justOne: true,
});

schema.set("toObject", { virtuals: true });
schema.set("toJSON", { virtuals: true });

export const Branch =
  mongoose.models.branch || mongoose.model<IBranchModel>("branch", schema);

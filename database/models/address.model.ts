import mongoose from "mongoose";

export interface IAddressModel extends mongoose.Document {
  _id: mongoose.Types.ObjectId | undefined;
  province: string;
  district: string;
  detail: string;
}

const schema = new mongoose.Schema(
  {
    province: {
        type: String,
        index: true
    },
    district: {
        type: String,
        index: true
    },
    detail: {
        type: String,
        index: true
    }
  },
  {
    collection: "address",
    timestamps: true,
  }
);

export const Address =
  mongoose.models.address || mongoose.model<IAddressModel>("address", schema);

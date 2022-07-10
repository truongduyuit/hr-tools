import mongoose from "mongoose";

export interface ICandidateModel extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  phone: string;
  email: string;
  workType: string;
  workArea: string;
  dob: string;
  gender: string;
  placeOfBirth: string;
  heightWeight: string;
  know: string;
  time: string;
  exp: string;
  desiredSalary: string;
  ssRotate: string;
  ssWorkTime: string;
  brand: string;
  linkCV: string;
}

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      index: true,
    },
    phone: {
      type: String,
      index: true,
    },
    email: {
      type: String,
      index: true,
    },
    workType: {
      type: String,
    },
    workArea: {
      type: String,
    },
    dob: {
      type: String,
    },
    gender: {
      type: String,
      index: true,
    },
    placeOfBirth: {
      type: String,
    },
    heightWeight: {
      type: String,
    },
    know: {
      type: String,
    },
    time: {
      type: String,
    },
    exp: {
      type: String,
    },
    desiredSalary: {
      type: String,
    },
    ssRotate: {
      type: String,
    },
    ssWorkTime: {
      type: String,
    },
    brand: {
      type: String,
      index: true,
    },
    linkCV: {
      type: String,
    },
  },
  {
    collection: "candidate",
    timestamps: true,
  }
);

export const Candidate =
  mongoose.models.candidate ||
  mongoose.model<ICandidateModel>("candidate", schema);

import mongoose from "mongoose";

export interface ICandidateModel extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  nameNoAccent: string;
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
  timeApply: string;
  exp: string;
  desiredSalary: string;
  ssRotate: string;
  ssWorkTime: string;
  brand: string;
  linkCV: string;
  haveSchedule: boolean;
  scheduleId: string;
  scheduleInfo: any;
  position: string;
  status: string
}

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      index: true,
    },
    nameNoAccent: {
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
    timeApply: {
      type: String,
      index: true,
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
    haveSchedule: {
      type: Boolean,
      default: false,
    },
    scheduleId: { type: mongoose.Types.ObjectId },
    position: {
      type: String,
    },
    status: {
      type: String,
      default: "0"
    }
  },
  {
    collection: "candidate",
    timestamps: true,
  }
);

schema.virtual("scheduleInfo", {
  ref: "schedule",
  localField: "scheduleId",
  foreignField: "_id",
  justOne: true,
});

schema.set("toObject", { virtuals: true });
schema.set("toJSON", { virtuals: true });

export const Candidate =
  mongoose.models.candidate ||
  mongoose.model<ICandidateModel>("candidate", schema);

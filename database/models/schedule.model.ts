import mongoose from "mongoose";

export interface IScheduleModel extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  candidateId: mongoose.Types.ObjectId;
  workBranchId: mongoose.Types.ObjectId;
  interviewBranchId: mongoose.Types.ObjectId;
  date: Date;
  note: string;
  isPass: string;
  candidateInfo: any;
  workBranchInfo: any;
  interviewBranchInfo: any;
  position: string;
  selectBrand: string;
}

const schema = new mongoose.Schema(
  {
    candidateId: { type: mongoose.Types.ObjectId },
    position: {
      type: String,
    },
    selectBrand: {
      type: String,
    },
    workBranchId: { 
      type: mongoose.Types.ObjectId 
    },
    interviewBranchId: { 
      type: mongoose.Types.ObjectId 
    },
    date: {
      type: Date,
    },
    note: {
      type: String,
    },
    isPass: {
      type: String,
      default: "Chưa có kết quả",
    },
  },
  {
    collection: "schedule",
    timestamps: true,
  }
);

schema.virtual("candidateInfo", {
  ref: "candidate",
  localField: "candidateId",
  foreignField: "_id",
  justOne: true,
});

schema.virtual("workBranchInfo", {
  ref: "branch",
  localField: "workBranchId",
  foreignField: "_id",
  justOne: true,
});

schema.virtual("interviewBranchInfo", {
  ref: "branch",
  localField: "interviewBranchId",
  foreignField: "_id",
  justOne: true,
});

schema.set("toObject", { virtuals: true });
schema.set("toJSON", { virtuals: true });

export const Schedule =
  mongoose.models.schedule ||
  mongoose.model<IScheduleModel>("schedule", schema);

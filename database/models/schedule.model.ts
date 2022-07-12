import mongoose from "mongoose";

export interface IScheduleModel extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    candidateId: string;
    workAddress: string;
    interviewAddress: string;
    date: Date;
    note: string;
    isPass: string;
}

const schema = new mongoose.Schema(
    {
        candidateId: { type: mongoose.Types.ObjectId },
        workAddress: { type: String },
        interviewAddress: { type: String },
        date: {
            type: Date
        },
        note: {
            type: String
        },
        isPass: {
            type: String,
            default: "Chưa có kết quả"
        }
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

schema.set("toObject", { virtuals: true });
schema.set("toJSON", { virtuals: true });

export const Schedule =
    mongoose.models.schedule ||
    mongoose.model<IScheduleModel>("schedule", schema);

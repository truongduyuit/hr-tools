import mongoose from "mongoose";

export interface IScheduleModel extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    candidateId: string;
    branchWorkAddress: string;
    branchInterviewAddress: string;
    date: Date;
    note: string;
}

const schema = new mongoose.Schema(
    {
        candidateId: { type: mongoose.Types.ObjectId },
        branchWorkAddress: { type: String },
        branchInterviewAddress: { type: String },
        date: {
            type: Date
        },
        note: {
            type: String
        }
    },
    {
        collection: "candidate",
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

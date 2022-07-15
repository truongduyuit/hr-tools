import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import {
  CandidateFunctions,
  Schedule,
  ScheduleFunctions,
} from "../../../database";

type Data = {
  value: any;
  isSuccess: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await mongoose.startSession();
  let result;

  try {
    if (req.method === "POST") {
      await session.startTransaction();
      const {
        candidateId,
        workBranchId,
        interviewBranchId,
        date,
        note,
        position,
        selectBrand,
      } = req.body;

      const schedule = await ScheduleFunctions.create(
        {
          candidateId,
          workBranchId,
          interviewBranchId,
          date,
          note,
          position,
          selectBrand,
        },
        { session }
      );

      await CandidateFunctions.updateById(
        candidateId,
        {
          haveSchedule: true,
          scheduleId: schedule._id,
        },
        { session }
      );

      result = schedule;
      await session.commitTransaction();
      session.endSession();
    } else if (req.method === "GET") {
      const { fromDate, toDate } = req.query;
      result = await ScheduleFunctions.populate({
        page: 0, limit: 10,
        query: {
          $and: [
            {
              date: {
                $gte: fromDate,
              },
            },
            {
              date: {
                $lte: toDate,
              },
            },
          ],
        },
        sort: {
          date: 1,
        },
        populate: [
          {
            path: "candidateInfo",
            select: "name phone",
          },
          {
            path: "interviewBranchInfo",
            select: "symbol hotline email detail",
          },
        ],
      });
    }

    return res.status(200).json({ value: result, isSuccess: true });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return res.status(200).json({ value: "John Doe", isSuccess: false });
  }
}

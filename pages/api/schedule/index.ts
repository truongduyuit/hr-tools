import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { CandidateFunctions, ScheduleFunctions } from "../../../database";

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
        workAddress,
        interviewAddress,
        date,
        note,
        position,
        selectBrand,
      } = req.body;

      const schedule = await ScheduleFunctions.create(
        { candidateId, workAddress, interviewAddress, date, note },
        { session }
      );

      await CandidateFunctions.updateById(
        candidateId,
        {
          haveSchedule: true,
          scheduleId: schedule._id,
          position,
          selectBrand,
        },
        { session }
      );

      result = schedule;
      await session.commitTransaction();
      session.endSession();
    } else if (req.method === "GET") {
    }

    return res.status(200).json({ value: result, isSuccess: true });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return res.status(200).json({ value: "John Doe", isSuccess: false });
  }
}

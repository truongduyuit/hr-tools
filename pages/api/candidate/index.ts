import type { NextApiRequest, NextApiResponse } from "next";
import { CandidateFunctions } from "../../../database/functions/candidate.function";

type Data = {
  value: any;
  isSuccess: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { candidates } = req.body;

    const result = await CandidateFunctions.insertMany(candidates);
    return res.status(200).json({ value: result, isSuccess: true });
  } else if (req.method === "GET") {
    const {
      page,
      limit,
      search,
      fromDate,
      toDate,
      position,
      status,
      haveSchedule,
    } = req.query;

    let query = {} as any;
    if (search && search !== "") {
      query = {
        ...query,
        $or: [
          { nameNoAccent: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } },
        ],
      };
    }

    if (position) {
      query = {
        ...query,
        position,
      };
    }

    if (status) {
      query = {
        ...query,
        status,
      };
    }

    if (haveSchedule) {
      query = {
        ...query,
        haveSchedule: haveSchedule === "true",
      };
    }

    if (fromDate && toDate) {
      query = {
        ...query,
        $and: [
          { timeApply: { $gt: fromDate } },
          { timeApply: { $lte: toDate } }
        ]
      };
    } else if (fromDate) {
      query = {
        ...query,
        timeApply: { $gt: fromDate }
      };
    } else if (toDate) {
      query = {
        ...query,
        timeApply: { $lte: toDate }
      };
    }

    const result = await CandidateFunctions.populate({
      query,
      page: parseInt(String(page)),
      limit: parseInt(String(limit)),
      sort: {
        createdAt: -1,
      },
      populate: {
        path: "scheduleInfo",
        select: "date note position selectBrand workBranchId interviewBranchId",
        populate: [
          {
            path: "workBranchInfo",
            select: "symbol province district detail",
          },
          {
            path: "interviewBranchInfo",
            select: "symbol province district detail",
          },
        ],
      },
    });
    return res.status(200).json({ value: result, isSuccess: true });
  }

  return res.status(200).json({ value: "John Doe", isSuccess: true });
}

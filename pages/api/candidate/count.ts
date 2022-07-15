// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { CandidateFunctions } from "../../../database";

type Data = {
  value: any;
  isSuccess: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { fromDate, toDate } = req.query;

  const candidate = await CandidateFunctions.countByQuery({
    query: {
      $and: [
        {
          timeApply: {
            $gte: fromDate,
          },
        },
        {
          timeApply: {
            $lte: toDate,
          },
        },
      ],
    },
  });
  return res.status(200).json({ value: String(candidate), isSuccess: true });
}

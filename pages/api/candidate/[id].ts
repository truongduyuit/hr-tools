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
  const candidate = await CandidateFunctions.getById(req.query.id);
  return res.status(200).json({ value: candidate, isSuccess: true });
}

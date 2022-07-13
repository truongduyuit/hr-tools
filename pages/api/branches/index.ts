// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { BranchFunctions } from "../../../database/functions/branch.functions";

type Data = {
  value: any;
  isSuccess: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const branches = await BranchFunctions.getAll({
      path: "addressInfo",
      select: "province district detail",
      populate: {
        path: "",
        select: ""
      }
    });
    return res.status(200).json({ value: branches, isSuccess: true });
  } catch (error) {
    return res.status(200).json({ value: [], isSuccess: false });
  }
}

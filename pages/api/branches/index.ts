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
    let result;
    if (req.method === "GET") {
      const { page, limit, search } = req.query;
      let query = {} as any;
      if (search) {
        query = {
          ...query,
          $or: [
            { symbol: { $regex: search, $options: "i" } },
            { hotline: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { province: { $regex: search, $options: "i" } },
            { district: { $regex: search, $options: "i" } },
          ],
        };
      }

      result = await BranchFunctions.getByQuery({
        query,
        page: +String(page),
        limit: +String(limit),
      });
    } else if (req.method === "POST") {
      const {
        _id,
        symbol,
        type,
        province,
        district,
        detail,
        hotline,
        lead,
        status,
      } = req.body;

      if (_id) {
        result = await BranchFunctions.updateById(_id, {
          symbol,
          type,
          province,
          district,
          detail,
          hotline,
          lead,
          status,
        });
      } else {
        result = await BranchFunctions.create({
          symbol,
          type,
          province,
          district,
          detail,
          hotline,
          lead,
          status,
        });
      }
    }

    return res.status(200).json({ value: result, isSuccess: true });
  } catch (error) {
    console.log("Error: ", error);
    return res.status(200).json({ value: [], isSuccess: false });
  }
}

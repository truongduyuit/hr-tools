// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { AccountFunctions } from "../../../database";
import bcrypt from "bcryptjs";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from "../../../services/jwt";

type Data = {
  value: any;
  isSuccess: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { accessToken } = req.body;
    const match: any = verifyToken(accessToken);

    if (match && match.userId) {
      let user = await AccountFunctions.getOne({
        _id: match.userId,
        status: true,
      });

      if (!user) {
        return res.status(200).json({ value: {}, isSuccess: false });
      }

      return res.status(200).json({
        value: {},
        isSuccess: true,
      });
    }

    return res.status(200).json({ value: {}, isSuccess: false });
  } catch (error) {
    return res.status(200).json({ value: {}, isSuccess: false });
  }
}

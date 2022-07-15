// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { AccountFunctions } from "../../../database";
import bcrypt from "bcryptjs";
import {
  generateAccessToken,
  generateRefreshToken,
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
    const { phone, password } = req.body;

    let user = await AccountFunctions.getOne({
      phone,
      status: true,
    });

    if (!user) {
      return res.status(200).json({ value: {}, isSuccess: false });
    }

    const isMatch = await bcrypt.compare(user.password, password);
    if (!isMatch) {
      return res.status(200).json({ value: {}, isSuccess: false });
    }

    return res.status(200).json({
      value: {
        userId: user.id,
        accessToken: generateAccessToken(user),
        refreshToken: generateRefreshToken(user),
      },
      isSuccess: true,
    });
  } catch (error) {
    return res.status(200).json({ value: {}, isSuccess: false });
  }
}

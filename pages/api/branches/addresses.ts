// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { BranchFunctions } from "../../../database/functions/branch.functions";
import AppCache from "../../../services/nodeCache";

type Data = {
  value: any;
  isSuccess: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { appCache } = AppCache.getInstance();

    const addressesKey = "branch-addresses"
    const typeKey = "branch-type"

    let addresses = await appCache.get(addressesKey);
    let types = await appCache.get(typeKey);

    if (!addresses) {
        addresses = await BranchFunctions.getAllAndSelect("province district detail type");

        const type = new Set()
        JSON.parse(JSON.stringify(addresses)).map((a: any) => type.add(a.type))
        types = Array.from(type);

        appCache.set(addressesKey, addresses, 60 * 60 * 24);
        appCache.set(typeKey, types, 60 * 60 * 24);
    }

    return res.status(200).json({ value: {addresses, types}, isSuccess: true });
  } catch (error) {
    return res.status(200).json({ value: [], isSuccess: false });
  }
}

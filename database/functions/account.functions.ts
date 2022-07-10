import { MongooseBaseService } from "..";
import { Account, IAccountModel } from "../models/account.model";

export const AccountFuntions = Object.freeze(
  new MongooseBaseService<IAccountModel>(Account)
);

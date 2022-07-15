import { MongooseBaseService } from "..";
import { Account, IAccountModel } from "../models/account.model";

export const AccountFunctions = Object.freeze(
  new MongooseBaseService<IAccountModel>(Account)
);

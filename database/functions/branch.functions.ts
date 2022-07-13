import { MongooseBaseService } from "..";
import { Branch, IBranchModel } from "../models";

export const BranchFunctions = Object.freeze(
  new MongooseBaseService<IBranchModel>(Branch)
);

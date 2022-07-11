import { MongooseBaseService } from "..";
import { Address, IAddressModel } from "../models";

export const AddressFunctions = Object.freeze(
  new MongooseBaseService<IAddressModel>(Address)
);

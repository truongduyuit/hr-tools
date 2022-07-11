import { MongooseBaseService } from "..";
import { Candidate, ICandidateModel } from "../models";

export const CandidateFunctions = Object.freeze(
  new MongooseBaseService<ICandidateModel>(Candidate)
);

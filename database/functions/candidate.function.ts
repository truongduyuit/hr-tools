import { MongooseBaseService } from "..";
import { Candidate, ICandidateModel } from "../models";

export const CandidateFuntions = Object.freeze(
  new MongooseBaseService<ICandidateModel>(Candidate)
);

import { MongooseBaseService } from "..";
import { Schedule, IScheduleModel } from "../models";

export const ScheduleFunctions = Object.freeze(
  new MongooseBaseService<IScheduleModel>(Schedule)
);

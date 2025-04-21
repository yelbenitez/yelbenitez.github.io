import {
  BaseActivityFlow,
  RoundActivityFlow,
  ActivityFlow,
  Round,
  Question,
} from "../types/activities.types";
import { isValidActivity } from "./typeGuard.utils";

export const flowGuard = (
  activity: BaseActivityFlow | RoundActivityFlow,
): ActivityFlow | null => {
  if (!activity.questions.length) {
    return null;
  }

  if (activity.questions[0].hasOwnProperty("round_title")) {
    return "round";
  }

  return "base";
};

export const getQuestions = (
  activity: BaseActivityFlow | RoundActivityFlow,
  flow: ActivityFlow,
  index: number,
): Question[] => {
  if (!isValidActivity(activity)) return [];
  if (flow === "round") {
    return (activity.questions[index] as Round).questions;
  }
  return activity.questions as Question[];
};

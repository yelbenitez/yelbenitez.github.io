import {
  BaseActivityFlow,
  RoundActivityFlow,
  ActivityFlow,
} from "../types/activities.types";

export const flowGuard = (
  activity: BaseActivityFlow | RoundActivityFlow,
): ActivityFlow | null => {
  if (!activity.questions.length) {
    console.log("Activity is empty");
    return null;
  }

  if (activity.questions[0].hasOwnProperty("round_title")) {
    return "round";
  }

  return "base";
};

import { BaseActivityFlow, RoundActivityFlow } from "../types/activities.types";

// Type guard to check if activity is BaseActivityFlow or RoundActivityFlow
export const isValidActivity = (
  activity: BaseActivityFlow | RoundActivityFlow | {},
): activity is BaseActivityFlow | RoundActivityFlow => {
  return (
    activity !== null && "activity_name" in activity && "questions" in activity
  );
};

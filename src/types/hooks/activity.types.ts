import { ActivityList, ActivityFlow } from "../activities.types";
export type ActivityContextType = [
  ActivityStateType,
  React.Dispatch<{ type: string; payload: ActivityStateType }>,
];
export type ActivityStateType = {
  activities: ActivityList[] | [];
  selectedActivity: number;
  flow: ActivityFlow;
};

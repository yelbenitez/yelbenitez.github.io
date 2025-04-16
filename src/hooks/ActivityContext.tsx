import { createContext, useReducer } from "react";
import {
  ActivityContextType,
  ActivityStateType,
} from "../types/hooks/activity.types";

export const ActivityContext = createContext<ActivityContextType | null>(null);

const initialState: ActivityStateType = {
  activities: [],
  selectedActivity: 0,
  flow: "base",
};

const reducer = (
  state: ActivityStateType,
  action: { type: string; payload: ActivityStateType },
): ActivityStateType => {
  let newState = {
    ...state,
    activities: state.activities,
    selectedActivity: state.selectedActivity,
    flow: state.flow,
  };

  switch (action.type) {
    case "SET_ACTIVITIES":
      newState.activities = action.payload.activities;
      return newState;
    case "SET_SELECTED_ACTIVITY":
      newState.selectedActivity = action.payload.selectedActivity;
      newState.flow = action.payload.flow;
      return newState;
    default:
      return state;
  }
};

export const ActivityContextProvider = (props: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ActivityContext.Provider value={[state, dispatch]}>
      {props.children}
    </ActivityContext.Provider>
  );
};

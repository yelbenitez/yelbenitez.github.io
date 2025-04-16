import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../constants/Routes";
import { ActivityContext } from "../hooks/ActivityContext";
import { isValidActivity } from "../utils/typeGuard.utils";
import {
  BaseActivityFlow,
  RoundActivityFlow,
  Question,
} from "../types/activities.types";
import QuestionCard from "../components/QuestionCard";

const Score = () => {
  const [activityStore] = useContext(ActivityContext)!;
  const [activity] = useState<BaseActivityFlow | RoundActivityFlow | {}>(
    activityStore.activities[activityStore.selectedActivity] || {},
  );

  if (isValidActivity(activity)) {
    return (
      <div>
        {activity.activity_name}
        <h1>Result</h1>
        {(activity.questions as Question[]).map(
          (question: Question, index: number) => {
            return (
              <div key={index}>
                <QuestionCard
                  question={question as Question}
                  next={() => {}}
                  mode="result"
                />
              </div>
            );
          },
        )}
        <Link to={ROUTES.home.path}>Go to Home</Link>
      </div>
    );
  }

  return <div>No activity selected</div>;
};

export default Score;
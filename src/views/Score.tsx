import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../constants/Routes";
import { ActivityContext } from "../hooks/ActivityContext";
import { isValidActivity } from "../utils/typeGuard.utils";
import { getQuestions } from "../utils/activity.utils";
import {
  BaseActivityFlow,
  RoundActivityFlow,
  Question,
  Round
} from "../types/activities.types";
import QuestionCard from "../components/QuestionCard";

const Score = () => {
  const [activityStore] = useContext(ActivityContext)!;
  const [activity] = useState<BaseActivityFlow | RoundActivityFlow | {}>(
    activityStore.activities[activityStore.selectedActivity] || {},
  );

  if (isValidActivity(activity)) {
    let resultList = (
      <>
        {(activity.questions as Question[]).map(
          (question: Question,index: number) => {
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
      </>
    )

    if (activityStore.flow === "round") {
      resultList = (
        <>
          {(activity.questions as Round[]).map(
          (round: Round, index: number) => {
            return (
              <div key={index}>
                <h3>{round.round_title}</h3>
                {(round.questions as Question[]).map(
                  (question: Question,yindex: number) => {
                    return (
                      <div key={yindex}>
                        <QuestionCard
                          question={getQuestions(activity, activityStore.flow, index)[question.order-1] as Question}
                          next={() => {}}
                          mode="result"
                        />
                      </div>
                    );
                  },
                )}
              </div>
            );
          },
        )}
        </>
      )
    }

    return (
      <div>
        {activity.activity_name}
        <h1>Result</h1>
        {resultList}
        <Link to={ROUTES.home.path}>Go to Home</Link>
      </div>
    );
  }

  return <div>No activity selected</div>;
};

export default Score;
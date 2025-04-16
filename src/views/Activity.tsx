import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ActivityContext } from "../hooks/ActivityContext";
import { isValidActivity } from "../utils/typeGuard.utils";
import { ROUTES } from "../constants/Routes";

import {
  BaseActivityFlow,
  RoundActivityFlow,
  Question,
} from "../types/activities.types";
import QuestionCard from "../components/QuestionCard";

const Activity = () => {
  const navigate = useNavigate();
  const [activityStore] = useContext(ActivityContext)!;
  const [activity, setActivity] = useState<
    BaseActivityFlow | RoundActivityFlow | {}
  >(activityStore.activities[activityStore.selectedActivity] || {});
  const [questionCursor, setQuestionCursor] = useState<number>(0);
  // const [roundCursor, setRoundCursor] = useState<number>(0);
  // console.log(activityStore);
  const answerQuestion = (isCorrect: boolean, questionOrder: number) => {
    const updateActivity = activity;
    const index = questionOrder - 1;
    if (isValidActivity(updateActivity)) {
      (updateActivity.questions[index] as Question).user_answers.push(
        isCorrect,
      );
      setActivity(updateActivity);

      if (questionOrder - 1 === updateActivity.questions.length - 1) {
        navigate(ROUTES.score.path);
      } else {
        setQuestionCursor(index + 1);
      }
    }
  };

  if (isValidActivity(activity)) {
    return (
      <div>
        {activity.activity_name}
        <QuestionCard
          question={activity.questions[questionCursor] as Question}
          next={answerQuestion}
          mode="question"
        />
      </div>
    );
  }

  return <div>No activity selected</div>;
};

export default Activity;

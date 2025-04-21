import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ActivityContext } from "../hooks/ActivityContext";
import { isValidActivity } from "../utils/typeGuard.utils";
import { getQuestions } from "../utils/activity.utils";
import { ROUTES } from "../constants/Routes";

import {
  BaseActivityFlow,
  RoundActivityFlow,
  Question,
  Round,
} from "../types/activities.types";
import QuestionCard from "../components/QuestionCard";
import RoundCard from "../components/RoundCard";
import styles from "../styles/views/Activity.module.css";

type cardType = "question" | "round";

const Activity = () => {
  const navigate = useNavigate();
  const [activityStore] = useContext(ActivityContext)!;
  const [activity, setActivity] = useState<
    BaseActivityFlow | RoundActivityFlow | {}
  >(activityStore.activities[activityStore.selectedActivity] || {});
  const [questionCursor, setQuestionCursor] = useState<number>(0);
  const [roundCursor, setRoundCursor] = useState<number>(0);
  const [showCard, setShowCard] = useState<cardType | null>(
    activityStore.flow === "base" ? "question" : "round",
  );

  const answerQuestion = (isCorrect: boolean, questionOrder: number) => {
    const updateActivity = activity;
    const index = questionOrder - 1;

    if (isValidActivity(updateActivity)) {
      switch (activityStore.flow) {
        case "base":
          (updateActivity.questions[index] as Question).user_answers.push(
            isCorrect,
          );
          setActivity(updateActivity);

          if (questionOrder - 1 === updateActivity.questions.length - 1) {
            navigate(ROUTES.result.path);
          } else {
            setQuestionCursor(index + 1);
          }
          break;
        case "round":
          const roundIndex = roundCursor;

          (
            (updateActivity.questions[roundIndex] as Round).questions[
              index
            ] as Question
          ).user_answers.push(isCorrect);
          setActivity(updateActivity);

          if (
            questionOrder - 1 ===
            (updateActivity.questions as Round[])[roundIndex].questions.length -
              1
          ) {
            if (roundCursor === updateActivity.questions.length - 1) {
              navigate(ROUTES.result.path);
            } else {
              setRoundCursor(roundIndex + 1);
              setShowCard("round");
              setQuestionCursor(0);
            }
          } else {
            setQuestionCursor(index + 1);
          }
          break;
        default:
          break;
      }
    }
  };

  const skip = () => {
    setShowCard("question");
  };

  let card;
  if (isValidActivity(activity)) {
    if (showCard === "question") {
      card = (
        <>
          <QuestionCard
            question={
              getQuestions(activity, activityStore.flow, roundCursor)[
                questionCursor
              ] as Question
            }
            next={answerQuestion}
            mode="question"
          />
        </>
      );
    } else {
      card = (
        <>
          <RoundCard
            round={activity.questions[roundCursor] as Round}
            next={skip}
          />
        </>
      );
    }
  }

  if (isValidActivity(activity)) {
    return (
      <div className={styles["activity"]}>
        <p>
          #️⃣ {activity.activity_name}{" "}
          {activityStore.flow === "round" ? `/ Round ${roundCursor + 1}` : ""}
        </p>
        {card}
      </div>
    );
  }

  return <div>No activity selected</div>;
};

export default Activity;

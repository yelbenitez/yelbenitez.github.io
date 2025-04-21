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
  Round,
} from "../types/activities.types";
import QuestionCard from "../components/QuestionCard";
import styles from "../styles/views/Result.module.css";

const Result = () => {
  const [activityStore] = useContext(ActivityContext)!;
  const [activity] = useState<BaseActivityFlow | RoundActivityFlow | {}>(
    activityStore.activities[activityStore.selectedActivity] || {},
  );

  if (isValidActivity(activity)) {
    let resultList = (
      <>
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
      </>
    );

    if (activityStore.flow === "round") {
      resultList = (
        <>
          {(activity.questions as Round[]).map(
            (round: Round, index: number) => {
              return (
                <div className={styles["result__list"]} key={index}>
                  <h3>{round.round_title}</h3>
                  {(round.questions as Question[]).map(
                    (question: Question, yindex: number) => {
                      return (
                        <div key={yindex}>
                          <QuestionCard
                            question={
                              getQuestions(activity, activityStore.flow, index)[
                                question.order - 1
                              ] as Question
                            }
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
      );
    }

    const getTotalScore = (questions: Question[] | Round[]) => {
      if (activityStore.flow === "base") {
        return (
          (questions as Question[]).reduce(
            (acc, question) =>
              acc + (question.user_answers[0] === question.is_correct ? 1 : 0),
            0,
          ) + `/${questions.length}`
        );
      } else if (activityStore.flow === "round") {
        return (
          (questions as Round[]).reduce(
            (acc, round) =>
              acc +
              (round.questions as Question[]).reduce(
                (acc, question) =>
                  acc +
                  (question.user_answers[0] === question.is_correct ? 1 : 0),
                0,
              ),
            0,
          ) +
          `/${(questions as Round[]).reduce((total, round) => total + round.questions.length, 0)}`
        );
      }
    };

    return (
      <div className={styles["result"]}>
        <p>#️⃣ {activity.activity_name}</p>
        <h1>Score: {getTotalScore(activity.questions as Question[])}</h1>
        <div className={styles["result__list"]}>{resultList}</div>
        <div className={styles["result__link"]}>
          <Link to={ROUTES.home.path}>Go to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="no-activity">
      <p>No activity selected</p>
      <Link to={ROUTES.home.path}>Go to Home</Link>
    </div>
  );
};

export default Result;

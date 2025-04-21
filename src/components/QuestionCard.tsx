import { Question } from "../types/activities.types";
import Button from "./Button";
import styles from "../styles/components/QuestionCard.module.css";
type mode = "question" | "result";

const QuestionCard = (props: {
  question: Question;
  next: (isCorrect: boolean, questionOrder: number) => void;
  mode: mode;
}) => {
  const footerClasses = `${styles["question-card__footer"]} ${props.question.user_answers[0] === props.question.is_correct ? styles["question-card__footer--correct"] : styles["question-card__footer--incorrect"]}`;
  let footer = (
    <>
      <Button func={() => props.next(true, props.question.order)}>
        Correct
      </Button>
      <Button func={() => props.next(false, props.question.order)}>
        Incorrect
      </Button>
    </>
  );

  if (props.mode === "result") {
    footer = (
      <>
        <p>
          Your answer:{" "}
          {props.question.user_answers[0] ? "correct" : "incorrect"}{" "}
          {props.question.user_answers[0] === props.question.is_correct
            ? "🎉"
            : "😢"}
        </p>
        <p>
          {`Feedback: (${props.question.is_correct ? "correct" : "incorrect"}) ${props.question.feedback}`}
        </p>
      </>
    );
  }

  const HighlightedText = ({ text }: { text: string }) => {
    const parts = text.split(/(\*.*?\*)/);
    return (
      <p>
        {parts.map((part, index) => {
          if (part.startsWith("*") && part.endsWith("*")) {
            const highlightedText = part.slice(1, -1);
            return (
              <span key={index} className={styles["question-card__stimulus"]}>
                {highlightedText}
              </span>
            );
          } else {
            return <span key={index}>{part}</span>;
          }
        })}
      </p>
    );
  };

  return (
    <div className={styles["question-card"]}>
      <div className={styles["question-card__content"]}>
        <h1>Question {props.question.order}</h1>
        <HighlightedText text={props.question.stimulus} />
      </div>
      <div
        className={
          props.mode === "result"
            ? footerClasses
            : styles["question-card__footer"]
        }
      >
        {footer}
      </div>
    </div>
  );
};

export default QuestionCard;

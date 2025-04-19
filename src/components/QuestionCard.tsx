import { Question } from "../types/activities.types";
type mode = "question" | "result";

const QuestionCard = (props: { question: Question; next: any; mode: mode}) => {
  let footer = (
    <>
      <button onClick={() => props.next(true, props.question.order)}>
        Correct
      </button>
      <button onClick={() => props.next(false, props.question.order)}>
        Incorrect
      </button>
    </>
  );

  if (props.mode === "result") {
    footer = (
      <>
        <p>
          Answer: {props.question.user_answers[0] ? "correct" : "incorrect"}{" "}
          {props.question.user_answers[0] === props.question.is_correct
            ? "🎉"
            : "😢"}
        </p>
        <p>
          {props.question.user_answers[0] !== props.question.is_correct
            ? `Feedback: ${props.question.feedback}`
            : ""}
        </p>
      </>
    );
  }

  return (
    <>
      <h1>Q{props.question.order}.</h1>
      <p>{props.question.stimulus}</p>
      {footer}
    </>
  );
};

export default QuestionCard;

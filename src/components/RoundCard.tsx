import { Round } from "../types/activities.types";
import Button from "./Button";
import styles from "../styles/components/RoundCard.module.css";

const RoundCard = (props: { round: Round; next: any }) => {
  return (
    <>
      <div className={styles["round-card"]}>
        <h1>{props.round.round_title}</h1>
        <p>No. of questions: {props.round.questions.length}</p>
        <Button func={() => props.next()}>Start</Button>
      </div>
    </>
  );
};

export default RoundCard;

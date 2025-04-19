import { Round } from "../types/activities.types";

const RoundCard = (props: {round: Round; next: any;}) => {
    return (
        <>
            <p>{props.round.round_title}</p>
            <h1>Round {props.round.order}</h1>
            <button onClick={()=>props.next()}>Start</button>
        </>
    )
};

export default RoundCard;
export type Question = {
  is_correct: boolean;
  stimulus: string;
  order: number;
  user_answers: boolean[];
  feedback: string;
};

export type Round = {
  round_title: string;
  order: number;
  questions: Question[];
};

export type BaseActivityFlow = {
  activity_name: string;
  order: number;
  questions: Question[];
};

export type RoundActivityFlow = Omit<BaseActivityFlow, "questions"> & {
  questions: Round[];
};

export type ActivityFlow = "base" | "round" | null;

export type ActivityList = (BaseActivityFlow | RoundActivityFlow)[] | [];

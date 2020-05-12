import {ScoreValue} from "@app/model/score-value";

export class Score {
  id : number;
  date: string;
  completed: boolean;
  listOrder: number;
  values : ScoreValue[];
}

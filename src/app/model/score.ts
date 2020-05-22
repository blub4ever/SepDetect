import {ScoreValue} from "@app/model/score-value";

export class Score {
  id : number;
  startDate: string;
  endDate: string;
  completed: boolean;
  listOrder: number;
  values : ScoreValue[];
}

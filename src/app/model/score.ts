import {ScoreValue} from '@app/model/score-value';

/**
 * SOFA-Verlauf
 */
export class Score {
  /**
   * Eindeutige ID
   */
  id: number;

  /**
   * Start des SOFA-Verlaufes
   */
  startDate: string;
  /**
   * Ende des SOFA-Veraufes
   */
  endDate: string;

  /**
   * Sofa-Verlauf abgeschlossen
   */
  completed: boolean;

  /**
   * Index in der Patienten-Score-Liste
   */
  listOrder: number;

  /**
   * Alle SOFA-Werte
   */
  values: ScoreValue[];
}

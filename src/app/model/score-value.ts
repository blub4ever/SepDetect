/**
 * SOFA Werte
 */
export class ScoreValue {
  /**
   * Eindeutige ID
   */
  id: number;
  /**
   * Datum des SOFA-Scores
   */
  date: string;
  /**
   * POA
   */
  pao: number;
  /**
   * GCS
   */
  gcs: number;
  /**
   * MAP
   */
  map: number;
  /**
   * Lever Funktion
   */
  liver: number;
  /**
   * Blutgerinnung
   */
  coagulation: number;
  /**
   * Kreatinin
   */
  krea: number;
  /**
   * Summe aller o.g. Variablen
   */
  total: number;
  /**
   * Index in der SOFA-Score-Verlauf-Liste
   */
  listOrder: number;
}

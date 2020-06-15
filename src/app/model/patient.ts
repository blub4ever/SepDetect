import {Person} from "@app/model/person";
import {Organization} from "@app/model/organization";
import {Score} from "@app/model/score";

/**
 * Patient
 */
export class Patient {
  /**
   * Eindeutige ID
   */
  personId: number;

  /**
   * Piz
   */
  piz: string;

  /**
   * Raum in dem sich der Patient aufhält
   */
  room: string;

  /**
   * Aktiv oder Inaktiv
   */
  active: boolean;

  /**
   * Stammdaten
   */
  person: Person;

  /**
   * Zugewiesene Organisationseinheit
   */
  organization: Organization;

  /**
   * Liste aller SOFA-Verläufe
   */
  scores: Score[];
}

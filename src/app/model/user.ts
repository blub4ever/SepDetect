import {Person} from './person';
import {Organization} from './organization';

/**
 * Benutzer
 */
export class User {
  /**
   * Eindeutige ID
   */
  personId: number;
  /**
   * Username, Loginname
   */
  name: string;
  /**
   * Passwort
   */
  pw: string;
  /**
   * Email
   */
  email: string;
  /**
   * Datum des letzten Logins
   */
  lastLogin: number;
  /**
   * Rolle, Admin, User
   */
  role: string;
  /**
   * Stammdaten
   */
  person: Person;
  /**
   * Eindeutiger Token vom Backend, verhindert doppelten Login.
   */
  token: string;
  /**
   * Liste aller Organisationen auf die der Benutzer zugreifen darf.
   */
  organization: Organization[];
}

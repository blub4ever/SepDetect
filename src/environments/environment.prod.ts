import {URLS} from '../assets/config';

export * from '../assets/config';

/**
 * Umgebung für produktiven Einsatz
 */
export const environment = {

  /**
   * Produktiver Einsatz
   */
  production: true,

  /**
   * Backend-URL, kann entweder hier fest gestzt werden oder in assests/config.ts. Sollte die zweite
   * Möglichkeit verwendet werden, muss _apiUrl leer bleiben.
   */
  _apiUrl: '',

  /**
   *  Wurde _apiUrl gesetzt, wird diese zurück gegeben. Andernfalls wird in assets/config.ts nach der
   *  apiURl gesucht.
   */
  get apiUrl() {
    if (!this._apiUrl || this._apiUrl === '') {
      return URLS.backend;
    } else {
      return this._apiUrl;
    }
  }

};

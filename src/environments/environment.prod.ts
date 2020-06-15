import {URLS} from "../assets/config";

export * from '../assets/config';

export const environment = {
  production: true,

  _apiUrl: 'https://sepdetect.com/api',

  get apiUrl() {
    if (!this._apiUrl || this._apiUrl === '') {
      return URLS.backend;
    } else {
      return this._apiUrl;
    }
  }

};

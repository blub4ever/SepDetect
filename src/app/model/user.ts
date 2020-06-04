import {Person} from './person';
import {Organization} from './organization';

export class User {
  personId: number;
  name: string;
  pw: string
  email: string;
  lastLogin: number;
  role: string;
  person: Person;
  token: string;
  organization: Organization[];
}

import {Person} from "@app/model/person";
import {Organization} from "@app/model/organization";
import {Score} from "@app/model/score";

export class Patient {
  personId: number;
  piz: string;
  room: string;
  active: boolean;
  person: Person;
  organization: Organization;
  scores: Score[];
}

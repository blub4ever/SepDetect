import {User} from "@app/model/user";

export class UserAuth {
  expires: number;
  token: string;
  user: User;
}

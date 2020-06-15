import {User} from '@app/model/user';

/**
 * Auth-Objekt vom Backend
 */
export class UserAuth {
  /**
   * Zeit bis der Login ungültig wird. In ms.
   */
  expires: number;
  /**
   * JWT
   */
  token: string;
  /**
   * User-Objekt
   */
  user: User;
}

import {User} from '@app/model/user';

/**
 * Auth-Objekt vom Bakcend
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

import {HttpHeaders} from "@angular/common/http";

/**
 * Abstrakte Parent-Klasse für eine Rest-Services
 */
export class AbstractHttpService {

  /**
   * JSON-Header
   */
  protected static httpJsonContent = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
}

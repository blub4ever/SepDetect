import {Injectable} from '@angular/core';
import {AbstractHttpService} from '@app/services/rest/abstract-http-service';
import {Patient, Score, ScoreValue} from '@app/model';
import {environment} from '@environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

/**
 * Rest Service für SOFA-Scores. Ermöglicht das Erstellen und Manipulieren von SOFA-Einträgen.
 */
@Injectable({
  providedIn: 'root'
})
export class ScoreValueService extends AbstractHttpService {

  constructor(private http: HttpClient) {
    super();
  }

  /**
   * Gibt einen bestimmten SOFA-Score zurück.
   * @param scoreValueID SOFA-Score ID
   */
  getScoreValue(scoreValueID: number): Observable<ScoreValue> {
    return this.http.get<ScoreValue>(`${environment.apiUrl}/score/value/get/${scoreValueID}`);
  }

  /**
   * Ermöglicht das nachträgliche verändern von SOFA-Scores.
   * @param scoreValue SOFA-Score Objekt mit passender ID.
   */
  editScoreValue(scoreValue: ScoreValue): Observable<ScoreValue> {
    return this.http.put<ScoreValue>(`${environment.apiUrl}/score/value/edit`, scoreValue, ScoreValueService.httpJsonContent);
  }

  /**
   * Erstellt einen neuen SOFA-Score.
   * @param scoreValue SOFA-Score Objekt.
   * @param patientId Patienten ID zu dem der SOFA-Score gehört.
   * @param newScore Wenn newScore = true, dann wird auf alle Fälle ein neuer Verlauf angelegt. Wenn newScore = false
   * wird der neue SOFA-Wert dem aktuellen Verlauf hinzugefügt. Falls kein aktiver Verlauf vorhanden ist, wird ein neuer
   * Verlauf angelegt.
   */
  createScoreValue(scoreValue: ScoreValue, patientId: number, newScore: boolean = false): Observable<ScoreValue> {
    return this.http.post<ScoreValue>(`${environment.apiUrl}/score/value/add/${patientId}?newScore=${newScore}`,
      scoreValue, ScoreValueService.httpJsonContent);
  }

  /**
   * Schließt einen SOFA-Score-Verlauf ab
   * @param scoreId ID des SOFA-Verlaufs
   */
  endScore(scoreId: number): Observable<Score> {
    return this.http.get<Score>(`${environment.apiUrl}/score/end/${scoreId}`);
  }

  /**
   * Schließt den letzten SOFA-Score-Verlauf ab.
   * @param patientId ID des Patienten
   */
  endLastScore(patientId: number): Observable<Score> {
    return this.http.get<Score>(`${environment.apiUrl}/score/end/last/${patientId}`);
  }

  /**
   * Löscht einen SOFA-Score Eintrag aus einem Verlauf.
   * @param scoreValueId ID des Eintrags
   */
  deleteScoreValue(scoreValueId: number) {
    return this.http.delete<string>(`${environment.apiUrl}/score/value/delete/${scoreValueId}`);
  }
}

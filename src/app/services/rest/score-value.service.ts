import {Injectable} from '@angular/core';
import {AbstractHttpService} from "@app/services/rest/abstract-http-service";
import {Patient, Score, ScoreValue} from "@app/model";
import {environment} from "@environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ScoreValueService extends AbstractHttpService {

  constructor(private http: HttpClient) {
    super()
  }

  getScoreValue(scoreValueID: number): Observable<ScoreValue> {
    return this.http.get<ScoreValue>(`${environment.apiUrl}/score/value/get/${scoreValueID}`);
  }

  editScoreValue(scoreValue: ScoreValue): Observable<ScoreValue> {
    return this.http.put<ScoreValue>(`${environment.apiUrl}/score/value/edit`, scoreValue, ScoreValueService.httpJsonContent)
  }

  createScoreValue(scoreValue: ScoreValue, patientId: number, newScore: boolean = false): Observable<ScoreValue> {
    return this.http.post<ScoreValue>(`${environment.apiUrl}/score/value/add/${patientId}?newScore=${newScore}`, scoreValue, ScoreValueService.httpJsonContent);
  }

  endScore(scoreId: number): Observable<Score> {
    return this.http.get<Score>(`${environment.apiUrl}/score/end/${scoreId}`);
  }

  endLastScore(patientId: number): Observable<Score> {
    return this.http.get<Score>(`${environment.apiUrl}/score/end/last/${patientId}`);
  }

  deleteScoreValue(scoreValueId: number) {
    return this.http.delete<string>(`${environment.apiUrl}/score/value/delete/${scoreValueId}`);
  }
}

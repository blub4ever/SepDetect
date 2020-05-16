import {Injectable} from '@angular/core';
import {Patient} from '@app/model';
import {environment} from '@environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AbstractHttpService} from "@app/services/rest/abstract-http-service";

@Injectable({
  providedIn: 'root'
})
export class PatientService extends AbstractHttpService {

  constructor(private http: HttpClient) {
    super();
  }

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${environment.apiUrl}/patients`);
  }

  getPatient(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${environment.apiUrl}/patient/get/${id}`);
  }

  createPatient(patient: Patient) {
    return this.http.post<Patient>(`${environment.apiUrl}/patient/add`, patient, PatientService.httpJsonContent);
  }
}

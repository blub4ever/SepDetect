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

  editPatient(patient: Patient) {
    return this.http.put<Patient>(`${environment.apiUrl}/patient/edit`, patient, PatientService.httpJsonContent);
  }

  deletePatient(patientID: number): Observable<string> {
    return this.http.delete<string>(`${environment.apiUrl}/patient/delete/${patientID}`);
  }

  findPatients(lastName: string, surname: string, birthday: string, gender: string): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${environment.apiUrl}/patient/search?lastname=${btoa(lastName)}&surname=${btoa(surname)}&birthday=${btoa(birthday)}&gender=${gender}`);
  }

  togglePatientActiveStatus(patientId: number, active: boolean): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/patient/active/${patientId}?active=${active}`);
  }
}

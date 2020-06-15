import {Injectable} from '@angular/core';
import {Patient} from '@app/model';
import {environment} from '@environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AbstractHttpService} from '@app/services/rest/abstract-http-service';

/**
 * Patienten Service zum abfragen und manipulieren von Patienten.
 */
@Injectable({
  providedIn: 'root'
})
export class PatientService extends AbstractHttpService {

  constructor(private http: HttpClient) {
    super();
  }

  /**
   * Gibt alle Patienten zurück die der Benutzer sehen darf und die aktiv sind.
   */
  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${environment.apiUrl}/patients`);
  }

  /**
   * Gibt des gewünschten Patienten zurück
   * @param id ID des Patienten
   */
  getPatient(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${environment.apiUrl}/patient/get/${id}`);
  }

  /**
   * Erstellt einen neuen Patienten
   * @param patient Patienten-Objekt
   */
  createPatient(patient: Patient) {
    return this.http.post<Patient>(`${environment.apiUrl}/patient/add`, patient, PatientService.httpJsonContent);
  }

  /**
   * Ermgölicht es das verändern von Patienten-Daten
   * @param patient Patienten-Objekt
   */
  editPatient(patient: Patient) {
    return this.http.put<Patient>(`${environment.apiUrl}/patient/edit`, patient, PatientService.httpJsonContent);
  }

  /**
   * Löscht den Patienten und alle SOFA-Verläufe.
   * @param patientID ID des Patienten
   */
  deletePatient(patientID: number): Observable<string> {
    return this.http.delete<string>(`${environment.apiUrl}/patient/delete/${patientID}`);
  }

  /**
   * Sucht nach Patienten anhand von den gegeben Paramentern. Soll ein parameter ignoriert werden muss null übergeben werden.
   * Werden mehrer Paramter übergeben werden diese per und verknüpft.
   * @param lastName Nachname
   * @param surname Vorname
   * @param birthday Geburstag
   * @param gender Geschlecht
   */
  findPatients(lastName: string, surname: string, birthday: string, gender: string): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${environment.apiUrl}/patient/search?lastname=${btoa(lastName)}&surname=${btoa(surname)}&birthday=${btoa(birthday)}&gender=${gender}`);
  }

  /**
   * Setzt den Stauts eines Patienten auf aktiv oder inaktiv
   * @param patientId Id des Patienten
   * @param active true für aktiv
   */
  togglePatientActiveStatus(patientId: number, active: boolean): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/patient/active/${patientId}?active=${active}`);
  }
}

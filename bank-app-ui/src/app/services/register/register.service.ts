import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from "src/app/model/user.model";
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) {}
  
  registerUser(user: User): Observable<HttpResponse<string>> {
    return this.http.post(`${environment.rooturl}/register`, user, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      observe: 'response',
      responseType: 'text'
    });
  }
  
}

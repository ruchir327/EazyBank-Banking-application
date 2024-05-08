import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoanApplication } from 'src/app/model/loanapplication.model';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http: HttpClient) { }

  applyForLoan(email: string, loanApplication: LoanApplication): Observable<any> {
    return this.http.post(environment.rooturl + '/applyForLoan', loanApplication, { observe: 'response' });
  }
}

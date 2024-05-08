// create-account.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Account } from '../../model/account.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateAccountService {

  constructor(private http: HttpClient) { }

  createAccount(email: string, account: Account) {
    return this.http.post(environment.rooturl + '/accounts/create?email=' + email, account, { observe: 'response' });
  }
  getAccount(email: string): Observable<Account> {
    return this.http.get<Account>(environment.rooturl + '/myAccount?email=' + email);
  }
  updateAccount(email: string, account: Account) {
    return this.http.put(environment.rooturl + '/update?email=' + email, account, { observe: 'response' });
  }
  deleteAccount(email: string, accountNumber: number) {
    return this.http.delete(environment.rooturl + '/delete/' + accountNumber + '?email=' + email, { observe: 'response' });
  }
}

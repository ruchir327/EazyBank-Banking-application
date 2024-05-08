import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TransferRequest } from '../../model/transfer-request.model';
import { map } from 'rxjs/operators'; // Import map operator
import { Deposit } from '../../model/deposit.model'; // Import Deposit model
import { Withdrawal } from '../../model/withdraw.model'; // Import Withdrawal model
import { AccountTransactions } from 'src/app/model/account.transactions.model';
@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  paymentTransfer(transferRequest: TransferRequest): Observable<string> {
    return this.http.post(environment.rooturl + '/paymentTransfer', transferRequest, { observe: 'response', responseType: 'text' })
      .pipe(
        map((response: HttpResponse<string>) => {
          return response.body || 'Transfer completed successfully';
        })
      );
  }

  performWithdrawal(withdrawal: AccountTransactions): Observable<string> {
    return this.http.post(environment.rooturl + '/withdraw', withdrawal, { observe: 'response', responseType: 'text' })
      .pipe(
        map((response: HttpResponse<string>) => {
          return response.body || 'Withdrawal completed successfully';
        })
      );
  }

  performDeposit(deposit: AccountTransactions): Observable<string> {
    return this.http.post(environment.rooturl + '/deposit', deposit, { observe: 'response', responseType: 'text' })
      .pipe(
        map((response: HttpResponse<string>) => {
          return response.body || 'Deposit completed successfully';
        })
      );
  }
}

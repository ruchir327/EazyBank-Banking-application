// transfer-request.model.ts

import { Account } from './account.model';
import { AccountTransactions } from './account.transactions.model';

export class TransferRequest {
  senderAccount: Account;
  receiverAccount: Account;
  senderTransaction: AccountTransactions;

  constructor(senderAccount: Account, receiverAccount: Account, senderTransaction: AccountTransactions) {
    this.senderAccount = senderAccount;
    this.receiverAccount = receiverAccount;
    this.senderTransaction = senderTransaction;
  }
}

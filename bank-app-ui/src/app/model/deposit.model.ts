// deposit.model.ts
export class Deposit {
    constructor(
      public accountNumber: number,
      public accountType: string,
      public transactionAmt: number,
      public transactionSummary: string
    ) {}
  }
  
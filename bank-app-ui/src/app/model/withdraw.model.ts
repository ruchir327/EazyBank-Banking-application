// withdraw.model.ts
export class Withdrawal {
    constructor(
        public accountNumber: number,
        public accountType: string,
        public transactionAmt: number,
        public transactionSummary: string
    ) { }
}

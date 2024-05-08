export class Account {

  public customerId: number;
  public accountNumber: number;
  public accountType: string;
  public branchAddress: string;
  public mobileNumber: string;
  public balance: number; // Added balance property

  constructor(customerId?: number, accountNumber?: number,accountType?: string, branchAddress?: string, mobileNumber?: string, balance?: number){
        this.customerId = customerId || 0;
        this.accountNumber = accountNumber || 0;
        this.accountType = accountType || '';
        this.branchAddress = branchAddress || '';
        this.mobileNumber = mobileNumber || '';
        this.balance = balance || 0; // Initialize balance with 0 if not provided
  }

}

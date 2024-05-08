export class LoanApplication {
    accountNumber: number;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    loanType: string;
    totalLoan: number;
    status: string;
  
    constructor(
      accountNumber?: number,
      firstName?: string,
      lastName?: string,
      dateOfBirth?: Date,
      address?: string,
      city?: string,
      state?: string,
      postalCode?: string,
      loanType?: string,
      totalLoan?: number,
      status?: string
    ) {
      this.accountNumber = accountNumber || 0;
      this.firstName = firstName || '';
      this.lastName = lastName || '';
      this.dateOfBirth = dateOfBirth || new Date();
      this.address = address || '';
      this.city = city || '';
      this.state = state || '';
      this.postalCode = postalCode || '';
      this.loanType = loanType || '';
      this.totalLoan = totalLoan || 0;
      this.status = status || '';
    }
  }
  
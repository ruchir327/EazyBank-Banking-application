import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { CreateAccountService } from '../../services/create-account/create-account.service';
import { TransactionService } from '../../services/transaction/transaction.service';
import { AccountTransactions } from '../../model/account.transactions.model';
import { Account } from '../../model/account.model';
import { Router } from '@angular/router';
import { TransferRequest } from 'src/app/model/transfer-request.model';


@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {

  user = new User();
  transactions = new Array();
  balance: number = 0; // Initialize balance to 0

  transaction = new AccountTransactions();
  sendersAccount = new Account(1, 1865764534, '', '','', 0); // Initialize with default values including balance
  receiversAccount = new Account(3, 1865764533, '', '','', 0); // Initialize with default values including balance
  withdrawal = new AccountTransactions(); // Initialize withdrawal transaction
  deposit = new AccountTransactions(); // Initialize deposit transaction
  activeTab: string = ''; // Default active tab
  account: any = { customerId: '' }; // Initialize account object with customerId property
  errorMessage: string | null = null; // Define the errorMessage property
  successMessage: string | null = null; // Define the successMessage property
  constructor(private dashboardService: DashboardService, private createAccountService: CreateAccountService, private transactionService: TransactionService, private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('userdetails') || "");
    if (this.user) {
      this.createAccountService.getAccount(this.user.email).subscribe(
        (account) => {
          // Once account details are fetched, extract the balance
          this.balance = account.balance;
        },
        (error) => {
          console.error('Error fetching account details:', error);
          // Handle error if needed
        }

      );
      this.dashboardService.getAccountTransactions(this.user.email).subscribe(
        responseData => {
          this.transactions = <any>responseData.body;
        },
        error => {
          console.error('Error fetching transactions:', error);
          // Handle error if needed
        }
      )
    }
  }


toggleTab(tab: string): void {
  if(this.activeTab === tab) {
  // If the clicked tab is already active, collapse it
  this.activeTab = '';
} else {
  // Otherwise, expand the clicked tab
  this.activeTab = tab;
}
}

onSubmit(): void {
  // Create a transfer request object
  const transferRequest = new TransferRequest(this.sendersAccount, this.receiversAccount, this.transaction);

  // Make a request to perform the transaction
  this.transactionService.paymentTransfer(transferRequest)
    .subscribe(
      (response) => {
        console.log('Transaction successful:', response);
        if (typeof response === 'string') {
          this.successMessage = response; // Set success message directly
          // Redirect to the dashboard route
          this.router.navigate(['/dashboard']);
        } else {
          // Handle unexpected response format
          console.error('Unexpected response format:', response);
          this.errorMessage = 'Unexpected response format';
          this.successMessage = null;
        }
      },
      (error) => {
        console.error('Error performing transaction:', error);
        this.errorMessage = 'Error performing transaction';
        this.successMessage = null;
      }
    );

}

onWithdrawalSubmit(): void {
  // Make a request to perform the withdrawal transaction
  this.transactionService.performWithdrawal(this.withdrawal)
    .subscribe(
      (response) => {
        console.log('Withdrawal successful:', response);
        if (typeof response === 'string') {
          this.successMessage = response; // Set success message directly
          // Redirect to the dashboard route
          this.router.navigate(['/dashboard']);
        } else {
          // Handle unexpected response format
          console.error('Unexpected response format:', response);
          this.errorMessage = 'Unexpected response format';
          this.successMessage = null;
        }
      },
      (error) => {
        console.error('Error performing withdrawal:', error);
        this.errorMessage = 'Error performing withdrawal';
        this.successMessage = null;
      }
    );
}

onDepositSubmit(): void {
  // Make a request to perform the deposit transaction
  this.transactionService.performDeposit(this.deposit)
    .subscribe(
      (response) => {
        console.log('Deposit successful:', response);
        if (typeof response === 'string') {
          this.successMessage = response; // Set success message directly
          // Redirect to the dashboard route
          this.router.navigate(['/dashboard']);
        } else {
          // Handle unexpected response format
          console.error('Unexpected response format:', response);
          this.errorMessage = 'Unexpected response format';
          this.successMessage = null;
        }
      },
      (error) => {
        console.error('Error performing deposit:', error);
        this.errorMessage = 'Error performing deposit';
        this.successMessage = null;
      }
    );
}
}

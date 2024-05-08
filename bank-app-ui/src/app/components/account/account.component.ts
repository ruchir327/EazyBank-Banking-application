import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { User } from 'src/app/model/user.model';
import { Account } from 'src/app/model/account.model';
import { CreateAccountService } from 'src/app/services/create-account/create-account.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user = new User();
  account = new Account();
  activeTab: string = ''; // Default active tab
  createaccount = new Account(0, 0, '', ''); // Initialize with default values
  updatedAccount = new Account(); // New object for updating account

  errorMessage: string | null = null; // Define errorMessage property
  successMessage: string | null = null; // Define successMessage property

  constructor(
    private dashboardService: DashboardService,
    private createAccountService: CreateAccountService,
   
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('userdetails')!);
    if (this.user) {
      this.dashboardService.getAccountDetails(this.user.email).subscribe(
        responseData => {
          this.account = <any>responseData.body;
          this.updatedAccount = Object.assign({}, this.account);
        });
    }
  }

  toggleTab(tab: string): void {
    if (this.activeTab === tab) {
      // If the clicked tab is already active, collapse it
      this.activeTab = '';
    } else {
      // Otherwise, expand the clicked tab
      this.activeTab = tab;
    }
  }

  onSubmit(): void {
    this.createAccountService.createAccount(this.user.email, this.account)
      .subscribe(response => {
        console.log('Account created successfully:', response);
        this.successMessage = 'Account created successfully'; // Set success message
        this.errorMessage = null; // Clear error message
      }, error => {
        console.error('Error creating account:', error);
        this.errorMessage = 'Error creating account'; // Set error message
        this.successMessage = null; // Clear success message
      });
  }

  updateAccount(): void {
    console.log('Updated Account:', this.updateAccount); // Log updated account object
    this.createAccountService.updateAccount(this.user.email, this.updatedAccount) // Send updateAccount
      .subscribe(response => {
        console.log('Account updated successfully:', response);
        this.successMessage = 'Account updated successfully'; // Set success message
        this.errorMessage = null; // Clear error message
      }, error => {
        console.error('Error updating account:', error);
        this.errorMessage = 'Error updating account'; // Set error message
        this.successMessage = null; // Clear success message
      });
  }

  deleteAccount(): void {
    this.createAccountService.deleteAccount(this.user.email, this.account.accountNumber)
      .subscribe(response => {
        console.log('Account deleted successfully:', response);
        this.successMessage = 'Account deleted successfully'; // Set success message
        this.errorMessage = null; // Clear error message
      }, error => {
        console.error('Error deleting account:', error);
        this.errorMessage = 'Error deleting account'; // Set error message
        this.successMessage = null; // Clear success message
      });
  }
}

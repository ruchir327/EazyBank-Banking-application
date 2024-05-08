import { Component, OnInit } from '@angular/core';
import { Loans } from 'src/app/model/loans.model';
import { User } from 'src/app/model/user.model';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { LoanApplication } from 'src/app/model/loanapplication.model';
import { LoanService } from 'src/app/services/loans/loan.service';
@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnInit {
  activeTab: string = ''; // Default active tab
  loanApplication = new LoanApplication(0, ''); // Initialize with default values or appropriate values
  user = new User();
  loans = new Array();
  currOutstandingBalance: number = 0;
  errorMessage: string | null = null; // Define errorMessage property
  successMessage: string | null = null; // Define successMessage property
  constructor(private dashboardService: DashboardService,private loanService:LoanService) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('userdetails') || "");
    if(this.user){
      this.dashboardService.getLoansDetails(this.user.email).subscribe(
        responseData => {
        this.loans = <any> responseData.body;
        this.loans.forEach(function (this: LoansComponent, loan: Loans) {
          this.currOutstandingBalance = this.currOutstandingBalance+loan.outstandingAmount;
        }.bind(this)); 
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
    this.loanService.applyForLoan(this.user.email, this.loanApplication)
      .subscribe(response => {
        console.log('Loan application submitted successfully:', response);
        this.successMessage = 'Loan application submitted successfully'; // Set success message
        this.errorMessage = null; // Clear error message
      }, error => {
        console.error('Error submitting loan application:', error);
        this.errorMessage = 'Error submitting loan application'; // Set error message
        this.successMessage = null; // Clear success message
      });
  }

}

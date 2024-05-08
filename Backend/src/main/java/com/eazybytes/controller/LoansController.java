package com.eazybytes.controller;

import com.eazybytes.model.*;
import com.eazybytes.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class LoansController {

    @Autowired
    private LoanRepository loanRepository;
    @Autowired
    private AccountsRepository accountsRepository;

    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private LoanApplicationRepository loanApplicationRepository;
    @Autowired
    private NotificationsRepository notificationsRepository;

    @GetMapping("/myLoans")
    public List<Loans> getLoanDetails(@RequestParam String email) {
        List<Customer> customers = customerRepository.findByEmail(email);
        if (customers != null && !customers.isEmpty()) {
            List<Loans> loans = loanRepository.findByCustomerIdOrderByStartDtDesc(customers.get(0).getId());
            if (loans != null ) {
                return loans;
            }
        }
        return null;
    }
    @PostMapping("/applyForLoan")
    public String applyForLoan(@RequestBody LoanApplication loanApplication) {
        // Validate input fields
        if (loanApplication.getAccountNumber()==0) {
            return "Account number is required";
        }

        // Check if account exists
        Accounts optionalAccount = accountsRepository.findByAccountNumber(loanApplication.getAccountNumber());
        if (optionalAccount==null) {
            return "Account not found";
        }

        // Save loan application details
        loanApplication.setStatus("Pending"); // Initially pending
        loanApplicationRepository.save(loanApplication);

        // Fetch admin user (assuming admin role is predefined)
        // This can be done by querying the customer table with the role as admin
        // Here, assuming findAdminUser method in CustomerRepository
        // Replace it with your actual method to fetch admin user
        Customer admin = customerRepository.findByRole("ADMIN");

        // Create notification for admin
        Notifications notification = new Notifications();
        notification.setAdminId(admin.getId());
        notification.setApplicationType("Loan Application");
        notification.setLoanApplication(loanApplication); // Assuming one-to-one relation with loan application
        notificationsRepository.save(notification);

        return "Loan application submitted successfully";
    }

}

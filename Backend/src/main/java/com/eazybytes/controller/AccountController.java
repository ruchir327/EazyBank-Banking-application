package com.eazybytes.controller;

import com.eazybytes.model.Accounts;
import com.eazybytes.model.Customer;
import com.eazybytes.repository.AccountsRepository;
import com.eazybytes.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AccountController {

    @Autowired
    private AccountsRepository accountsRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @GetMapping("/myAccount")
    public Accounts getAccountDetails(@RequestParam String email) {
        List<Customer> customers = customerRepository.findByEmail(email);
        if (customers != null && !customers.isEmpty()) {
            Accounts accounts = accountsRepository.findByCustomerId(customers.get(0).getId());
            if (accounts != null) {
                return accounts;
            }
        }
        return null;
    }
    // Create Account
    @PostMapping("/accounts/create")
    public ResponseEntity<?> createAccount(@RequestParam String email, @RequestBody Accounts account) {
        List<Customer> customers = customerRepository.findByEmail(email);
        if (customers != null && !customers.isEmpty()) {
            Accounts existingAccount = accountsRepository.findByCustomerId(customers.get(0).getId());
            if (existingAccount != null) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Account already exists");
            } else {
                account.setCustomerId(customers.get(0).getId());
                account.setMobileNumber(customers.get(0).getMobileNumber());
                account.setBalance(0);
                return ResponseEntity.ok(accountsRepository.save(account));
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Customer not found");
        }
    }

    // Update Account
    @PutMapping("/update")
    public ResponseEntity<?> updateAccount(@RequestParam String email, @RequestBody Accounts account) {
        List<Customer> customers = customerRepository.findByEmail(email);
        if (customers != null && !customers.isEmpty()) {
            Accounts existingAccount = accountsRepository.findByCustomerId(customers.get(0).getId());
            if (existingAccount != null) {
                // Set the customer ID for the updated account
                existingAccount.setAccountNumber(existingAccount.getAccountNumber());
                existingAccount.setAccountType(account.getAccountType());
                existingAccount.setBranchAddress(account.getBranchAddress());
                existingAccount.setMobileNumber(account.getMobileNumber());

                return ResponseEntity.ok(accountsRepository.save(existingAccount));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Account not found");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Customer not found");
        }
    }


    // Delete Account
    @DeleteMapping("/delete/{accountNumber}")
    public ResponseEntity<?> deleteAccount(@RequestParam String email, @PathVariable long accountNumber) {
        List<Customer> customers = customerRepository.findByEmail(email);
        if (customers != null && !customers.isEmpty()) {
            Accounts existingAccount = accountsRepository.findByCustomerId(customers.get(0).getId());
            if (existingAccount != null && existingAccount.getAccountNumber() == accountNumber) {
                accountsRepository.deleteById(accountNumber);
                return ResponseEntity.ok("Account deleted successfully");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Account not found");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Customer not found");
        }
    }
}

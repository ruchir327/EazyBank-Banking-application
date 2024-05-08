package com.eazybytes.controller;

import com.eazybytes.model.AccountTransactions;
import com.eazybytes.model.Accounts;
import com.eazybytes.model.TransferRequest;
import com.eazybytes.repository.AccountTransactionsRepository;
import com.eazybytes.repository.AccountsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
public class TransactionController {

    @Autowired
    private AccountsRepository accountsRepository;

    @Autowired
    private AccountTransactionsRepository accountTransactionsRepository;

    @PostMapping("/paymentTransfer")
    public ResponseEntity<String> paymentTransfer(@RequestBody TransferRequest transferRequest) {
        Accounts senderAccount = transferRequest.getSenderAccount();
        Accounts receiverAccount = transferRequest.getReceiverAccount();
        AccountTransactions senderTransaction = transferRequest.getSenderTransaction();

        // Fetch sender's and receiver's accounts from the database
        Accounts fetchedSenderAccount = accountsRepository.findByAccountNumber(senderAccount.getAccountNumber());
        Accounts fetchedReceiverAccount = accountsRepository.findByAccountNumber(receiverAccount.getAccountNumber());

        // Validate sender's balance
        if (fetchedSenderAccount == null || senderTransaction.getTransactionAmt() > fetchedSenderAccount.getBalance()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Insufficient balance for transfer");
        }

        if (fetchedReceiverAccount == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Receiver account not found");
        }

        // Update sender's balance
        long senderNewBalance = fetchedSenderAccount.getBalance() - senderTransaction.getTransactionAmt();
        fetchedSenderAccount.setBalance(senderNewBalance);
        accountsRepository.save(fetchedSenderAccount);

        // Update receiver's balance
        long receiverNewBalance = fetchedReceiverAccount.getBalance() + senderTransaction.getTransactionAmt();
        fetchedReceiverAccount.setBalance(receiverNewBalance);
        accountsRepository.save(fetchedReceiverAccount);

        // Prepare transaction record for receiver
        AccountTransactions receiverTransaction = new AccountTransactions();
        receiverTransaction.setAccountNumber(fetchedReceiverAccount.getAccountNumber());
        receiverTransaction.setCustomerId(fetchedReceiverAccount.getCustomerId());
        receiverTransaction.setTransactionDt(new java.sql.Date(System.currentTimeMillis()));
        receiverTransaction.setTransactionSummary(senderTransaction.getTransactionSummary());
        receiverTransaction.setTransactionType("Transfer");
        receiverTransaction.setTransactionAmt(senderTransaction.getTransactionAmt());
        receiverTransaction.setClosingBalance(receiverNewBalance);
        receiverTransaction.setTransactionId(UUID.randomUUID().toString());

        // Save transaction details
        AccountTransactions savedTransaction = accountTransactionsRepository.save(receiverTransaction);
        String message = "Transfer completed successfully";
        return ResponseEntity.ok(message);
    }

    @PostMapping("/withdraw")
    public ResponseEntity<String> withdraw(@RequestBody AccountTransactions transaction) {
        // Fetch the account from the database
        Accounts account = accountsRepository.findByAccountNumber(transaction.getAccountNumber());

        // Check if the account exists
        if (account == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Account not found");
        }

        // Check if the withdrawal amount is greater than the account balance
        if (transaction.getTransactionAmt() > account.getBalance()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Insufficient balance for withdrawal");
        }

        // Update the account balance
        long newBalance = account.getBalance() - transaction.getTransactionAmt();
        account.setBalance(newBalance);
        accountsRepository.save(account);

        // Prepare transaction record for withdrawal
        AccountTransactions withdrawalTransaction = new AccountTransactions();
        withdrawalTransaction.setAccountNumber(account.getAccountNumber());
        withdrawalTransaction.setCustomerId(account.getCustomerId());
        withdrawalTransaction.setTransactionDt(new java.sql.Date(System.currentTimeMillis()));
        withdrawalTransaction.setTransactionSummary(transaction.getTransactionSummary()); // You can set a summary for the withdrawal transaction
        withdrawalTransaction.setTransactionType("Withdrawal");
        withdrawalTransaction.setTransactionAmt(transaction.getTransactionAmt()); // Set the withdrawal amount
        withdrawalTransaction.setClosingBalance(newBalance);
        withdrawalTransaction.setTransactionId(UUID.randomUUID().toString());

        // Save transaction details
        accountTransactionsRepository.save(withdrawalTransaction);

        return ResponseEntity.ok("Withdrawal completed successfully");
    }

    @PostMapping("/deposit")
    public ResponseEntity<String> deposit(@RequestBody AccountTransactions transaction) {
        // Fetch the account from the database
        Accounts account = accountsRepository.findByAccountNumber(transaction.getAccountNumber());

        // Check if the account exists
        if (account == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Account not found");
        }

        // Update the account balance
        long newBalance = account.getBalance() + transaction.getTransactionAmt();
        account.setBalance(newBalance);
        accountsRepository.save(account);

        // Prepare transaction record for deposit
        AccountTransactions depositTransaction = new AccountTransactions();
        depositTransaction.setAccountNumber(account.getAccountNumber());
        depositTransaction.setCustomerId(account.getCustomerId());
        depositTransaction.setTransactionDt(new java.sql.Date(System.currentTimeMillis()));
        depositTransaction.setTransactionSummary(transaction.getTransactionSummary()); // You can set a summary for the deposit transaction
        depositTransaction.setTransactionType("Deposit");
        depositTransaction.setTransactionAmt(transaction.getTransactionAmt()); // Set the deposit amount
        depositTransaction.setClosingBalance(newBalance);
        depositTransaction.setTransactionId(UUID.randomUUID().toString());

        // Save transaction details
        accountTransactionsRepository.save(depositTransaction);

        return ResponseEntity.ok("Deposit completed successfully");
    }


}
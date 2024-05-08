package com.eazybytes.model;

public class TransferRequest {
    private Accounts senderAccount;
    private Accounts receiverAccount;
    private AccountTransactions senderTransaction;

    public Accounts getSenderAccount() {
        return senderAccount;
    }

    public void setSenderAccount(Accounts senderAccount) {
        this.senderAccount = senderAccount;
    }

    public Accounts getReceiverAccount() {
        return receiverAccount;
    }

    public void setReceiverAccount(Accounts receiverAccount) {
        this.receiverAccount = receiverAccount;
    }

    public AccountTransactions getSenderTransaction() {
        return senderTransaction;
    }

    public void setSenderTransaction(AccountTransactions senderTransaction) {
        this.senderTransaction = senderTransaction;
    }
}

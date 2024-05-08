package com.eazybytes.model;


import jakarta.persistence.*;


@Entity
@Table(name = "notifications")
public class Notifications {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "admin_id")
    private int adminId;

    @Column(name = "application_type")
    private String applicationType;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "loan_application_id")
    private LoanApplication loanApplication;

    // Constructors, getters, and setters
    public Notifications() {
    }

    public Notifications(int adminId, String applicationType, LoanApplication loanApplication) {
        this.adminId = adminId;
        this.applicationType = applicationType;
        this.loanApplication = loanApplication;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getAdminId() {
        return adminId;
    }

    public void setAdminId(int adminId) {
        this.adminId = adminId;
    }

    public String getApplicationType() {
        return applicationType;
    }

    public void setApplicationType(String applicationType) {
        this.applicationType = applicationType;
    }

    public LoanApplication getLoanApplication() {
        return loanApplication;
    }

    public void setLoanApplication(LoanApplication loanApplication) {
        this.loanApplication = loanApplication;
    }
}

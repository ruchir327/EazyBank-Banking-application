package com.eazybytes.repository;

import com.eazybytes.model.LoanApplication;
import org.springframework.data.repository.CrudRepository;

public interface LoanApplicationRepository extends CrudRepository<LoanApplication,Long> {
}

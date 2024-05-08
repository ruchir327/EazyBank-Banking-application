package com.eazybytes.repository;

import com.eazybytes.model.Customer;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends CrudRepository<Customer, Long> {

    List<Customer> findByEmail(String email);
    @Query("SELECT c FROM Customer c WHERE c.role = :role")
    Customer findByRole(String role);
}

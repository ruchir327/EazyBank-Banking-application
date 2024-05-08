package com.eazybytes.repository;

import com.eazybytes.model.Notifications;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationsRepository extends CrudRepository<Notifications, Long> {
    // Custom query methods can be added here if needed
}

package org.inventrfid.backend.repository;

import org.inventrfid.backend.entity.Release;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReleaseRepository extends JpaRepository<Release, Long> {

    Release findByTransactionId(Long transactionId);
}


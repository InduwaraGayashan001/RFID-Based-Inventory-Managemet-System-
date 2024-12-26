package org.inventrfid.backend.repository;

import org.inventrfid.backend.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockRepository extends JpaRepository<Stock, String> {
    // Custom query methods can be added here if needed

    // You can use the findByRfid method to get the Stock by RFID
    Stock findByRfid(String rfid);
}


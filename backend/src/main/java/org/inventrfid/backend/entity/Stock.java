package org.inventrfid.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Entity
public class Stock {

    @Id
    private String rfid;

    @ManyToOne
    @JoinColumn(name ="ProductID", nullable = true)
    private Product product;

    @Column(name = "Timestamp", nullable = true)
    private java.util.Date timestamp;

    @Column(name = "Quantity", nullable = true)
    private int Quantity;

    @Column(name = "stockPrice", nullable = true)
    private java.math.BigDecimal stockPrice;

    public void setRfid(String rfid) {
        this.rfid = rfid;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public void setQuantity(int quantity) {
        Quantity = quantity;
    }

    public void setStockPrice(BigDecimal stockPrice) {
        this.stockPrice = stockPrice;
    }
}

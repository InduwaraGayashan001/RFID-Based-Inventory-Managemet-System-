package org.inventrfid.backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
@Entity
@Table(name = "Releases")
public class Release {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transactionId;
    @ManyToOne
    @JoinColumn(name = "stockId", nullable = false)
    private Stock stock;
    @Column(name = "Timestamp", nullable = true)
    private java.util.Date timestamp;
    @Column(name = "releaseQuantity", nullable = true)
    private int releaseQuantity;
    @Column(name = "releasePrice", nullable = true)
    private java.math.BigDecimal releasePrice;
    // Getters and Setters
    public Long getTransactionId() {
        return transactionId;
    }
    public void setTransactionId(Long transactionId) {
        this.transactionId = transactionId;
    }
    public Stock getStock() {
        return stock;
    }
    public void setStock(Stock stock) {
        this.stock = stock;
    }
    public Date getTimestamp() {
        return timestamp;
    }
    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }
    public int getReleaseQuantity() {
        return releaseQuantity;
    }
    public void setReleaseQuantity(int releaseQuantity) {
        this.releaseQuantity = releaseQuantity;
    }
    public BigDecimal getReleasePrice() {
        return releasePrice;
    }
    public void setReleasePrice(BigDecimal releasePrice) {
        this.releasePrice = releasePrice;
    }
}
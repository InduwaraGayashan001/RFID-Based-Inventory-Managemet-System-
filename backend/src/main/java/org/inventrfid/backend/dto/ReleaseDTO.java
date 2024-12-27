package org.inventrfid.backend.dto;

import java.math.BigDecimal;
import java.util.Date;
public class ReleaseDTO {
    private Long transactionId;
    private String rfid;
    private int releaseQuantity;
    private BigDecimal releasePrice;
    private Date timestamp;
    // Getters and Setters
    public Long getTransactionId() {
        return transactionId;
    }
    public void setTransactionId(Long transactionId) {
        this.transactionId = transactionId;
    }
    public String getRfid() {
        return rfid;
    }
    public void setRfid(String rfid) {
        this.rfid = rfid;
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
    public Date getTimestamp() {
        return timestamp;
    }
    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }
}
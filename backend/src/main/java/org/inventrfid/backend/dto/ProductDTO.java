package org.inventrfid.backend.dto;

// ProductDTO
public class ProductDTO {

    private int pid;
    private String productName;

    public int getPid() {
        return pid;
    }

    public void setPid(int pid) {
        this.pid = pid;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }
}

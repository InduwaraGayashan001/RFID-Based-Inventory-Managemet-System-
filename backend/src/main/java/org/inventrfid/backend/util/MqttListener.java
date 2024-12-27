package org.inventrfid.backend.util;

import org.springframework.integration.annotation.ServiceActivator;
import org.springframework.stereotype.Service;
import org.inventrfid.backend.service.StockService;
import org.inventrfid.backend.service.ReleaseService;

@Service
public class MqttListener {

    private final StockService stockService;
    private final ReleaseService releaseService;

    public MqttListener(StockService stockService, ReleaseService releaseService) {
        this.stockService = stockService;
        this.releaseService = releaseService;
    }

    @ServiceActivator(inputChannel = "mqttInputChannel")
    public void handleMessage(String message) {

        if (message.startsWith("rfid")) {
            System.out.println("Message received: " + message);
            try {
                if (stockService.doesStockExist(message)) {
                    // Create a new Release entry
                    releaseService.createRelease(message);
                    System.out.println("New Release created for RFID: " + message);
                } else {
                    // Create a new RFID entry
                    stockService.createStockFromMqtt(message);
                    System.out.println("New Stock created with RFID: " + message);
                }
            } catch (RuntimeException e) {
                System.err.println("Error processing message: " + e.getMessage());
            }
        } else {
            System.out.println("Unknown message received: " + message);
        }
    }

}



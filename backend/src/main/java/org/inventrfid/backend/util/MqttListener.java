package org.inventrfid.backend.util;

import org.springframework.integration.annotation.ServiceActivator;
import org.springframework.stereotype.Service;

import org.inventrfid.backend.service.StockService;

@Service
public class MqttListener {

    private final StockService stockService;

    public MqttListener(StockService stockService) {
        this.stockService = stockService;
    }

    @ServiceActivator(inputChannel = "mqttInputChannel")
    public void handleMessage(String message) {

        if (message.startsWith("rfid")) {
            System.out.println("Message received: " + message);
            try {
                // Create a new RFID entry
                stockService.createStockFromMqtt(message);
                System.out.println("New Stock created with RFID: " + message);
            } catch (RuntimeException e) {
                System.err.println("Error creating Stock: " + e.getMessage());
            }
        }else{
            System.out.println("Unknown message received: " + message);
        }


    }
}


package com.example.trainbooking_mobileapp.TrainManagement;

public class Train {
    private String TrainID;
    private String trainName;
    private String departureTime;
    private String arrivalTime;
    private String departureStation;
    private String arrivalStation;
    private String firstClassTicketPrice;
    private String secondClassTicketPrice;
    private String thirdClassTicketPrice;
    private String status;

    // Constructor to initialize Train object
    public Train(String TrainID, String trainName, String departureTime, String arrivalTime, String departureStation, String arrivalStation, String firstClassTicketPrice, String secondClassTicketPrice, String thirdClassTicketPrice, String status) {
        this.TrainID = TrainID;
        this.trainName = trainName;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.departureStation = departureStation;
        this.arrivalStation = arrivalStation;
        this.firstClassTicketPrice = firstClassTicketPrice;
        this.secondClassTicketPrice = secondClassTicketPrice;
        this.thirdClassTicketPrice = thirdClassTicketPrice;
        this.status = status;
    }

    // Getter for TrainID
    public String getTrainID() {
        return TrainID;
    }

    // Getter for trainName
    public String getTrainName() {
        return trainName;
    }

    // Getter for departureTime
    public String getDepartureTime() {
        return departureTime;
    }

    // Getter for arrivalTime
    public String getArrivalTime() {
        return arrivalTime;
    }

    // Getter for departureStation
    public String getDepartureStation() {
        return departureStation;
    }

    // Getter for arrivalStation
    public String getArrivalStation() {
        return arrivalStation;
    }

    // Getter for firstClassTicketPrice
    public String getFirstClassTicketPrice() {
        return firstClassTicketPrice;
    }

    // Getter for secondClassTicketPrice
    public String getSecondClassTicketPrice() {
        return secondClassTicketPrice;
    }

    // Getter for thirdClassTicketPrice
    public String getThirdClassTicketPrice() {
        return thirdClassTicketPrice;
    }

    // Getter for status
    public String getStatus() {
        return status;
    }
}
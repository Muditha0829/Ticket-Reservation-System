package com.example.trainbooking_mobileapp.trainmanagement;

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

    public String getTrainID() {
        return TrainID;
    }

    public String getTrainName() {
        return trainName;
    }

    public String getDepartureTime() {
        return departureTime;
    }

    public String getArrivalTime() {
        return arrivalTime;
    }

    public String getDepartureStation() {
        return departureStation;
    }

    public String getArrivalStation() {
        return arrivalStation;
    }

    public String getFirstClassTicketPrice() {
        return firstClassTicketPrice;
    }

    public String getSecondClassTicketPrice() {
        return secondClassTicketPrice;
    }

    public String getThirdClassTicketPrice() {
        return thirdClassTicketPrice;
    }

    public String getStatus() {
        return status;
    }
}
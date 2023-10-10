package com.example.trainbooking_mobileapp.trainbookingmanagement;

import java.io.Serializable;

public class TrainBooking implements Serializable {
    private String BookingID;
    private String TrainNumber;
    private String TrainName;
    private String userId;
    private String BookingDate;
    private String ReservationDate;
    private int TotalPassengers;
    private String MainPassengerName;
    private String ContactNumber;
    private String DepartureStation;
    private String DestinationStation;
    private String Email;
    private String NIC;
    private String TicketClass;
    private String TotalPrice;

    public TrainBooking(String bookingID, String trainNumber, String trainName, String userID, String bookingDate,
                        String reservationDate, int totalPassengers, String mainPassengerName, String contactNumber,
                        String departureStation, String destinationStation, String email, String nic,
                        String ticketClass, String totalPrice) {
        BookingID = bookingID;
        TrainNumber = trainNumber;
        TrainName = trainName;
        userId = userID;
        BookingDate = bookingDate;
        ReservationDate = reservationDate;
        TotalPassengers = totalPassengers;
        MainPassengerName = mainPassengerName;
        ContactNumber = contactNumber;
        DepartureStation = departureStation;
        DestinationStation = destinationStation;
        Email = email;
        NIC = nic;
        TicketClass = ticketClass;
        TotalPrice = totalPrice;
    }

    public String getBookingID() {
        return BookingID;
    }

    public void setBookingID(String bookingID) {
        BookingID = bookingID;
    }

    public String getTrainNumber() {
        return TrainNumber;
    }

    public void setTrainNumber(String trainNumber) {
        TrainNumber = trainNumber;
    }

    public String getTrainName() {
        return TrainName;
    }

    public void setTrainName(String trainName) {
        TrainName = trainName;
    }

    public String getUserID() {
        return userId;
    }

    public void setUserID(String userID) {
        userId = userId;
    }

    public String getBookingDate() {
        return BookingDate;
    }

    public void setBookingDate(String bookingDate) {
        BookingDate = bookingDate;
    }

    public String getReservationDate() {
        return ReservationDate;
    }

    public void setReservationDate(String reservationDate) {
        ReservationDate = reservationDate;
    }

    public int getTotalPassengers() {
        return TotalPassengers;
    }

    public void setTotalPassengers(int totalPassengers) {
        TotalPassengers = totalPassengers;
    }

    public String getMainPassengerName() {
        return MainPassengerName;
    }

    public void setMainPassengerName(String mainPassengerName) {
        MainPassengerName = mainPassengerName;
    }

    public String getContactNumber() {
        return ContactNumber;
    }

    public void setContactNumber(String contactNumber) {
        ContactNumber = contactNumber;
    }

    public String getDepartureStation() {
        return DepartureStation;
    }

    public void setDepartureStation(String departureStation) {
        DepartureStation = departureStation;
    }

    public String getDestinationStation() {
        return DestinationStation;
    }

    public void setDestinationStation(String destinationStation) {
        DestinationStation = destinationStation;
    }

    public String getEmail() {
        return Email;
    }

    public void setEmail(String email) {
        Email = email;
    }

    public String getNIC() {
        return NIC;
    }

    public void setNIC(String NIC) {
        this.NIC = NIC;
    }

    public String getTicketClass() {
        return TicketClass;
    }

    public void setTicketClass(String ticketClass) {
        TicketClass = ticketClass;
    }

    public String getTotalPrice() {
        return TotalPrice;
    }

    public void setTotalPrice(String totalPrice) {
        TotalPrice = totalPrice;
    }
}
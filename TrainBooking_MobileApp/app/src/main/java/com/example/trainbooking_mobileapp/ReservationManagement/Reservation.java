package com.example.trainbooking_mobileapp.ReservationManagement;

import java.io.Serializable;

public class Reservation implements Serializable {
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

    public Reservation(String bookingID, String trainNumber, String trainName, String userID, String bookingDate,
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
        TotalPrice = "Manual";
    }

    /*
     * Get the booking ID.
     */
    public String getBookingID() {
        return BookingID;
    }

    /*
     * Set the booking ID.
     */
    public void setBookingID(String bookingID) {
        BookingID = bookingID;
    }

    /*
     * Get the train number.
     */
    public String getTrainNumber() {
        return TrainNumber;
    }

    /*
     * Set the train number.
     */
    public void setTrainNumber(String trainNumber) {
        TrainNumber = trainNumber;
    }

    /*
     * Get the train name.
     */
    public String getTrainName() {
        return TrainName;
    }

    /*
     * Set the train name.
     */
    public void setTrainName(String trainName) {
        TrainName = trainName;
    }

    /*
     * Get the user ID.
     */
    public String getUserID() {
        return userId;
    }

    /*
     * Set the user ID.
     */
    public void setUserID(String userID) {
        userId = userId;
    }

    /*
     * Get the booking date.
     */
    public String getBookingDate() {
        return BookingDate;
    }

    /*
     * Set the booking date.
     */
    public void setBookingDate(String bookingDate) {
        BookingDate = bookingDate;
    }

    /*
     * Get the reservation date.
     */
    public String getReservationDate() {
        return ReservationDate;
    }

    /*
     * Set the reservation date.
     */
    public void setReservationDate(String reservationDate) {
        ReservationDate = reservationDate;
    }

    /*
     * Get the total number of passengers.
     */
    public int getTotalPassengers() {
        return TotalPassengers;
    }

    /*
     * Set the total number of passengers.
     */
    public void setTotalPassengers(int totalPassengers) {
        TotalPassengers = totalPassengers;
    }

    /*
     * Get the main passenger's name.
     */
    public String getMainPassengerName() {
        return MainPassengerName;
    }

    /*
     * Set the main passenger's name.
     */
    public void setMainPassengerName(String mainPassengerName) {
        MainPassengerName = mainPassengerName;
    }

    /*
     * Get the contact number.
     */
    public String getContactNumber() {
        return ContactNumber;
    }

    /*
     * Set the contact number.
     */
    public void setContactNumber(String contactNumber) {
        ContactNumber = contactNumber;
    }

    /*
     * Get the departure station.
     */
    public String getDepartureStation() {
        return DepartureStation;
    }

    /*
     * Set the departure station.
     */
    public void setDepartureStation(String departureStation) {
        DepartureStation = departureStation;
    }

    /*
     * Get the destination station.
     */
    public String getDestinationStation() {
        return DestinationStation;
    }

    /*
     * Set the destination station.
     */
    public void setDestinationStation(String destinationStation) {
        DestinationStation = destinationStation;
    }

    /*
     * Get the email address.
     */
    public String getEmail() {
        return Email;
    }

    /*
     * Set the email address.
     */
    public void setEmail(String email) {
        Email = email;
    }

    /*
     * Get the NIC (National Identification Card) number.
     */
    public String getNIC() {
        return NIC;
    }

    /*
     * Set the NIC (National Identification Card) number.
     */
    public void setNIC(String NIC) {
        this.NIC = NIC;
    }

    /*
     * Get the total price.
     */
    public String getTotalPrice() {
        return TotalPrice;
    }

    /*
     * Set the total price.
     */
    public void setTotalPrice(String totalPrice) {
        this.TotalPrice = totalPrice;
    }

    /*
     * Get the ticket class.
     */
    public String getTicketClass() {
        return TicketClass;
    }

    /*
     * Set the ticket class.
     */
    public void setTicketClass(String ticketClass) {
        TicketClass = ticketClass;
    }
}
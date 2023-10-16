/*
    Filename: TicketBooking.cs
    Description:
    This file contains the definition of the TicketBooking class, which represents ticket booking information in the application.
*/

using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Web_Service.Models.Ticket_Booking_Management
{
    public class TicketBooking
    {
        // Unique identifier for the booking
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string BookingID { get; set; }

        // Name of the train associated with the booking
        public string TrainName { get; set; }

        // ID of the user who made the booking
        public string UserID { get; set; }

        // Date when the booking was made
        public DateTime BookingDate { get; set; }

        // Date when the reservation is for
        public DateTime ReservationDate { get; set; }

        // Formatted string representation of booking date
        public string FormattedBookingDate
        {
            get
            {
                return BookingDate.ToString("dd/MM/yyyy");
            }
        }

        // Formatted string representation of reservation date
        public string FormattedReservationDate
        {
            get
            {
                return ReservationDate.ToString("dd/MM/yyyy");
            }
        }

        // Total number of passengers in the booking
        public int TotalPassengers { get; set; }

        // Name of the main passenger
        public string MainPassengerName { get; set; }

        // Contact number for the booking
        public string ContactNumber { get; set; }

        // Departure station for the journey
        public string DepartureStation { get; set; }

        // Destination station for the journey
        public string DestinationStation { get; set; }

        // Email address associated with the booking
        public string Email { get; set; }

        // National Identity Card number of the passenger
        public string NIC { get; set; }

        // Class of the ticket (e.g., first class, second class, etc.)
        public string TicketClass { get; set; }

        // Total price of the booking
        public String TotalPrice { get; set; }
    }
}
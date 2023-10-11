using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Web_Service.Models.Ticket_Booking_Management
{
    public class TicketBooking
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string BookingID { get; set; }

        public string TrainNumber { get; set; }

        public string TrainName { get; set; }

        public string UserID { get; set; }

        public DateTime BookingDate { get; set; }

        public DateTime ReservationDate { get; set; }

        public string FormattedBookingDate
        {
            get
            {
                return BookingDate.ToString("dd/MM/yyyy");
            }
        }

        public string FormattedReservationDate
        {
            get
            {
                return ReservationDate.ToString("dd/MM/yyyy");
            }
        }

        public int TotalPassengers { get; set; }

        public string MainPassengerName { get; set; }

        public string ContactNumber { get; set; }

        public string DepartureStation { get; set; }

        public string DestinationStation { get; set; }

        public string Email { get; set; }

        public string NIC { get; set; }

        public string TicketClass { get; set; }

        public String TotalPrice { get; set; }
    }
}
using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Web_Service.Models.Train_Ticket_Booking_Management
{
    public class TrainTicketBooking
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string BookingID { get; set; }

        public string TrainID { get; set; }

        public string UserID { get; set; }

        public DateTime BookingDate { get; set; }

        public DateTime ReservationDate { get; set; }

        public int TotalPassengers { get; set; }

        public string MainPassengerName { get; set; }

        public string ContactNumber { get; set; }

        public string Email { get; set; }

        public string TicketClass { get; set; }

        public decimal TotalPrice { get; set; }
    }
}
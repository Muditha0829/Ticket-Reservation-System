using MongoDB.Bson;
using System;
using System.Linq;
using System.Web.Http;
using MongoDB.Driver;
using Web_Service.Models.Train_Ticket_Booking_Management;
using System.Text.RegularExpressions;

namespace WebSevice.Controllers
{
    [RoutePrefix("api/trainbooking")]
    public class TrainTicketBookingController : ApiController
    {
        private readonly IMongoCollection<TrainTicketBooking> _bookingsCollection;

        public TrainTicketBookingController()
        {
            var connectionString = "mongodb+srv://Pasindu:Pasindu@cluster0.4fhs7.mongodb.net";
            var collectionName = "TrainBookings";
            var client = new MongoClient(connectionString);
            var database = client.GetDatabase("EAD_Group_Assignment");
            _bookingsCollection = database.GetCollection<TrainTicketBooking>(collectionName);
        }

        [HttpPost]
        [Route("createticketbooking")]
        public IHttpActionResult CreateBooking(TrainTicketBooking booking)
        {
            booking.BookingID = ObjectId.GenerateNewId().ToString();

            // Calculate the difference in days between ReservationDate and BookingDate
            int daysDifference = (booking.ReservationDate - DateTime.Now).Days;

            if (daysDifference < 30)
            {
                if (booking.TotalPassengers > 4)
                {
                    return BadRequest("Maximum 4 passengers allowed per reservation.");
                }

                if (!IsValidEmail(booking.Email))
                {
                    return BadRequest("Invalid email address.");
                }

                if (!IsValidContactNumber(booking.ContactNumber))
                {
                    return BadRequest("Invalid contact number.");
                }

                if (!IsValidTicketClass(booking.TicketClass))
                {
                    return BadRequest("Invalid ticket class.");
                }

                booking.BookingDate = DateTime.Now;

                _bookingsCollection.InsertOne(booking);

                return Ok(booking);
            }

            return BadRequest("Reservation date must be within 30 days from the current date.");
        }

        private bool IsValidEmail(string email)
        {
            // Add your email validation logic here
            return Regex.IsMatch(email, @"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}");
        }

        private bool IsValidContactNumber(string contactNumber)
        {
            // Add your contact number validation logic here
            return Regex.IsMatch(contactNumber, @"^[0-9]{10}$");
        }

        private bool IsValidTicketClass(string ticketClass)
        {
            // Add your ticket class validation logic here
            return ticketClass == "First Class" || ticketClass == "Second Class" || ticketClass == "Third Class";
        }


        [HttpGet]
        [Route("getticketbooking/{id}")]
        public IHttpActionResult GetBookingById(string id)
        {
            var reservation = _bookingsCollection.Find(b => b.BookingID == id).FirstOrDefault();

            if (reservation == null)
            {
                return NotFound();
            }
            return Ok(reservation);
        }

        [HttpGet]
        [Route("getallticketbookings/{userId}")]
        public IHttpActionResult GetAllBookings(string userId)
        {
            var reservations = _bookingsCollection.Find(b => b.UserID == userId).ToList();
            return Ok(reservations);
        }

        [HttpPut]
        [Route("updateticketbooking/{id}")]
        public IHttpActionResult UpdateTicketBooking(string id, TrainTicketBooking updatedBooking)
        {
            var filter = Builders<TrainTicketBooking>.Filter.Eq(t => t.BookingID, id);
            var today = DateTime.Now;

            // Calculate the difference in days between ReservationDate and BookingDate
            int daysDifference = (updatedBooking.ReservationDate - today).Days;

            if (daysDifference > 5)
            {
                if (updatedBooking.TotalPassengers > 4)
                {
                    return BadRequest("Maximum 4 passengers allowed per reservation.");
                }

                if (!IsValidEmail(updatedBooking.Email))
                {
                    return BadRequest("Invalid email address.");
                }

                if (!IsValidContactNumber(updatedBooking.ContactNumber))
                {
                    return BadRequest("Invalid contact number.");
                }

                if (!IsValidTicketClass(updatedBooking.TicketClass))
                {
                    return BadRequest("Invalid ticket class.");
                }
                var update = Builders<TrainTicketBooking>.Update
                    .Set(t => t.TrainName, updatedBooking.TrainName)
                    .Set(t => t.UserID, updatedBooking.UserID)
                    .Set(t => t.ReservationDate, updatedBooking.ReservationDate)
                    .Set(t => t.TotalPassengers, updatedBooking.TotalPassengers)
                    .Set(t => t.MainPassengerName, updatedBooking.MainPassengerName)
                    .Set(t => t.ContactNumber, updatedBooking.ContactNumber)
                    .Set(t => t.Email, updatedBooking.Email)
                    .Set(t => t.TicketClass, updatedBooking.TicketClass)
                    .Set(t => t.TotalPrice, updatedBooking.TotalPrice);

                var result = _bookingsCollection.UpdateOne(filter, update);

                if (result.ModifiedCount == 0)
                {
                    return NotFound();
                }

                return Ok("Train ticket booking updated");
            }

            return BadRequest("Reservation can only be updated if the difference between Reservation Date and Booking Date is greater than 5 days.");
        }

        [HttpPut]
        [Route("cancelticketbooking/{id}")]
        public IHttpActionResult CancelBooking(string id)
        {
            var filter = Builders<TrainTicketBooking>.Filter.Eq(b => b.BookingID, id);
            var existingBooking = _bookingsCollection.Find(filter).FirstOrDefault();

            if (existingBooking == null)
            {
                return NotFound();
            }

            var today = DateTime.Now;
            var reservationDate = existingBooking.ReservationDate;

            if (reservationDate > today && reservationDate.Subtract(today).Days >= 5)
            {
                var result = _bookingsCollection.DeleteOne(filter);

                if (result.DeletedCount == 0)
                {
                    return NotFound();
                }

                return Ok("Reservation cancelled and booking deleted.");
            }

            return BadRequest("Reservation can only be canceled at least 5 days before the reservation date.");
        }
    }
}
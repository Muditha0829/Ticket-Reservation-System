/*
    Filename: TrainTicketBookingController.cs
    Description:
    This file contains the definition of the TrainTicketBookingController class, which handles train ticket booking related API endpoints.
*/

using MongoDB.Bson;
using System;
using System.Linq;
using System.Web.Http;
using MongoDB.Driver;
using Web_Service.Models.Ticket_Booking_Management;
using System.Text.RegularExpressions;
using System.Collections.Generic;

namespace WebSevice.Controllers
{
    [RoutePrefix("api/trainbooking")]
    public class TrainTicketBookingController : ApiController
    {
        private readonly IMongoCollection<TicketBooking> _bookingsCollection;

        public TrainTicketBookingController()
        {
            var connectionString = "mongodb+srv://Pasindu:Pasindu@cluster0.4fhs7.mongodb.net";
            var collectionName = "TrainBookings";
            var client = new MongoClient(connectionString);
            var database = client.GetDatabase("EAD_Group_Assignment");
            _bookingsCollection = database.GetCollection<TicketBooking>(collectionName);
        }

        // Create Train Ticket Booking endpoint
        [HttpPost]
        [Route("createticketbooking")]
        public IHttpActionResult CreateBooking(TicketBooking booking)
        {
            booking.BookingID = ObjectId.GenerateNewId().ToString();

            // Calculate the difference in days between ReservationDate and BookingDate
            int daysDifference = (booking.ReservationDate - DateTime.Now).Days;

            if (daysDifference < 30)
            {

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

                if (!IsValidNIC(booking.NIC))
                {
                    return BadRequest("Invalid NIC.");
                }

                var NIC = booking.NIC;
                var maxReservationsCount = _bookingsCollection.CountDocuments(x => x.NIC == NIC);

                if (maxReservationsCount >= 4)
                {
                    return BadRequest("Maximum 4 reservations allowed per NIC.");
                }

                if (!IsValidNIC(booking.NIC))
                {
                    return BadRequest("Invalid NIC format.");
                }

                booking.BookingDate = DateTime.Now;

                _bookingsCollection.InsertOne(booking);

                return Ok(booking);
            }

            return BadRequest("Reservation date must be within 30 days from the current date.");
        }

        // Validate NIC format (Assuming NIC is a 9-digit number)
        private bool IsValidNIC(string nic)
        {
            // Use a regular expression to validate NIC format
            string nicPattern = @"^\d{12}$";
            return Regex.IsMatch(nic, nicPattern);
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

        // Get booking by ID
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

        // Get all bookings of a user
        [HttpGet]
        [Route("getallticketbookings/{userId}")]
        public IHttpActionResult GetAllMyBookings(string userId)
        {
            var reservations = _bookingsCollection.Find(b => b.UserID == userId).ToList();
            return Ok(reservations);
        }

        // Get all bookings
        [HttpGet]
        [Route("getallticketbookings")]
        public IHttpActionResult GetAllBookings()
        {
            var reservations = _bookingsCollection.Find(_ => true).ToList();
            return Ok(reservations);
        }

        // Update Train Ticket Booking endpoint
        [HttpPut]
        [Route("updateticketbooking/{id}")]
        public IHttpActionResult UpdateTicketBooking(string id, TicketBooking updatedBooking)
        {
            var filter = Builders<TicketBooking>.Filter.Eq(t => t.BookingID, id);
            var today = DateTime.Now;

            // Calculate the difference in days between ReservationDate and BookingDate
            int daysDifference = (updatedBooking.ReservationDate - today).Days;
            // Calculate the difference in days between ReservationDate and BookingDate
            int daysDifferencetwo = (updatedBooking.ReservationDate - DateTime.Now).Days;

            if (daysDifferencetwo < 30)
            {

                if (daysDifference > 5)
                {

                    if (!IsValidEmail(updatedBooking.Email))
                    {
                        return BadRequest("Invalid email address.");
                    }

                    var NIC = updatedBooking.NIC;
                    var maxReservationsCount = _bookingsCollection.CountDocuments(x => x.NIC == NIC);

                    if (maxReservationsCount >= 4)
                    {
                        return BadRequest("Maximum 4 reservations allowed per NIC.");
                    }

                    if (!IsValidContactNumber(updatedBooking.ContactNumber))
                    {
                        return BadRequest("Invalid contact number.");
                    }

                    if (!IsValidTicketClass(updatedBooking.TicketClass))
                    {
                        return BadRequest("Invalid ticket class.");
                    }
                    var update = Builders<TicketBooking>.Update
                        .Set(t => t.TrainName, updatedBooking.TrainName)
                        .Set(t => t.ReservationDate, updatedBooking.ReservationDate)
                        .Set(t => t.TotalPassengers, updatedBooking.TotalPassengers)
                        .Set(t => t.MainPassengerName, updatedBooking.MainPassengerName)
                        .Set(t => t.ContactNumber, updatedBooking.ContactNumber)
                        .Set(t => t.DepartureStation, updatedBooking.DepartureStation)
                        .Set(t => t.DestinationStation, updatedBooking.DestinationStation)
                        .Set(t => t.Email, updatedBooking.Email)
                        .Set(t => t.NIC, updatedBooking.NIC)
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
            return BadRequest("Reservation date must be within 30 days from the current date.");
        }

        // Cancel Train Ticket Booking endpoint
        [HttpPut]
        [Route("cancelticketbooking/{id}")]
        public IHttpActionResult CancelBooking(string id)
        {
            var filter = Builders<TicketBooking>.Filter.Eq(b => b.BookingID, id);
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

        // Get booking count
        [HttpGet]
        [Route("getbookingcount")]
        public IHttpActionResult GetBookingCount()
        {
            var bookingCount = _bookingsCollection.CountDocuments(new BsonDocument());
            return Ok(bookingCount);
        }
    }
}
using MongoDB.Driver;
using Web_Service.Models.Train_Management;
using Web_Service.Models.Ticket_Booking_Management;

namespace Web_Service.Models
{
    public class DatabaseContext
    {
        private IMongoDatabase _database;

        public IMongoCollection<User> Users { get; private set; }
        public IMongoCollection<TicketBooking> TrainBookings { get; private set; }
        public IMongoCollection<Train> Trains { get; private set; }

        public DatabaseContext(string connectionString, string databaseName)
        {
            var client = new MongoClient("mongodb+srv://Pasindu:Pasindu@cluster0.4fhs7.mongodb.net");
            _database = client.GetDatabase("EAD_Group_Assignment");

            Users = _database.GetCollection<User>("Users");
            TrainBookings = _database.GetCollection<TicketBooking>("TrainBookings");
            Trains = _database.GetCollection<Train>("Trains");
        }
    }
}
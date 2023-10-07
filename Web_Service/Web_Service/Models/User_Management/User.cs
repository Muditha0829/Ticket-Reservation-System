using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Web_Service.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public string UserID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string NIC { get; set; }
        public string Gender { get; set; }
        public string ContactNumber { get; set; }
        public string UserType { get; set; }
        public string Password { get; set; }
        public string RePassword { get; set; }
        public string UserStatus { get; set; }
    }
}
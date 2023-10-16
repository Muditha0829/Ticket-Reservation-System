/*
    Filename: User.cs
    Description:
    This file contains the definition of the User class, which represents user data in the application.
*/

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Web_Service.Models
{
    public class User
    {
        // Unique identifier for the user
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public string UserID { get; set; }

        // First name of the user
        public string FirstName { get; set; }

        // Last name of the user
        public string LastName { get; set; }

        // Username chosen by the user
        public string UserName { get; set; }

        // Email address of the user
        public string Email { get; set; }

        // National Identity Card number of the user
        public string NIC { get; set; }

        // Gender of the user
        public string Gender { get; set; }

        // Contact number of the user
        public string ContactNumber { get; set; }

        // Type of user (e.g., admin, regular user, etc.)
        public string UserType { get; set; }

        // User's chosen password
        public string Password { get; set; }

        // Re-entered password for confirmation
        public string RePassword { get; set; }

        // Status of the user's account (e.g., active, inactive, etc.)
        public string UserStatus { get; set; }
    }
}
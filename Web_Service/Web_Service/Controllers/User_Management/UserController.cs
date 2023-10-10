using System.Linq;
using System.Web.Http;
using Web_Service.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Security.Cryptography;
using System;
using System.Text;
using System.Text.RegularExpressions;

namespace WebSevice.Controllers
{
    [RoutePrefix("api/users")]
    public class UsersController : ApiController
    {
        private readonly IMongoCollection<User> _usersCollection;

        public UsersController()
        {
            var connectionString = "mongodb+srv://Pasindu:Pasindu@cluster0.4fhs7.mongodb.net";
            var collectionName = "Users";
            var client = new MongoClient(connectionString);
            var database = client.GetDatabase("EAD_Group_Assignment");
            _usersCollection = database.GetCollection<User>(collectionName);
        }

        [HttpPost]
        [Route("signup")]
        public IHttpActionResult signup(User user)
        {
            var existingUser = _usersCollection.Find(u => u.NIC == user.NIC).FirstOrDefault();

            if (existingUser != null)
            {
                return BadRequest("User with this NIC already exists.");
            }

            if (user.Password != user.RePassword)
            {
                return BadRequest("Passwords do not match.");
            }

            // Validate email format
            if (!IsValidEmail(user.Email))
            {
                return BadRequest("Invalid email format.");
            }

            // Validate NIC format (Assuming NIC is a 9-digit number)
            if (!IsValidNIC(user.NIC))
            {
                return BadRequest("Invalid NIC format.");
            }

            // Validate contact number format (Assuming 10-digit number)
            if (!IsValidContactNumber(user.ContactNumber))
            {
                return BadRequest("Invalid contact number format.");
            }

            // Validate password format (Assuming at least 8 characters, one uppercase, one lowercase, one digit, and one special character)
            string passwordPattern = @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$";
            if (!Regex.IsMatch(user.Password, passwordPattern))
            {
                return BadRequest("Invalid password format.");
            }

            if (!Regex.IsMatch(user.RePassword, passwordPattern))
            {
                return BadRequest("Invalid password format.");
            }

            // Hash the password
            string hashedPassword = HashPassword(user.Password);

            var newUser = new User
            {
                UserID = ObjectId.GenerateNewId().ToString(),
                FirstName = user.FirstName,
                LastName = user.LastName,
                UserName = user.UserName,
                Email = user.Email,
                ContactNumber = user.ContactNumber,
                NIC = user.NIC,
                Gender = user.Gender,
                UserType = user.UserType,
                Password = hashedPassword,  // Set the hashed password
                RePassword = hashedPassword,  // Set the hashed re-password
                UserStatus = "Active"
            };
            _usersCollection.InsertOne(newUser);
            return Ok(newUser);
        }



        // Hashing function
        private string HashPassword(string password)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(hashedBytes);
            }
        }

        // Validate email format
        private bool IsValidEmail(string email)
        {
            // Use a regular expression to validate email format
            string emailPattern = @"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$";
            return Regex.IsMatch(email, emailPattern);
        }

        // Validate NIC format (Assuming NIC is a 9-digit number)
        private bool IsValidNIC(string nic)
        {
            // Use a regular expression to validate NIC format
            string nicPattern = @"^\d{12}$";
            return Regex.IsMatch(nic, nicPattern);
        }

        // Validate contact number format (Assuming 10-digit number)
        private bool IsValidContactNumber(string contactNumber)
        {
            // Use a regular expression to validate contact number format
            string contactNumberPattern = @"^\d{10}$";
            return Regex.IsMatch(contactNumber, contactNumberPattern);
        }

        [HttpPost]
        [Route("signin")]
        public IHttpActionResult signin(User user)
        {
            var existingUser = _usersCollection.Find(u => u.NIC == user.NIC).FirstOrDefault();

            if (existingUser == null)
            {
                return NotFound();
            }

            if (existingUser.UserStatus == "Deactive")
            {
                return BadRequest("User is deactive and cannot sign in.");
            }

            // Check if the provided password matches the stored hashed password
            if (!VerifyPassword(user.Password, existingUser.Password))
            {
                return BadRequest("Incorrect password.");
            }

            return Ok(existingUser);
        }

        private bool VerifyPassword(string enteredPassword, string storedHashedPassword)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] enteredBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(enteredPassword));
                string enteredHashedPassword = Convert.ToBase64String(enteredBytes);
                return enteredHashedPassword == storedHashedPassword;
            }
        }

        [HttpPost]
        [Route("createtraveluser")]
        public IHttpActionResult CreateTraveluser(User user)
        {
            // Validate email format
            if (!IsValidEmail(user.Email))
            {
                return BadRequest("Invalid email format.");
            }

            // Validate NIC format (Assuming NIC is a 9-digit number)
            if (!IsValidNIC(user.NIC))
            {
                return BadRequest("Invalid NIC format.");
            }

            // Validate contact number format (Assuming 10-digit number)
            if (!IsValidContactNumber(user.ContactNumber))
            {
                return BadRequest("Invalid contact number format.");
            }

            // Validate password format (Assuming at least 8 characters, one uppercase, one lowercase, one digit, and one special character)
            string passwordPattern = @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$";
            if (!Regex.IsMatch(user.Password, passwordPattern))
            {
                return BadRequest("Invalid password format.");
            }

            if (!Regex.IsMatch(user.RePassword, passwordPattern))
            {
                return BadRequest("Invalid password format.");
            }

            var newUser = new User
            {
                UserID = ObjectId.GenerateNewId().ToString(),
                FirstName = user.FirstName,
                LastName = user.LastName,
                UserName = user.UserName,
                Email = user.Email,
                ContactNumber = user.ContactNumber,
                NIC = user.NIC,
                Gender = user.Gender,
                UserType = user.UserType,
                Password = user.Password,
                RePassword = user.RePassword,
                UserStatus = "Active"
            };
            _usersCollection.InsertOne(newUser);
            return Ok(newUser);
        }

        [HttpGet]
        [Route("getuser/{id}")]
        public IHttpActionResult GetUser(string id)
        {
            var user = _usersCollection.Find(u => u.UserID == id).FirstOrDefault();

            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPut]
        [Route("updateuser/{id}")]
        public IHttpActionResult updateuser(string id, User updatedUserData)
        {
            // Validate email format
            if (!IsValidEmail(updatedUserData.Email))
            {
                return BadRequest("Invalid email format.");
            }

            // Validate NIC format (Assuming NIC is a 9-digit number)
            /*if (!IsValidNIC(updatedUserData.NIC))
            {
                return BadRequest("Invalid NIC format.");
            }*/

            // Validate contact number format (Assuming 10-digit number)
            if (!IsValidContactNumber(updatedUserData.ContactNumber))
            {
                return BadRequest("Invalid contact number format.");
            }

            var filter = Builders<User>.Filter.Eq(u => u.UserID, id);
            var update = Builders<User>.Update
                .Set(u => u.UserName, updatedUserData.UserName)
                .Set(u => u.FirstName, updatedUserData.FirstName)
                .Set(u => u.LastName, updatedUserData.LastName)
                .Set(u => u.Email, updatedUserData.Email)
                .Set(u => u.Gender, updatedUserData.Gender)
                .Set(u => u.ContactNumber, updatedUserData.ContactNumber);

            var result = _usersCollection.UpdateOne(filter, update);

            if (result.ModifiedCount == 0)
            {
                return NotFound();
            }

            // Retrieve the updated user
            var updatedUser = _usersCollection.Find(u => u.UserID == id).FirstOrDefault();

            if (updatedUser == null)
            {
                return NotFound();
            }

            return Ok(updatedUser);
        }

        [HttpGet]
        [Route("getallusers")]
        public IHttpActionResult GetAllUsers()
        {
            var filter = Builders<User>.Filter.Eq(u => u.UserType, "Traveler");
            var travelusers = _usersCollection.Find(filter).ToList();
            return Ok(travelusers);
        }

        [HttpPut]
        [Route("updateuserstatus/{id}")]
        public IHttpActionResult updateuser(string id, [FromBody] UserStatusModel updateModel)
        {
            var filter = Builders<User>.Filter.And(
                Builders<User>.Filter.Eq(u => u.UserID, id)
            );
            var update = Builders<User>.Update.Set(u => u.UserStatus, updateModel.UserStatus);

            var result = _usersCollection.UpdateOne(filter, update);

            if (result.ModifiedCount == 0)
            {
                return NotFound();
            }
            return Ok("User Status Updated");
        }

        public class UserStatusModel
        {
            public string UserStatus { get; set; }
        }


        [HttpDelete]
        [Route("deleteuser/{id}")]
        public IHttpActionResult DeleteUser(string id)
        {
            var result = _usersCollection.DeleteOne(u => u.UserID == id);

            if (result.DeletedCount == 0)
            {
                return NotFound();
            }
            return Ok("user deleted");
        }

        [HttpGet]
        [Route("getusercount")]
        public IHttpActionResult GetUserCount()
        {
            long userCount = _usersCollection.CountDocuments(new BsonDocument());

            return Ok(userCount);
        }

        [HttpGet]
        [Route("getbackofficeusercount")]
        public IHttpActionResult GetTravelAgentCount()
        {
            var filter = Builders<User>.Filter.Eq(u => u.UserType, "backofficeuser");
            long backofficeUserCount = _usersCollection.CountDocuments(filter);

            return Ok(backofficeUserCount);
        }


        [HttpGet]
        [Route("gettravelagentcount")]
        public IHttpActionResult GetBackofficeUserCount()
        {
            var filter = Builders<User>.Filter.Eq(u => u.UserType, "travelagent");
            long backofficeUserCount = _usersCollection.CountDocuments(filter);

            return Ok(backofficeUserCount);
        }


        [HttpGet]
        [Route("gettravelusercount")]
        public IHttpActionResult GetTravelUserCount()
        {
            var filter = Builders<User>.Filter.Eq(u => u.UserType, "Traveler");
            long backofficeUserCount = _usersCollection.CountDocuments(filter);

            return Ok(backofficeUserCount);
        }

    }
}
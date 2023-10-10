using System.Web.Http;
using MongoDB.Bson;
using MongoDB.Driver;
using Web_Service.Models.Train_Management;

namespace Web_Service.Controllers
{
    [RoutePrefix("api/trains")]
    public class TrainsController : ApiController
    {
        private readonly IMongoCollection<Train> _trainsCollection;

        public TrainsController()
        {
            var connectionString = "mongodb+srv://Pasindu:Pasindu@cluster0.4fhs7.mongodb.net";
            var collectionName = "Trains";
            var client = new MongoClient(connectionString);
            var database = client.GetDatabase("EAD_Group_Assignment");
            _trainsCollection = database.GetCollection<Train>(collectionName);
        }

        [HttpPost]
        [Route("createtrain")]
        public IHttpActionResult CreateTrain(Train train)
        {
            // Validate Train Name
            if (string.IsNullOrWhiteSpace(train.TrainName))
            {
                return BadRequest("Train Name is required.");
            }

            // Validate DepartureStation and ArrivalStation
            if (string.IsNullOrWhiteSpace(train.DepartureStation) || string.IsNullOrWhiteSpace(train.ArrivalStation))
            {
                return BadRequest("Both Departure and Arrival Stations are required.");
            }

            // Validate DepartureTime and ArrivalTime
            if (train.DepartureTime >= train.ArrivalTime)
            {
                return BadRequest("Departure Time must be before Arrival Time.");
            }

            // Validate Train Type
            if (string.IsNullOrWhiteSpace(train.TrainType))
            {
                return BadRequest("Train Type is required.");
            }

            // Validate Ticket Prices
            if (string.IsNullOrWhiteSpace(train.FirstClassTicketPrice) ||
                string.IsNullOrWhiteSpace(train.SecondClassTicketPrice) ||
                string.IsNullOrWhiteSpace(train.ThirdClassTicketPrice))
            {
                return BadRequest("All Ticket Prices are required.");
            }

            // Set Train ID and Status
            train.TrainID = ObjectId.GenerateNewId().ToString();
            train.TrainStatus = "Active";

            // Insert the train into the database
            _trainsCollection.InsertOne(train);

            return Ok(train);
        }

        [HttpGet]
        [Route("getalltrains")]
        public IHttpActionResult GetAllTrains()
        {
            var trains = _trainsCollection.Find(new BsonDocument()).ToList();
            return Ok(trains);
        }

        [HttpGet]
        [Route("getallActivetrains")]
        public IHttpActionResult GetActiveTrains()
        {
            var activeTrains = _trainsCollection.Find(t => t.TrainStatus == "Active").ToList();
            return Ok(activeTrains);
        }

        [HttpGet]
        [Route("gettrain/{id}")]
        public IHttpActionResult GetTrain(string id)
        {
            var train = _trainsCollection.Find(t => t.TrainName == id).FirstOrDefault();
            if (train == null)
            {
                return NotFound();
            }
            return Ok(train);
        }

        [HttpGet]
        [Route("gettrainbyId/{id}")]
        public IHttpActionResult GetTrainById(string id)
        {
            var train = _trainsCollection.Find(t => t.TrainID == id).FirstOrDefault();
            if (train == null)
            {
                return NotFound();
            }
            return Ok(train);
        }

        [HttpPut]
        [Route("updatetrain/{id}")]
        public IHttpActionResult updatetrain(string id, Train updatedTrain)
        {
            if (string.IsNullOrWhiteSpace(updatedTrain.TrainName))
            {
                return BadRequest("Train Name is required.");
            }

            if (string.IsNullOrWhiteSpace(updatedTrain.DepartureStation) || string.IsNullOrWhiteSpace(updatedTrain.ArrivalStation))
            {
                return BadRequest("Both Departure and Arrival Stations are required.");
            }

            if (updatedTrain.DepartureTime >= updatedTrain.ArrivalTime)
            {
                return BadRequest("Departure Time must be before Arrival Time.");
            }

            if (string.IsNullOrWhiteSpace(updatedTrain.TrainType))
            {
                return BadRequest("Train Type is required.");
            }

            if (string.IsNullOrWhiteSpace(updatedTrain.FirstClassTicketPrice) ||
                string.IsNullOrWhiteSpace(updatedTrain.SecondClassTicketPrice) ||
                string.IsNullOrWhiteSpace(updatedTrain.ThirdClassTicketPrice))
            {
                return BadRequest("All Ticket Prices are required.");
            }

            var filter = Builders<Train>.Filter.Eq(t => t.TrainID, id);
            var update = Builders<Train>.Update
                .Set(t => t.TrainNumber, updatedTrain.TrainNumber)
                .Set(t => t.TrainName, updatedTrain.TrainName)
                .Set(t => t.TrainDriver, updatedTrain.TrainDriver)
                .Set(t => t.DepartureStation, updatedTrain.DepartureStation)
                .Set(t => t.ArrivalStation, updatedTrain.ArrivalStation)
                .Set(t => t.DepartureTime, updatedTrain.DepartureTime)
                .Set(t => t.ArrivalTime, updatedTrain.ArrivalTime)
                .Set(t => t.TrainType, updatedTrain.TrainType)
                .Set(t => t.FirstClassTicketPrice, updatedTrain.FirstClassTicketPrice)
                .Set(t => t.SecondClassTicketPrice, updatedTrain.SecondClassTicketPrice)
                .Set(t => t.ThirdClassTicketPrice, updatedTrain.ThirdClassTicketPrice)
                .Set(t => t.TrainStatus, updatedTrain.TrainStatus);

            var result = _trainsCollection.UpdateOne(filter, update);

            if (result.ModifiedCount == 0)
            {
                return NotFound();
            }

            return Ok("Train schedule updated");
        }

        [HttpDelete]
        [Route("deletetrain/{id}")]
        public IHttpActionResult DeleteTrain(string id)
        {
            var result = _trainsCollection.DeleteOne(t => t.TrainID == id);

            if (result.DeletedCount == 0)
            {
                return NotFound();
            }

            return Ok("Train shedule deleted");
        }

        [HttpGet]
        [Route("gettraincount")]
        public IHttpActionResult GetTrainCount()
        {
            long trainCount = _trainsCollection.CountDocuments(new BsonDocument());
            return Ok(trainCount);
        }
    }
}
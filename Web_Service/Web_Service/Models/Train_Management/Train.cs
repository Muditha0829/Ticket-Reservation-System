/*
    Filename: Train.cs
    Description:
    This file contains the definition of the Train class, which represents train information in the application.
*/

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace Web_Service.Models.Train_Management
{
    public class Train
    {
        // Unique identifier for the train
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string TrainID { get; set; }

        // ID of the user associated with this train
        public string UserID { get; set; }

        // Number assigned to the train
        public string TrainNumber { get; set; }

        // Name of the train
        public string TrainName { get; set; }

        // Driver of the train
        public string TrainDriver { get; set; }

        // Station where the train departs from
        public string DepartureStation { get; set; }

        // Station where the train arrives
        public string ArrivalStation { get; set; }

        // Time when the train departs
        public DateTime DepartureTime { get; set; }

        // Time when the train arrives
        public DateTime ArrivalTime { get; set; }

        // Formatted string representation of departure time
        public string FormattedDepartureTime
        {
            get
            {
                return DepartureTime.ToString("yyyy-MM-dd HH:mm:ss");
            }
        }

        // Formatted string representation of arrival time
        public string FormattedArrivalTime
        {
            get
            {
                return ArrivalTime.ToString("yyyy-MM-dd HH:mm:ss");
            }
        }

        // Type or category of the train
        public string TrainType { get; set; }

        // Price of a first class ticket
        public string FirstClassTicketPrice { get; set; }

        // Price of a second class ticket
        public string SecondClassTicketPrice { get; set; }

        // Price of a third class ticket
        public string ThirdClassTicketPrice { get; set; }

        // Status of the train (e.g., active, inactive, etc.)
        public string TrainStatus { get; set; }
    }
}
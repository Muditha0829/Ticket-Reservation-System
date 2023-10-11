using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web_Service.Models.Train_Management
{
    public class Train
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string TrainID { get; set; }
        public string UserID { get; set; }
        public string TrainNumber { get; set; }
        public string TrainName { get; set; }
        public string TrainDriver { get; set; }
        public string DepartureStation { get; set; }
        public string ArrivalStation { get; set; }
        public DateTime DepartureTime { get; set; }
        public DateTime ArrivalTime { get; set; }

        public string FormattedDepartureTime
        {
            get
            {
                return DepartureTime.ToString("yyyy-MM-dd HH:mm:ss");
                // Adjust the format string as needed (e.g., "dd/MM/yyyy HH:mm" for a different format)
            }
        }

        public string FormattedArrivalTime
        {
            get
            {
                return ArrivalTime.ToString("yyyy-MM-dd HH:mm:ss");
                // Adjust the format string as needed (e.g., "dd/MM/yyyy HH:mm" for a different format)
            }
        }

        public string TrainType { get; set; }
        public string FirstClassTicketPrice { get; set; }
        public string SecondClassTicketPrice { get; set; }
        public string ThirdClassTicketPrice { get; set; }
        public string TrainStatus { get; set; }
    }
}
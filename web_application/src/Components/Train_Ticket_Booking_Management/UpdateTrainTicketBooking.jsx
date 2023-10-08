import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { AuthContext } from '../AuthContext';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const UpdateTrainTicketBooking = () => {
  const { BookingID } = useParams();
  const { userId } = useContext(AuthContext);
  const [trainData, setTrainData] = useState([]);
  const [TrainID, setTrainID] = useState('');
  const [updatedReservationData, setUpdatedReservationData] = useState({
    MainPassengerName: '',
    UserID: userId,
    ReservationDate: '',
    BookingDate: '',
    DepartureStation: '',
    DestinationStation: '',
    TrainName: '',
    TotalPassengers: "",
    TicketClass: '',
    Email: '',
    ContactNumber: '',
    TotalPrice: ''
  });

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedReservationData({
      ...updatedReservationData,
      [name]: value,
    });
  };

// const isValidEmail = (Email) => {
//   const EmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return EmailPattern.test(Email);
// };

// const isValidContactNumber = (EmailNumber) => {
//   const EmailNumberPattern = /^\d{10}$/;
//   return EmailNumberPattern.test(EmailNumber);
// };

// const isValidNIC = (nic) => {
//   const nicPattern = /^[0-9]{10,12}$/;
//   return nicPattern.test(nic);
// };

  const handleSubmit = (e) => {
    e.preventDefault();

    const ReservationDateObj = new Date(updatedReservationData.ReservationDate);
    const BookingDateObj = new Date(updatedReservationData.BookingDate);
    const differenceInMilliseconds = ReservationDateObj - BookingDateObj;
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

    // if (differenceInDays <= 5) {
    //   alert("Reservation can only be updated if reservation date is more than 5 days after booking date.");
    //   return;
    // }

    // if (!isValidEmail(updatedReservationData.Email)) {
    //   alert('Invalid Email. Please enter a valid Email address.');
    //   return;
    // }
    
    // if (!isValidContactNumber(updatedReservationData.Phone)) {
    //   alert('Invalid contact number. Please enter a 10-digit Email number.');
    //   return;
    // }    

    // if (!isValidNIC(updatedReservationData.NIC)) {
    //   alert('Invalid NIC. Please enter a valid NIC number (e.g., 123456789V).');
    //   return;
    // }

    axios.put(`http://localhost:57549/api/trainbooking/updateticketbooking/${BookingID}`, updatedReservationData)
      .then(response => {
        console.log('Reservation updated:', response.data);
        alert('Reservation updated successfully!');
        history.push('/travelagentdashboard');
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Reservation can only be updated if reservation date is more than 5 days after booking date.');
      });
  };

  useEffect(() => {
    // Fetch data based on reservationID
    if (BookingID) {
      axios.get(`http://localhost:57549/api/trainbooking/getticketbooking/${BookingID}`)
        .then(response => {
          setUpdatedReservationData(response.data);
        })
        .catch(error => {
          console.error('Error fetching reservation data:', error);
        });
    }
  }, [BookingID]);  

  useEffect(() => {
    axios.get('http://localhost:57549/api/trains/getallactivetrains')
      .then(response => {
        setTrainData(response.data);
      })
      .catch(error => {
        console.error('Error fetching train data:', error);
      });
  }, []);

  return (
    <Container className="my-5 text-center" style={{width: "75%", paddingLeft: "250px"}}>
  <Card style={{ background: 'rgba(255, 255, 255, 0.7)', border: 'none' }}>
            <Card.Body>
              <Card.Title style={{ margin: "25px", fontFamily: "Dela Gothic One", fontSize: "34px" }}>Update Your Trian Booking</Card.Title>
              
                
  <Form onSubmit={handleSubmit}>
  <div className="row">
  <div className="col-md-6" style={{textAlign: "left"}}>
    <Form.Group style={{textAlign:"left", margin: "25px"}}>
      <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Main Passenger Name</Form.Label>
      <Form.Control
        type="text"
        name="TravelerName"
        value={updatedReservationData.MainPassengerName}
        onChange={handleChange}
        placeholder="Traveler Name"
        style={{fontFamily: "Onest"}}
        required
      />
    </Form.Group>
    <Form.Group style={{textAlign:"left", margin: "25px"}}>
      <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Email:</Form.Label>
      <Form.Control
        type="Email"
        name="Email"
        value={updatedReservationData.Email}
        style={{fontFamily: "Onest"}}
        onChange={handleChange}
        placeholder="Email"
        required
      />
    </Form.Group>
    <Form.Group style={{textAlign:"left", margin: "25px"}}> 
      <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Contact Number</Form.Label>
      <Form.Control
        type="tel"
        name="Phone"
        value={updatedReservationData.ContactNumber}
        style={{fontFamily: "Onest"}}
        onChange={handleChange}
        placeholder="Phone"
        required
      />
    </Form.Group>
    
    <Form.Group controlId="TrainID" style={{textAlign:"left", margin: "25px"}}>
      <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Train Name</Form.Label>
      <Form.Select
        name="TrainID"
        style={{fontFamily: "Onest"}}
        value={updatedReservationData.TrainID}
        onChange={handleChange}
        required
      >
        <option value="">Select Train Name</option>
        {trainData.map(train => (
  <option key={train._id} value={train._id}>
    {train.TrainName}
  </option>
))}
      </Form.Select>
    </Form.Group>
    <Form.Group style={{textAlign:"left", margin: "25px"}}>
      <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Reservation Date</Form.Label>
      <Form.Control
  type="date"
  name="ReservationDate"
  style={{fontFamily: "Onest"}}
  value={updatedReservationData.ReservationDate}
  onChange={handleChange}
  required
/>
    </Form.Group>
    
    </div>
    <div className="col-md-6" style={{textAlign: "left"}}>
    <Form.Group controlId="TotalPassengers" style={{textAlign:"left", margin: "25px"}}>
      <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Total Passengers</Form.Label>
      <Form.Select
        name="NumPassengers"
        style={{fontFamily: "Onest"}}
        value={updatedReservationData.TotalPassengers}
        onChange={handleChange}
        required
      >
        <option value="">Select total passengers</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </Form.Select>
    </Form.Group>
    
    <Form.Group controlId="TicketClass" style={{textAlign:"left", margin: "25px"}}>
      <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Ticket Class:</Form.Label>
      <Form.Select
        name="TicketClass"
        style={{fontFamily: "Onest"}}
        value={updatedReservationData.TicketClass}
        onChange={handleChange}
        required
      >
        <option value="">Select Ticket Class</option>
        <option value="First Class">First Class</option>
        <option value="Second Class">Second Class</option>
        <option value="Third Class">Third Class</option>
      </Form.Select>
    </Form.Group>

    <Form.Group style={{textAlign:"left", margin: "25px"}}>
      <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Departure Station</Form.Label>
      <Form.Control
        type="text"
        name="DepartureStation"
        style={{fontFamily: "Onest"}}
        value={updatedReservationData.DepartureStation}
        onChange={handleChange}
        placeholder="DepartureStation"
        required
      />
    </Form.Group>

    <Form.Group style={{textAlign:"left", margin: "25px"}}>
      <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Destination Station</Form.Label>
      <Form.Control
        type="text"
        style={{fontFamily: "Onest"}}
        name="DestinationStation"
        value={updatedReservationData.DestinationStation}
        onChange={handleChange}
        placeholder="DestinationStation"
        required
      />
    </Form.Group>
    <Form.Group style={{textAlign:"left", margin: "25px"}}>
      <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Total Price</Form.Label>
      <Form.Control
        type="tel"
        style={{fontFamily: "Onest"}}
        name="Phone"
        value={updatedReservationData.TotalPrice}
        onChange={handleChange}
        placeholder="Phone"
        required
      />
    </Form.Group>
    
        </div>
        </div>
        <Row className="mb-3" style={{margin: "25px"}}>
          <Col md={0} className="mx-auto">
            <Button variant="secondary" onClick={() => window.history.back()} style={{ width: '150px' }}>Back</Button>{' '}
            <Button variant="primary" type="submit" style={{ width: '150px' }}>Update</Button>
          </Col>
        </Row>
  </Form>
  
  
  </Card.Body>
  </Card>
  
</Container>
  );
};

export default UpdateTrainTicketBooking;
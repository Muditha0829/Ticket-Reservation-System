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
    <Container className="my-5 text-center" style={{width: "43%"}}>
  <Card>
            <Card.Body>
              <Card.Title style={{ margin: "25px", fontFamily: "MyCustomFont, sans-serif", fontSize: "34px" }}>Create New Reservation</Card.Title>
  <Form onSubmit={handleSubmit}>
    <Form.Group>
      <Form.Label>Traveler Name:</Form.Label>
      <Form.Control
        type="text"
        name="TravelerName"
        value={updatedReservationData.MainPassengerName}
        onChange={handleChange}
        placeholder="Traveler Name"
        required
      />
    </Form.Group>
    
    <Form.Group controlId="TrainID">
      <Form.Label>Train Name</Form.Label>
      <Form.Select
        name="TrainID"
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
    <Form.Group>
      <Form.Label>Reservation Date:</Form.Label>
      <Form.Control
  type="date"
  name="ReservationDate"
  value={updatedReservationData.ReservationDate}
  onChange={handleChange}
  required
/>
    </Form.Group>
    
    
    <Form.Group controlId="TotalPassengers">
      <Form.Label>Total Passengers</Form.Label>
      <Form.Select
        name="NumPassengers"
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
    
    <Form.Group controlId="TicketClass">
      <Form.Label>Ticket Class:</Form.Label>
      <Form.Select
        name="TicketClass"
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
    
    <Form.Group>
      <Form.Label>Email:</Form.Label>
      <Form.Control
        type="Email"
        name="Email"
        value={updatedReservationData.Email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
    </Form.Group>
    <Form.Group>
      <Form.Label>Contact Number:</Form.Label>
      <Form.Control
        type="tel"
        name="Phone"
        value={updatedReservationData.ContactNumber}
        onChange={handleChange}
        placeholder="Phone"
        required
      />
    </Form.Group>
    <Form.Group>
      <Form.Label>Total Price:</Form.Label>
      <Form.Control
        type="tel"
        name="Phone"
        value={updatedReservationData.TotalPrice}
        onChange={handleChange}
        placeholder="Phone"
        required
      />
    </Form.Group>
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
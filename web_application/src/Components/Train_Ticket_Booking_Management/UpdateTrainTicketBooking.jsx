import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { AuthContext } from '../AuthContext';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const UpdateTrainTicketBooking = () => {
  const { reservationID } = useParams();
  const { userId } = useContext(AuthContext);
  const [trainData, setTrainData] = useState([]);
  const [trainId, setTrainId] = useState('');
  const [updatedReservationData, setUpdatedReservationData] = useState({
    TravelerName: '',
    NIC: '',
    userId: userId,
    ReservationDate: '',
    TrainID: '',
    DepartureLocation: '',
    DestinationLocation: '',
    NumPassengers: "",
    Age: "",
    TicketClass: '',
    SeatSelection: '',
    Email: '',
    Phone: ''
  });

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedReservationData({
      ...updatedReservationData,
      [name]: value,
    });
  };

const isValidEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

const isValidContactNumber = (phoneNumber) => {
  const phoneNumberPattern = /^\d{10}$/;
  return phoneNumberPattern.test(phoneNumber);
};

const isValidNIC = (nic) => {
  const nicPattern = /^[0-9]{10,12}$/;
  return nicPattern.test(nic);
};

  const handleSubmit = (e) => {
    e.preventDefault();

    const reservationDateObj = new Date(updatedReservationData.ReservationDate);
    const bookingDateObj = new Date(updatedReservationData.bookingDate);

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = reservationDateObj - bookingDateObj;

    // Calculate the difference in days
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

    if (differenceInDays <= 5) {
      alert("Reservation can only be updated if reservation date is more than 5 days after booking date.");
      return;
    }

    if (!isValidEmail(updatedReservationData.Email)) {
      alert('Invalid email. Please enter a valid email address.');
      return;
    }
    
    if (!isValidContactNumber(updatedReservationData.Phone)) {
      alert('Invalid contact number. Please enter a 10-digit phone number.');
      return;
    }    

    if (!isValidNIC(updatedReservationData.NIC)) {
      alert('Invalid NIC. Please enter a valid NIC number (e.g., 123456789V).');
      return;
    }

    axios.put(`/api/reservations/update/${reservationID}`, updatedReservationData)
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
    if (reservationID) {
      axios.get(`/api/reservations/get/${reservationID}`)
        .then(response => {
          setUpdatedReservationData(response.data);
        })
        .catch(error => {
          console.error('Error fetching reservation data:', error);
        });
    }
  }, [reservationID]);  

  useEffect(() => {
    axios.get('/api/trains/getallactive')
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
        value={updatedReservationData.TravelerName}
        onChange={handleChange}
        placeholder="Traveler Name"
        required
      />
    </Form.Group>
    <Form.Group>
      <Form.Label>NIC:</Form.Label>
      <Form.Control
        type="text"
        name="NIC"
        value={updatedReservationData.NIC}
        onChange={handleChange}
        placeholder="NIC"
        required
      />
    </Form.Group>
    <Form.Group controlId="TrainID">
      <Form.Label>Train ID</Form.Label>
      <Form.Select
        name="TrainID"
        value={updatedReservationData.TrainID}
        onChange={handleChange}
        required
      >
        <option value="">Select Train ID</option>
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
    <Form.Group>
      <Form.Label>Departure Location:</Form.Label>
      <Form.Control
        type="text"
        name="DepartureLocation"
        value={updatedReservationData.DepartureLocation}
        onChange={handleChange}
        placeholder="Departure Location"
        required
      />
    </Form.Group>
    <Form.Group>
      <Form.Label>Destination Location:</Form.Label>
      <Form.Control
        type="text"
        name="DestinationLocation"
        value={updatedReservationData.DestinationLocation}
        onChange={handleChange}
        placeholder="Destination Location"
        required
      />
    </Form.Group>
    <Form.Group controlId="numPassengers">
      <Form.Label>Number of Passengers</Form.Label>
      <Form.Select
        name="NumPassengers"
        value={updatedReservationData.NumPassengers}
        onChange={handleChange}
        required
      >
        <option value="">Select number of passengers</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </Form.Select>
    </Form.Group>
    <Form.Group>
      <Form.Label>Age:</Form.Label>
      <Form.Control
        type="number"
        name="Age"
        value={updatedReservationData.Age}
        onChange={handleChange}
        placeholder="Age"
        required
      />
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
        <option value="a">a</option>
        <option value="b">b</option>
        <option value="c">c</option>
      </Form.Select>
    </Form.Group>
    <Form.Group>
      <Form.Label>Seat Selection:</Form.Label>
      <Form.Control
        type="text"
        name="SeatSelection"
        value={updatedReservationData.SeatSelection}
        onChange={handleChange}
        placeholder="Seat Selection"
        required
      />
    </Form.Group>
    <Form.Group>
      <Form.Label>Email:</Form.Label>
      <Form.Control
        type="email"
        name="Email"
        value={updatedReservationData.Email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
    </Form.Group>
    <Form.Group>
      <Form.Label>Phone:</Form.Label>
      <Form.Control
        type="tel"
        name="Phone"
        value={updatedReservationData.Phone}
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
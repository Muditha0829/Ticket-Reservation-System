import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { Form, Button, Card, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const AddTrainTicketBooking = () => {
  const { userId } = useContext(AuthContext);
  const [trainData, setTrainData] = useState([]);
  const [formData, setFormData] = useState({
    travelerName: '',
    nic: '',
    userId: userId,
    reservationDate: '',
    bookingDate: '',
    trainId: '',
    departureLocation: '',
    destinationLocation: '',
    numPassengers: "",
    age: "",
    ticketClass: '',
    seatSelection: '',
    email: '',
    phone: '',
    TrainID: ''
  });

  const history = useHistory();

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    if (month < 10) {
      month = `0${month}`;
    }

    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    axios.get('/api/trains/getallactive')
      .then(response => {
        setTrainData(response.data);
      })
      .catch(error => {
        console.error('Error fetching train data:', error);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
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

    if (!isValidEmail(formData.email)) {
      alert('Invalid email. Please enter a valid email address.');
      return;
    }

    if (!isValidContactNumber(formData.phone)) {
      alert('Invalid contact number. Please enter a 10-digit phone number.');
      return;
    }

    if (!isValidNIC(formData.nic)) {
      alert('Invalid NIC. Please enter a valid NIC number.');
      return;
    }

  const reservationDate = new Date(formData.reservationDate);
  const bookingDate = new Date(getCurrentDate());

  const differenceInMilliseconds = reservationDate - bookingDate;

  const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

  if (differenceInDays >= 30) {
    alert("Reservation date must be within 30 days of booking date.");
    return;
  }

    setFormData({
      ...formData,
      bookingDate: getCurrentDate()
    });
  
    axios.post('/api/reservations/create', formData)
      .then(response => {
        console.log('Reservation created:', response.data);
        alert("Reservation Added");
        history.push('/travelagentdashboard');
      })
      .catch(error => {
        console.error('Error creating reservation:', error);
      });
  };

  return (
    <Container className="text-center mt-5" style={{width: "700px"}}>
      <div className="container">
      <Card>
            <Card.Body>
              <Card.Title style={{ margin: "25px", fontFamily: "MyCustomFont, sans-serif", fontSize: "34px" }}>Create New Reservation</Card.Title>
        <Form onSubmit={handleSubmit}>
          <div className="row">
            {/* Left Column */}
            <div className="col-md-6">
              <Form.Control
                type="text"
                name="travelerName"
                value={formData.travelerName}
                onChange={handleChange}
                placeholder="Traveler Name"
                required
              /><br />
              <Form.Control
                type="text"
                name="nic"
                value={formData.nic}
                onChange={handleChange}
                placeholder="NIC"
                required
              /><br />
              <Form.Control
                type="date"
                name="reservationDate"
                value={formData.reservationDate}
                onChange={handleChange}
                required
              /><br />
              <Form.Group controlId="TrainID">
          <Form.Select
            name="TrainID"
            value={formData.TrainID}
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
              <br />
              <Form.Control
                type="text"
                name="departureLocation"
                value={formData.departureLocation}
                onChange={handleChange}
                placeholder="Departure Location"
                required
              /><br />
              <Form.Control
                type="text"
                name="destinationLocation"
                value={formData.destinationLocation}
                onChange={handleChange}
                placeholder="Destination Location"
                required
              /><br />
            </div>

            {/* Right Column */}
            <div className="col-md-6">
            <Form.Group controlId="numPassengers">
  <Form.Control
    as="select"
    name="numPassengers"
    value={formData.numPassengers}
    onChange={handleChange}
    required
  >
    <option value="" disabled>Number of Passengers</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
  </Form.Control>
</Form.Group>

              <br />
              <Form.Control
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Age"
                required
              /><br />
              <Form.Group controlId="ticketClass">
  <Form.Control
    as="select"
    name="ticketClass"
    value={formData.ticketClass}
    onChange={handleChange}
    required
  >
    <option value="" disabled>Ticket Class</option>
    <option value="A">A</option>
    <option value="B">B</option>
    <option value="C">C</option>
  </Form.Control>
  </Form.Group>
              <br />
              <Form.Control
                type="text"
                name="seatSelection"
                value={formData.seatSelection}
                onChange={handleChange}
                placeholder="Seat Selection"
                required
              /><br />
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              /><br />
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                required
              /><br />
            </div>
          </div>

          <div className="text-center" style={{margin: "34px"}}>
            <Button variant="secondary" onClick={() => window.history.back()} style={{ width: '150px' }}>Back</Button>{' '}
            <Button type="submit" variant="primary" style={{ width: '150px' }}>Submit</Button>
          </div>
        </Form>
        </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default AddTrainTicketBooking;
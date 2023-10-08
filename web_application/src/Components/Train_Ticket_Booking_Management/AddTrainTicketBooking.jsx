import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { Form, Button, Card, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const AddTrainTicketBooking = () => {
  const { userId } = useContext(AuthContext);
  const [trainData, setTrainData] = useState([]);
  const [formData, setFormData] = useState({
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
    axios.get('http://localhost:57549/api/trains/getalltrains')
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

  console.log('Form Data:', formData); // Add this line
  console.log('UserID:', formData.UserID); // Add this line
  console.log('TrainName:', formData.TrainName); // Add this line

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

    // if (!isValidEmail(formData.Email)) {
    //   alert('Invalid Email. Please enter a valid Email address.');
    //   return;
    // }

    // if (!isValidContactNumber(formData.Email)) {
    //   alert('Invalid contact number. Please enter a 10-digit Email number.');
    //   return;
    // }

    // if (!isValidNIC(formData.nic)) {
    //   alert('Invalid NIC. Please enter a valid NIC number.');
    //   return;
    // }

  // const ReservationDate = new Date(formData.ReservationDate);
  // const BookingDate = new Date(getCurrentDate());

  // const differenceInMilliseconds = ReservationDate - BookingDate;

  // const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

  // if (differenceInDays >= 30) {
  //   alert("Reservation date must be within 30 days of booking date.");
  //   return;
  // }

    setFormData({
      ...formData,
      BookingDate: getCurrentDate()
    });
  
    axios.post('http://localhost:57549/api/trainbooking/createticketbooking', formData)
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
                name="MainPassengerName"
                value={formData.MainPassengerName}
                onChange={handleChange}
                placeholder="Traveler Name"
                required
              /><br />
              
              <Form.Control
                type="date"
                name="ReservationDate"
                value={formData.ReservationDate}
                onChange={handleChange}
                required
              /><br />
              <Form.Group controlId="TrainName">
          <Form.Select
            name="TrainName"
            value={formData.TrainName}
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
              <br />
              <Form.Control
                type="text"
                name="TotalPrice"
                value={formData.TotalPrice}
                onChange={handleChange}
                placeholder='Total Price'
                required
              /><br />
              
            </div>

            {/* Right Column */}
            <div className="col-md-6">
            <Form.Group controlId="TotalPassengers">
  <Form.Control
    as="select"
    name="TotalPassengers"
    value={formData.TotalPassengers}
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
              
              <Form.Group controlId="TicketClass">
  <Form.Control
    as="select"
    name="TicketClass"
    value={formData.TicketClass}
    onChange={handleChange}
    required
  >
    <option value="" disabled>Ticket Class</option>
    <option value="First Class">First Class</option>
    <option value="Second Class">Second Class</option>
    <option value="Third Class">Third Class</option>
  </Form.Control>
  </Form.Group>
              <br />
              
              <Form.Control
                type="Email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                placeholder="Email"
                required
              /><br />
              <Form.Control
                type="text"
                name="ContactNumber"
                value={formData.ContactNumber}
                onChange={handleChange}
                placeholder="Contact Number"
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
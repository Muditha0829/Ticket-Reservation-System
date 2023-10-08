import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const AddTrainShedule = () => {
  const { userID } = useContext(AuthContext);
  const [trainData, setTrainData] = useState({
    TrainNumber: '',
    userID: userID,
    TrainName: '',
    TrainDriver: '',
    DepartureStation: '', // Added
    ArrivalStation: '', // Added
    DepartureTime: '', // Changed to string for input type compatibility
    ArrivalTime: '', // Changed to string for input type compatibility
    TrainType: '', // Added
    FirstClassTicketPrice: '', // Added
    SecondClassTicketPrice: '', // Added
    ThirdClassTicketPrice: '', // Added
    TrainStatus: 'Active',
  });

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrainData({
      ...trainData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const TrainIDPattern = /^[A-Z]\d{4}$/;

    if (!TrainIDPattern.test(trainData.TrainNumber)) {
      alert('Invalid Train Number. Please enter a valid Train Number format (TXXXX).');
      return;
    }
    axios.post('http://localhost:57549/api/trains/createtrain', trainData)
      .then(response => {
        console.log('Train added:', response.data);
        alert("Train Added");
        history.push('/backofficeuserdashboard');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <Container className="text-center mt-5" style={{paddingLeft: "250px"}}>
      <Row className="justify-content-center">
        <Col xs={6}>
          <Card>
            <Card.Body>
              <Card.Title style={{ margin: "25px", fontFamily: "MyCustomFont, sans-serif", fontSize: "34px" }}>Create New Train Schedule</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="TrainID">
                  <Form.Label>Train Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="TrainNumber"
                    value={trainData.TrainNumber}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="trainName">
                  <Form.Label>Train Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="TrainName"
                    value={trainData.TrainName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="trainDriver">
                  <Form.Label>Train Driver</Form.Label>
                  <Form.Control
                    type="text"
                    name="TrainDriver"
                    value={trainData.TrainDriver}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="departureStation">
                  <Form.Label>Departure Station</Form.Label>
                  <Form.Control
                    type="text"
                    name="DepartureStation"
                    value={trainData.DepartureStation}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="arrivalStation">
                  <Form.Label>Arrival Station</Form.Label>
                  <Form.Control
                    type="text"
                    name="ArrivalStation"
                    value={trainData.ArrivalStation}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="departureTime">
                  <Form.Label>Departure Time</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="DepartureTime"
                    value={trainData.DepartureTime}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="arrivalTime">
                  <Form.Label>Arrival Time</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="ArrivalTime"
                    value={trainData.ArrivalTime}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="trainType">
                  <Form.Label>Train Type</Form.Label>
                  <Form.Control
                    type="text"
                    name="TrainType"
                    value={trainData.TrainType}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="firstClassTicketPrice">
                  <Form.Label>First Class Ticket Price</Form.Label>
                  <Form.Control
                    type="text"
                    name="FirstClassTicketPrice"
                    value={trainData.FirstClassTicketPrice}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="secondClassTicketPrice">
                  <Form.Label>Second Class Ticket Price</Form.Label>
                  <Form.Control
                    type="text"
                    name="SecondClassTicketPrice"
                    value={trainData.SecondClassTicketPrice}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="thirdClassTicketPrice">
                  <Form.Label>Third Class Ticket Price</Form.Label>
                  <Form.Control
                    type="text"
                    name="ThirdClassTicketPrice"
                    value={trainData.ThirdClassTicketPrice}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Row className="justify-content-center">
                  <Col xs="auto" style={{ margin: "34px" }}>
                    <Button variant="secondary" onClick={() => window.history.back()} style={{ width: '150px' }}>Back</Button>{' '}
                    <Button type="submit" variant="primary" style={{ width: '150px', backgroundColor: "#003300" }}>Submit</Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddTrainShedule;
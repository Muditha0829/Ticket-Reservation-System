import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const AddTrain = ({ userID }) => {
  const { userId } = useContext(AuthContext);
  const [trainData, setTrainData] = useState({
    TrainID: '',
    UserID: userId,
    TrainName: '',
    TrainDriver: '',
    DeDateTime: '',
    ArDateTime: '',
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

    const trainIdPattern = /^[A-Z]\d{4}$/;

  if (!trainIdPattern.test(trainData.TrainID)) {
    alert('Invalid Train ID. Please enter a valid Train ID (e.g., T1234).');
    return;
  }
    axios.post('api/trains/create', trainData)
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
    <Container className="text-center mt-5">
      <Row className="justify-content-center">
        <Col xs={6}>
        <Card>
            <Card.Body>
              <Card.Title style={{ margin: "25px", fontFamily: "MyCustomFont, sans-serif", fontSize: "34px" }}>Create New Train Shedule</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="trainID">
              <Form.Label>Train ID</Form.Label>
              <Form.Control
                type="text"
                name="TrainID"
                value={trainData.TrainID}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="trainName">
              <Form.Label>Train Name</Form.Label>
              <Form.Control
                type="text"
                name="TrainName"
                value={trainData.TrainName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="driver">
              <Form.Label>TrainDriver</Form.Label>
              <Form.Control
                type="text"
                name="TrainDriver"
                value={trainData.TrainDriver}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="departureTime">
              <Form.Label>Departure Time</Form.Label>
              <Form.Control
                type="datetime-local"
                name="DeDateTime"
                value={trainData.DeDateTime}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="arrivalTime">
              <Form.Label>Arrival Time</Form.Label>
              <Form.Control
                type="datetime-local"
                name="ArDateTime"
                value={trainData.ArDateTime}
                onChange={handleChange}
              />
            </Form.Group>
            <Row className="justify-content-center">
              <Col xs="auto" style={{margin: "34px"}}>
              <Button variant="secondary" onClick={() => window.history.back()} style={{ width: '150px' }}>Back</Button>{' '}
            <Button type="submit" variant="primary" style={{ width: '150px', backgroundColor: "#848014" }}>Submit</Button>
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

export default AddTrain;
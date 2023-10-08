import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const UpdateTrainShedule = () => {
  const { TrainID } = useParams();
  const [TraingId, setTrainID] = useState('');
  const [updatedTrainData, setUpdatedTrainData] = useState({
    // TrainID: '',
    // userID: '',
    TrainNumber: '',
    TrainName: '',
    TrainDriver: '',
    DepartureStation: '',
    ArrivalStation: '',
    DepartureTime: '',
    ArrivalTime: '',
    TrainType: '',
    FirstClassTicketPrice: '',
    SecondClassTicketPrice: '',
    ThirdClassTicketPrice: '',
    TrainStatus: ''
  });

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTrainData({
      ...updatedTrainData,
      [name]: value,
    });
  };

  const handleTrainIDChange = (e) => {
    setTrainID(e.target.value);
};

  const handleSubmit = (e) => {
    e.preventDefault();

  //   const TrainIDPattern = /^[A-Z]\d{4}$/;

  // if (!TrainIDPattern.test(updatedTrainData.TrainNumber)) {
  //   alert('Invalid Train Number. Please enter a valid Train Number format. (TXXXX).');
  //   return;
  // }

    axios.put(`http://localhost:57549/api/trains/updatetrain/${TrainID}`, updatedTrainData)
      .then(response => {
        console.log('Train updated:', response.data);
        alert('Train updated successfully!');
        history.push('/backofficeuserdashboard');
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error updating train. Please try again later.');
      });
  };

  useEffect(() => {
    // Fetch data based on TrainID
    if (TrainID) {
      axios.get(`http://localhost:57549/api/trains/gettrain/${TrainID}`)
        .then(response => {
          setUpdatedTrainData(response.data);
        })
        .catch(error => {
          console.error('Error fetching train data:', error);
        });
    }
  }, [TrainID]);  

  return (
    <Container className="text-center mt-5" style={{width: "700px"}}>
      <Card>
        <Card.Body>
          <Card.Title style={{ margin: "25px", fontFamily: "MyCustomFont, sans-serif", fontSize: "34px" }}>Update Train Shedule</Card.Title>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6} className="mx-auto">
            <Form.Label>Train Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Train Number"
              value={updatedTrainData.TrainNumber}
              onChange={handleTrainIDChange}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6} className="mx-auto">
            <Form.Label>Train Name</Form.Label>
            <Form.Control
              type="text"
              name="TrainName"
              placeholder="Train Name"
              value={updatedTrainData.TrainName}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6} className="mx-auto">
            <Form.Label>Train Driver</Form.Label>
            <Form.Control
              type="text"
              name="TrainDriver"
              placeholder="Train Driver"
              value={updatedTrainData.TrainDriver}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6} className="mx-auto">
            <Form.Label>Departure Station</Form.Label>
            <Form.Control
              type="text"
              name="DepartureStation"
              placeholder="Departure Station"
              value={updatedTrainData.DepartureStation}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6} className="mx-auto">
            <Form.Label>Arrival Station</Form.Label>
            <Form.Control
              type="text"
              name="ArrivalStation"
              placeholder="Arrival Station"
              value={updatedTrainData.TrainDriver}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6} className="mx-auto">
            <Form.Label>Departure Time</Form.Label>
            <Form.Control
              type="datetime-local"
              name="DeDateTime"
              placeholder="Departure Time"
              value={updatedTrainData.DeDateTime}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6} className="mx-auto">
            <Form.Label>Arrival Time</Form.Label>
            <Form.Control
              type="datetime-local"
              name="ArDateTime"
              placeholder="Arrival Time"
              value={updatedTrainData.ArDateTime}
              onChange={handleChange}
            />
            </Col>
        <Row className="mb-3">
          <Col md={6} className="mx-auto">
            <Form.Label>Train Type</Form.Label>
            <Form.Control
              type="text"
              name="TrainType"
              placeholder="Train Type"
              value={updatedTrainData.TrainType}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6} className="mx-auto">
            <Form.Label>First Class Ticket Price</Form.Label>
            <Form.Control
              type="text"
              name="FirstClassTicketPrice"
              placeholder="First Class Ticket Price"
              value={updatedTrainData.FirstClassTicketPrice}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6} className="mx-auto">
            <Form.Label>Second Class Ticket Price</Form.Label>
            <Form.Control
              type="text"
              name="SecondClassTicketPrice"
              placeholder="Second Class Ticket Price"
              value={updatedTrainData.SecondClassTicketPrice}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6} className="mx-auto">
            <Form.Label>Third Class Ticket Price</Form.Label>
            <Form.Control
              type="text"
              name="ThirdClassTicketPrice"
              placeholder="Third Class Ticket Price"
              value={updatedTrainData.ThirdClassTicketPrice}
              onChange={handleChange}
            />
          </Col>
        </Row>

        </Row>
        <Row className="mb-3">
  <Col md={6} className="mx-auto">
    <Form.Label>Train Status</Form.Label>
    <Form.Select
      name="TrainStatus"
      value={updatedTrainData.TrainStatus}
      onChange={handleChange}
    >
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
    </Form.Select>
  </Col>
</Row>
        <Row className="mb-3">
          <Col md={6} className="mx-auto" style={{margin: "34px"}}>
            <Button variant="secondary" onClick={() => window.history.back()} style={{ width: '150px' }}>Back</Button>{' '}
            <Button variant="primary" type="submit" style={{ width: '150px' }}>Update Train</Button>
          </Col>
        </Row>
      </Form>
      </Card.Body>
      </Card>
    </Container>
  );
};

export default UpdateTrainShedule;
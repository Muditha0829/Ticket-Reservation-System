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
    <Container className="text-center mt-5" style={{width: "1200px", paddingLeft: "250px"}}>
      <Row className="justify-content-center">
        <Col>
          <Card style={{ background: 'rgba(255, 255, 255, 0.7)', border: 'none' }}>
            <Card.Body>
              <Card.Title style={{ margin: "25px", fontFamily: "Dela Gothic One", fontSize: "34px" }}>Create New Train Schedule</Card.Title>
              <Form onSubmit={handleSubmit}>
              <div className="row">
  <div className="col-md-6" style={{textAlign: "left"}}>
                <Form.Group controlId="TrainID" style={{fontSize: "17px", fontFamily: "Montserrat"}}>
                  <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Train Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="TrainNumber"
                    style={{fontFamily: "Onest"}}
                    value={trainData.TrainNumber}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <br/>
                <Form.Group controlId="trainName" style={{fontSize: "17px", fontFamily: "Montserrat"}}>
                  <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Train Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="TrainName"
                    style={{fontFamily: "Onest"}}
                    value={trainData.TrainName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <br/>
                <Form.Group controlId="trainDriver" style={{fontSize: "17px", fontFamily: "Montserrat"}}>
                  <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Train Driver</Form.Label>
                  <Form.Control
                    type="text"
                    name="TrainDriver"
                    style={{fontFamily: "Onest"}}
                    value={trainData.TrainDriver}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <br/>
                <Form.Group controlId="departureStation" style={{fontSize: "17px", fontFamily: "Montserrat"}}>
                  <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Departure Station</Form.Label>
                  <Form.Control
                    type="text"
                    name="DepartureStation"
                    style={{fontFamily: "Onest"}}
                    value={trainData.DepartureStation}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <br/>
                <Form.Group controlId="arrivalStation" style={{fontSize: "17px", fontFamily: "Montserrat"}}>
                  <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Arrival Station</Form.Label>
                  <Form.Control
                    type="text"
                    name="ArrivalStation"
                    style={{fontFamily: "Onest"}}
                    value={trainData.ArrivalStation}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <br/>
                <Form.Group controlId="trainStatus" style={{fontSize: "17px", fontFamily: "Montserrat"}}>
                  <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Train Status</Form.Label>
                  <Form.Control
                    type="text"
                    name="trainStatus"
                    style={{fontFamily: "Onest"}}
                    value="Active"
                    onChange={handleChange}
                    required
                    disabled
                  />
                </Form.Group>
                <br/>
                </div>
                <div className="col-md-6" style={{textAlign: "left"}}>
                <Form.Group controlId="departureTime" style={{fontSize: "17px", fontFamily: "Montserrat"}}>
                  <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Departure Time</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="DepartureTime"
                    style={{fontFamily: "Onest"}}
                    value={trainData.DepartureTime}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <br/>
                <Form.Group controlId="arrivalTime" style={{fontSize: "17px", fontFamily: "Montserrat"}}>
                  <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Arrival Time</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="ArrivalTime"
                    style={{fontFamily: "Onest"}}
                    value={trainData.ArrivalTime}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <br/>

                <Form.Group controlId="trainType" style={{fontSize: "17px", fontFamily: "Montserrat"}}>
                  <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Train Type</Form.Label>
                  <Form.Control
                    type="text"
                    name="TrainType"
                    style={{fontFamily: "Onest"}}
                    value={trainData.TrainType}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <br/>
                <Form.Group controlId="firstClassTicketPrice" style={{fontSize: "17px", fontFamily: "Montserrat"}}>
                  <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>First Class Ticket Price</Form.Label>
                  <Form.Control
                    type="text"
                    name="FirstClassTicketPrice"
                    style={{fontFamily: "Onest"}}
                    value={trainData.FirstClassTicketPrice}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <br/>
                <Form.Group controlId="secondClassTicketPrice" style={{fontSize: "17px", fontFamily: "Montserrat"}}>
                  <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Second Class Ticket Price</Form.Label>
                  <Form.Control
                    type="text"
                    name="SecondClassTicketPrice"
                    value={trainData.SecondClassTicketPrice}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <br/>
                <Form.Group controlId="thirdClassTicketPrice" style={{fontSize: "17px", fontFamily: "Montserrat"}}>
                  <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Third Class Ticket Price</Form.Label>
                  <Form.Control
                    type="text"
                    name="ThirdClassTicketPrice"
                    value={trainData.ThirdClassTicketPrice}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <br/>
                </div>
                </div>
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
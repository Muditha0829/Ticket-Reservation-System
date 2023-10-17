import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { IsValidTrainNumber } from '../Validations';

const UpdateTrainShedule = () => {
  // Get TrainID from route parameters
  const { TrainID } = useParams();

  // State for storing train ID (not sure if you intended to use it, if not, you can remove it)
  const [ setTrainID] = useState('');

  // State for storing updated train data
  const [updatedTrainData, setUpdatedTrainData] = useState({
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

    // Validate Train Number format
    if (!IsValidTrainNumber(updatedTrainData.TrainNumber)) {
      toast.error('Invalid Train Number. Please enter a valid Train Number format (TXXXX).');
      return;
  }

  // Send PUT request to update train data
    axios.put(`http://pasinduperera-001-site1.atempurl.com/api/trains/updatetrain/${TrainID}`, updatedTrainData)
      .then(response => {
        console.log('Train updated:', response.data);
        toast.success('Train updated successfully!');
        setTimeout(() => {
        history.push('/trainshedulelist');
        }, 2000)
      })
      .catch(error => {
        console.error('Error:', error);
        toast.error(error.response.data.Message);
      });
  };

  // Fetch train data based on TrainID
  useEffect(() => {
    if (TrainID) {
      axios.get(`http://pasinduperera-001-site1.atempurl.com/api/trains/gettrainbyId/${TrainID}`)
        .then(response => {
          setUpdatedTrainData(response.data);
        })
        .catch(error => {
          console.error('Error fetching train data:', error);
        });
    }
  }, [TrainID]);  

  return (
    <Container className="text-center mt-5" style={{width: "1200px", paddingLeft: "250px", marginBottom: "27px"}}>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      <Card style={{ background: 'rgba(255, 255, 255, 0.7)', border: 'none' }}>
        <Card.Body>
          <Card.Title style={{ margin: "25px", fontFamily: "Dela Gothic One", fontSize: "34px" }}>Update Train Shedule</Card.Title>
      <Form onSubmit={handleSubmit}>
      <div className="row">
  <div className="col-md-6" style={{textAlign: "left"}}>
        <Row className="mb-3">
          <Col className="mx-auto">
            <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Train Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Train Number"
              style={{fontFamily: "Onest"}}
              value={updatedTrainData.TrainNumber}
              onChange={handleTrainIDChange}
              disabled
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="mx-auto">
            <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Train Name</Form.Label>
            <Form.Control
              type="text"
              name="TrainName"
              style={{fontFamily: "Onest"}}
              placeholder="Train Name"
              value={updatedTrainData.TrainName}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="mx-auto">
            <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Train Driver</Form.Label>
            <Form.Control
              type="text"
              name="TrainDriver"
              style={{fontFamily: "Onest"}}
              placeholder="Train Driver"
              value={updatedTrainData.TrainDriver}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="mx-auto">
            <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Departure Station</Form.Label>
            <Form.Control
              type="text"
              name="DepartureStation"
              style={{fontFamily: "Onest"}}
              placeholder="Departure Station"
              value={updatedTrainData.DepartureStation}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="mx-auto">
            <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Arrival Station</Form.Label>
            <Form.Control
              type="text"
              name="ArrivalStation"
              style={{fontFamily: "Onest"}}
              placeholder="Arrival Station"
              value={updatedTrainData.A}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="mx-auto">
          <Form.Group controlId="trainType" style={{fontSize: "17px", fontFamily: "Montserrat"}}>
  <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Train Type</Form.Label>
  <Form.Control
    as="select"
    name="TrainType"
    placeholder='Train Type'
    style={{fontFamily: "Onest"}}
    value={updatedTrainData.TrainType}
    onChange={handleChange}
    required
  >
    <option value="">Select Train Type</option>
    <option value="Express">Express</option>
    <option value="Intercity">Intercity</option>
    <option value="Local">Local</option>
  </Form.Control>
</Form.Group>
          </Col>
        </Row>
        
        </div>
  <div className="col-md-6" style={{textAlign: "left"}}>
  <Row className="mb-3">
          <Col className="mx-auto">
            <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Departure Time</Form.Label>
            <Form.Control
              type="datetime-local"
              style={{fontFamily: "Onest"}}
              name="DepartureTime"
              placeholder="Departure Time"
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="mx-auto">
            <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Arrival Time</Form.Label>
            <Form.Control
              type="datetime-local"
              name="ArrivalTime"
              placeholder="Arrival Time"
              style={{fontFamily: "Onest"}}
              onChange={handleChange}
            />
            </Col>
        

        <Row className="mb-3">
          <Col className="mx-auto">
            <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat", marginTop: "17px"}}>First Class Ticket Price (Rs.)</Form.Label>
            <Form.Control
              type="text"
              name="FirstClassTicketPrice"
              style={{fontFamily: "Onest"}}
              placeholder="First Class Ticket Price"
              value={updatedTrainData.FirstClassTicketPrice}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="mx-auto">
            <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Second Class Ticket Price (Rs.)</Form.Label>
            <Form.Control
              type="text"
              name="SecondClassTicketPrice"
              style={{fontFamily: "Onest"}}
              placeholder="Second Class Ticket Price"
              value={updatedTrainData.SecondClassTicketPrice}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="mx-auto">
            <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Third Class Ticket Price (Rs.)</Form.Label>
            <Form.Control
              type="text"
              name="ThirdClassTicketPrice"
              style={{fontFamily: "Onest"}}
              placeholder="Third Class Ticket Price"
              value={updatedTrainData.ThirdClassTicketPrice}
              onChange={handleChange}
            />
          </Col>
        </Row>

        </Row>
        <Row className="mb-3">
  <Col className="mx-auto">
    <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Train Status</Form.Label>
    <Form.Select
      name="TrainStatus"
      placeholder='Train Status'
      style={{fontFamily: "Onest"}}
      value={updatedTrainData.TrainStatus}
      onChange={handleChange}
    >
      <option value="Sheduled">Resheduled</option>
      <option value="cancelled">Cancelled</option>
    </Form.Select>
  </Col>
</Row>
</div>
        </div>
        <Row className="mb-3">
          <Col className="mx-auto" style={{margin: "34px"}}>
            <Button variant="secondary" onClick={() => window.history.back()} style={{ width: '150px' }}>Back</Button>{' '}
            <Button variant="primary" type="submit" style={{ width: '150px', backgroundColor: "#00284d" }}>Update Train</Button>
          </Col>
        </Row>
      </Form>
      </Card.Body>
      </Card>
    </Container>
  );
};

export default UpdateTrainShedule;
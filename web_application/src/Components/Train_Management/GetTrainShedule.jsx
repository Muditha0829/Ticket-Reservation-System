import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Table, Row, Col, Button, Card, Container } from 'react-bootstrap';

const GetTrainShedule = () => {
  const [train, setTrain] = useState({});
  const { TrainID } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:57549/api/trains/gettrainbyId/${TrainID}`)
      .then(response => {
        setTrain(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [TrainID]);

  return (
    <Container className="my-5 text-center" style={{ width: "1200px", paddingLeft: "250px" }}>
  <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
  <Card style={{ background: 'rgba(255, 255, 255, 0.7)', border: 'none', borderRadius: '15px', boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)' }}>
    <Card.Body>
      <Card.Title style={{ margin: "25px", fontFamily: "Dela Gothic One", fontSize: "34px" }}>View Train Schedule</Card.Title>
      <div className="mx-auto" style={{ maxWidth: '600px' }}>
        <Table striped bordered hover style={{ fontFamily: "Onest" }}>
            <tbody>
  <tr>
    <td style={{fontSize: "17px", fontFamily: "Montserrat"}}><strong>Train Number</strong></td>
    <td style={{fontFamily: "Onest"}}>{train.TrainNumber}</td>
  </tr>
  <tr>
    <td style={{fontSize: "17px", fontFamily: "Montserrat"}}><strong>Train Name</strong></td>
    <td style={{fontFamily: "Onest"}}>{train.TrainName}</td>
  </tr>
  <tr>
    <td style={{fontSize: "17px", fontFamily: "Montserrat"}}><strong>Train Driver</strong></td>
    <td style={{fontFamily: "Onest"}}>{train.TrainDriver}</td>
  </tr>
  <tr>
    <td style={{fontSize: "17px", fontFamily: "Montserrat"}}><strong>Departure Station</strong></td>
    <td style={{fontFamily: "Onest"}}>{train.DepartureStation}</td>
  </tr>
  <tr>
    <td style={{fontSize: "17px", fontFamily: "Montserrat"}}><strong>Arrival Station</strong></td>
    <td style={{fontFamily: "Onest"}}>{train.ArrivalStation}</td>
  </tr>
  <tr>
    <td style={{fontSize: "17px", fontFamily: "Montserrat"}}><strong>Departure Time</strong></td>
    <td style={{fontFamily: "Onest"}}>{train.DepartureTime}</td>
  </tr>
  <tr>
    <td style={{fontSize: "17px", fontFamily: "Montserrat"}}><strong>Arrival Time</strong></td>
    <td style={{fontFamily: "Onest"}}>{train.ArrivalTime}</td>
  </tr>
  <tr>
    <td style={{fontSize: "17px", fontFamily: "Montserrat"}}><strong>Train Type</strong></td>
    <td style={{fontFamily: "Onest"}}>{train.TrainType}</td>
  </tr>
  <tr>
    <td style={{fontSize: "17px", fontFamily: "Montserrat"}}><strong>First Class Ticket Price</strong></td>
    <td style={{fontFamily: "Onest"}}>{train.FirstClassTicketPrice}</td>
  </tr>
  <tr>
    <td style={{fontSize: "17px", fontFamily: "Montserrat"}}><strong>Second Class Ticket Price</strong></td>
    <td style={{fontFamily: "Onest"}}>{train.SecondClassTicketPrice}</td>
  </tr>
  <tr>
    <td style={{fontSize: "17px", fontFamily: "Montserrat"}}><strong>Third Class Ticket Price</strong></td>
    <td style={{fontFamily: "Onest"}}>{train.ThirdClassTicketPrice}</td>
  </tr>
  <tr>
    <td style={{fontSize: "17px", fontFamily: "Montserrat"}}><strong>Status</strong></td>
    <td style={{fontFamily: "Onest"}}>{train.TrainStatus}</td>
  </tr>
</tbody>
</Table>
        <Row className="justify-content-center" style={{ margin: '25px' }}>
          <Col xs="auto">
            <Button variant="secondary" onClick={() => window.history.back()} style={{ width: '150px', backgroundColor: '#00284d', fontFamily: "Montserrat" }}>Back</Button>{' '}
          </Col>
        </Row>
      </div>
    </Card.Body>
  </Card>
</Container>
  );
};

export default GetTrainShedule;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Table, Row, Col, Button, Card, Container } from 'react-bootstrap';

const GetTrainShedule = () => {
  const [train, setTrain] = useState({});
  const { TrainID } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:57549/api/trains/gettrain/${TrainID}`)
      .then(response => {
        setTrain(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [TrainID]);

  return (
    <Container className="my-5 text-center" style={{width: "470px"}}>
      <Card>
        <Card.Body>
          <Card.Title style={{ margin: "25px", fontFamily: "MyCustomFont, sans-serif", fontSize: "34px" }}>View Train Shedule</Card.Title>
          <div className="mx-auto" style={{ maxWidth: '600px' }}>
            <Table striped bordered hover>
            <tbody>
  <tr>
    <td><strong>Train Number</strong></td>
    <td>{train.TrainNumber}</td>
  </tr>
  <tr>
    <td><strong>Train Name</strong></td>
    <td>{train.TrainName}</td>
  </tr>
  <tr>
    <td><strong>Train Driver</strong></td>
    <td>{train.TrainDriver}</td>
  </tr>
  <tr>
    <td><strong>Departure Station</strong></td>
    <td>{train.DepartureStation}</td>
  </tr>
  <tr>
    <td><strong>Arrival Station</strong></td>
    <td>{train.ArrivalStation}</td>
  </tr>
  <tr>
    <td><strong>Departure Time</strong></td>
    <td>{train.DepartureTime}</td>
  </tr>
  <tr>
    <td><strong>Arrival Time</strong></td>
    <td>{train.ArrivalTime}</td>
  </tr>
  <tr>
    <td><strong>Train Type</strong></td>
    <td>{train.TrainType}</td>
  </tr>
  <tr>
    <td><strong>First Class Ticket Price</strong></td>
    <td>{train.FirstClassTicketPrice}</td>
  </tr>
  <tr>
    <td><strong>Second Class Ticket Price</strong></td>
    <td>{train.SecondClassTicketPrice}</td>
  </tr>
  <tr>
    <td><strong>Third Class Ticket Price</strong></td>
    <td>{train.ThirdClassTicketPrice}</td>
  </tr>
  <tr>
    <td><strong>Status</strong></td>
    <td>{train.TrainStatus}</td>
  </tr>
</tbody>
            </Table>
            <Row className="justify-content-center" style={{ margin: '25px' }}>
              <Col xs="auto">
                <Button variant="secondary" onClick={() => window.history.back()} style={{ width: '150px' }}>Back</Button>{' '}
              </Col>
            </Row>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default GetTrainShedule;
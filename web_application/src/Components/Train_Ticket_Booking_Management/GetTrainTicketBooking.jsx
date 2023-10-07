import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, Table, Row, Col, Button } from 'react-bootstrap';

const GetTrainTicketBooking = () => {
  const [reservation, setReservation] = useState(null);
  const { reservationID } = useParams();

  useEffect(() => {
    if (reservationID) {
      axios.get(`/api/reservations/get/${reservationID}`)
        .then(response => {
          setReservation(response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.error('Error fetching reservation:', error);
        });
    }
  }, [reservationID]);

  if (!reservation) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-center p-4">
  <Card className="mx-auto" style={{ maxWidth: '800px', borderRadius: '10px' }}>
  <Card.Title style={{ margin: "25px", fontFamily: "MyCustomFont, sans-serif", fontSize: "34px" }}>View Reservation</Card.Title>
    <Card.Body>
      <Table striped bordered hover>
        <tbody>
          <tr>
            <td className="text"><strong>Traveler Name</strong></td>
            <td>{reservation.TravelerName}</td>
          </tr>
          <tr>
            <td className="text"><strong>NIC</strong></td>
            <td>{reservation.NIC}</td>
          </tr>
          <tr>
            <td className="text"><strong>Train ID</strong></td>
            <td>{reservation.TrainID}</td>
          </tr>
          <tr>
            <td className="text"><strong>Reservation Date</strong></td>
            <td>{reservation.ReservationDate}</td>
          </tr>
          <tr>
            <td className="text"><strong>Departure Location</strong></td>
            <td>{reservation.DepartureLocation}</td>
          </tr>
          <tr>
            <td className="text"><strong>Destination Location</strong></td>
            <td>{reservation.DestinationLocation}</td>
          </tr>
          <tr>
            <td className="text"><strong>Number of Passengers</strong></td>
            <td>{reservation.NumPassengers}</td>
          </tr>
          <tr>
            <td className="text"><strong>Age</strong></td>
            <td>{reservation.Age}</td>
          </tr>
          <tr>
            <td className="text"><strong>Ticket Class</strong></td>
            <td>{reservation.TicketClass}</td>
          </tr>
          <tr>
            <td className="text"><strong>Seat Selection</strong></td>
            <td>{reservation.SeatSelection}</td>
          </tr>
          <tr>
            <td className="text"><strong>Email</strong></td>
            <td>{reservation.Email}</td>
          </tr>
          <tr>
            <td className="text"><strong>Phone</strong></td>
            <td>{reservation.Phone}</td>
          </tr>
        </tbody>
      </Table>
    </Card.Body>
    <Row className="justify-content-center" style={{margin: "25px"}}>
              <Col xs="auto">
              <Button variant="secondary" onClick={() => window.history.back()} style={{ width: '150px' }}>Back</Button>{' '}
              </Col>
            </Row>
  </Card>
</div>
  );
};

export default GetTrainTicketBooking;
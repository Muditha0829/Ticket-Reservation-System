import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, Table, Row, Col, Button } from 'react-bootstrap';

const GetTrainTicketBooking = () => {
  const [reservation, setReservation] = useState(null);
  const { BookingID } = useParams();

  useEffect(() => {
    if (BookingID) {
      axios.get(`http://localhost:57549/api/trainbooking/getticketbooking/${BookingID}`)
        .then(response => {
          setReservation(response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.error('Error fetching reservation:', error);
        });
    }
  }, [BookingID]);

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
            <td className="text"><strong>Main Passenger Name</strong></td>
            <td>{reservation.MainPassengerName}</td>
          </tr>
          <tr>
            <td className="text"><strong>Booking Date</strong></td>
            <td>{reservation.BookingDate}</td>
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
            <td className="text"><strong>Total Passengers</strong></td>
            <td>{reservation.TotalPassengers}</td>
          </tr>
          <tr>
            <td className="text"><strong>Ticket Class</strong></td>
            <td>{reservation.TicketClass}</td>
          </tr>
          <tr>
            <td className="text"><strong>Email</strong></td>
            <td>{reservation.Email}</td>
          </tr>
          <tr>
            <td className="text"><strong>Contact Number</strong></td>
            <td>{reservation.ContactNumber}</td>
          </tr>
          <tr>
            <td className="text"><strong>Total Price</strong></td>
            <td>{reservation.TotalPrice}</td>
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
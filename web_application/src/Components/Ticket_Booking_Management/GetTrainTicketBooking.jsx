import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card, Table, Row, Col, Button, Container } from 'react-bootstrap';

const GetTrainTicketBooking = () => {
  // Fetching the reservation details based on BookingID from the API
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

  // Rendering a loading message while waiting for reservation data
  if (!reservation) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="my-5 text-center" style={{ paddingLeft: "250px" }}>
  <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
  <Card style={{ background: 'rgba(255, 255, 255, 0.7)', border: 'none', borderRadius: '15px', boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)' }}>
    <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    <Card.Title style={{ margin: "25px", fontFamily: "Dela Gothic One", fontSize: "34px" }}>View Train Booking</Card.Title>
    <Card.Body>
      <Table striped bordered hover>
        <tbody>
          <tr>
            <td className="text" style={{fontSize: "17px", fontFamily: "Montserrat"}}><strong>Main Passenger Name</strong></td>
            <td style={{fontFamily: "Onest"}}>{reservation.MainPassengerName}</td>
          </tr>
          <tr>
            <td className="text" style={{fontSize: "17px", fontFamily: "Montserrat"}}><strong>Booking Date</strong></td>
            <td style={{fontFamily: "Onest"}}>{reservation.FormattedBookingDate}</td>
          </tr>
          <tr>
            <td className="text" style={{fontSize: "17px", fontFamily: "Montserrat"}}><strong>Train Name</strong></td>
            <td style={{fontFamily: "Onest"}}>{reservation.TrainName}</td>
          </tr>
          <tr>
            <td className="text" style={{fontSize: "17px", fontFamily: "Montserrat"}}><strong>Reservation Date</strong></td>
            <td style={{fontFamily: "Onest"}}>{reservation.FormattedReservationDate}</td>
          </tr>
          <tr>
            <td className="text" style={{fontSize: "17px", fontFamily: "Montserrat"}}><strong>Departure Station</strong></td>
            <td style={{fontFamily: "Onest"}}>{reservation.DepartureStation}</td>
          </tr>
          <tr>
            <td className="text" style={{fontSize: "17px", fontFamily: "Montserrat"}}><strong>Destination Station</strong></td>
            <td style={{fontFamily: "Onest"}}>{reservation.DestinationStation}</td>
          </tr>
          <tr>
            <td className="text" style={{fontSize: "17px", fontFamily: "Montserrat"}}><strong>Total Passengers</strong></td>
            <td style={{fontFamily: "Onest"}}>{reservation.TotalPassengers}</td>
          </tr>
          <tr>
            <td className="text" style={{fontSize: "17px", fontFamily: "Montserrat"}}><strong>Ticket Class</strong></td>
            <td style={{fontFamily: "Onest"}}>{reservation.TicketClass}</td>
          </tr>
          <tr>
            <td className="text" style={{fontSize: "17px", fontFamily: "Montserrat"}}><strong>Email</strong></td>
            <td style={{fontFamily: "Onest"}}>{reservation.Email}</td>
          </tr>
          <tr>
            <td className="text" style={{fontSize: "17px", fontFamily: "Montserrat"}}><strong>Contact Number</strong></td>
            <td style={{fontFamily: "Onest"}}>{reservation.ContactNumber}</td>
          </tr>
          <tr>
            <td className="text" style={{fontSize: "17px", fontFamily: "Montserrat"}}><strong>Total Price (Rs.)</strong></td>
            <td style={{fontFamily: "Onest"}}>{reservation.TotalPrice}</td>
          </tr>
        </tbody>
      </Table>
    </Card.Body>
    <Row className="justify-content-center" style={{ margin: "25px" }}>
              <Col xs="auto">
              <Button variant="secondary" onClick={() => window.history.back()} style={{ width: '150px', backgroundColor: "#00284d" }}>Back</Button>{' '}
              </Col>
            </Row>
  </Card>
  </Container>
  );
};

export default GetTrainTicketBooking;
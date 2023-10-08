import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Table, Button, Card, Container } from 'react-bootstrap';

const GetAllTrainTicketBooking = () => {
  const { userId, setUser } = useContext(AuthContext);

  const [reservations, setReservations] = useState([]);
  const [cancellationLoading, setCancellationLoading] = useState(false);

  const handleCancel = (id, ReservationDate, BookingDate) => {
    const ReservationDateObj = new Date(ReservationDate);
    const BookingDateObj = new Date(BookingDate);
  
    const differenceInMilliseconds = ReservationDateObj - BookingDateObj;
  
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
  
    if (differenceInDays < 5) {
      alert("Cancellation is allowed only if reservation date is within 5 days of booking date.");
      return;
    }
  
    setCancellationLoading(true);
    axios.put(`http://localhost:57549/api/trainbooking/cancelticketbooking/${id}`)
      .then(response => {
        console.log(`Booking with ID ${id} has been cancelled.`);
        setReservations(prevReservations => prevReservations.filter(res => res.ID !== id));
        alert("Reservation has been cancelled.");
        window.location.href="#"
      })
      .catch(error => {
        alert("Cancellation is allowed only if reservation date is within 5 days of booking date.");
      })
      .finally(() => {
        setCancellationLoading(false);
      });
  };  

  useEffect(() => {
    const saveduserID = Cookies.get('userID');

    if (!userId && saveduserID) {
      setUser(saveduserID);
    }
    if (userId) {
      axios.get(`http://localhost:57549/api/trainbooking/getallticketbookings/${userId}`)
        .then(response => {
          setReservations(response.data);
          localStorage.setItem('reservations', JSON.stringify(response.data)); // Store data in localStorage
        })
        .catch(error => {
          console.error('Error fetching reservations:', error);
        });
    } else {
      // Retrieve data from localStorage
      const savedReservations = JSON.parse(localStorage.getItem('reservations'));
      if (savedReservations) {
        setReservations(savedReservations);
      }
    }
  }, [userId, setUser]);

  return (
    <Container className="text-center mt-5" style={{height: "700px", paddingLeft: "250px"}}>
      <Card>
            <Card.Body>
              <Card.Title style={{ margin: "25px", fontFamily: "MyCustomFont, sans-serif", fontSize: "34px" }}>You Reservations</Card.Title>
  <Table striped bordered hover style={{ marginTop: '20px', width:"75%" }} className="mx-auto">
    <thead>
      <tr>
        <th>Train Name</th>
        <th>Traveler Name</th>
        <th>Traveler NIC</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
    {reservations.map(reservation => (
  <tr key={reservation.ID}>
    <td>{reservation.TrainName}</td>
    <td>{reservation.NIC}</td>
    <td>{reservation.TravelerName}</td>
    <td>
    <Button
  variant="warning"
  as={Link}
  to={`/reservationview/${reservation.BookingID}`}
  style={{ color: 'white', marginRight: '5px', textDecoration: 'none' }}
>
  <i className="fas fa-eye"></i>
</Button>

<Button
  variant="link"
  as={Link}
  to={`/reservationupdate/${reservation.BookingID}`}
  style={{ background: 'green', color: 'white', textDecoration: 'none' }}
>
  <i className="fas fa-edit"></i>
</Button>

<Button
  variant="danger"
  onClick={() => handleCancel(reservation.BookingID, reservation.ReservationDate, reservation.BookingDate)}
  disabled={cancellationLoading}
  style={{ marginLeft: '5px' }}
>
  <i className="fas fa-trash-alt"></i>
</Button>
    </td>
  </tr>
))}
    </tbody>
  </Table>
  </Card.Body>
  </Card>
  </Container>
  );
};

export default GetAllTrainTicketBooking;
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Table, Button, Card, Container } from 'react-bootstrap';

const GetAllTrainTicketBookings = () => {
  const { userId, setUser } = useContext(AuthContext);
  const [reservations, setReservations] = useState([]);
  const [cancellationLoading, setCancellationLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reservations.slice(indexOfFirstItem, indexOfLastItem);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCancel = (id, ReservationDate, BookingDate) => {
    const ReservationDateObj = new Date(ReservationDate);
    const BookingDateObj = new Date(BookingDate);
  
    const differenceInMilliseconds = ReservationDateObj - BookingDateObj;
  
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
  
    if (differenceInDays < 5) {
      toast.error("Cancellation is allowed only if reservation date is within 5 days of booking date.");
      return;
    }
  
    setCancellationLoading(true);
    axios.put(`http://localhost:57549/api/trainbooking/cancelticketbooking/${id}`)
      .then(response => {
        console.log(`Booking with ID ${id} has been cancelled.`);
        setReservations(prevReservations => prevReservations.filter(res => res.ID !== id));
        toast.success("Reservation has been cancelled.");
        window.location.href="#"
      })
      .catch(error => {
        toast.error("Cancellation is allowed only if reservation date is within 5 days of booking date.");
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
      axios.get(`http://localhost:57549/api/trainbooking/getallticketbookings`)
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
    <Container className="text-center mt-5" style={{ height: "600px", paddingLeft: "250px", maxWidth: "1200px" }}>
  <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
  <Card style={{ background: 'rgba(255, 255, 255, 0.7)', border: 'none', borderRadius: '15px', boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)' }}>
    <Card.Body>
      <Card.Title style={{ margin: "25px", fontFamily: "Dela Gothic One", fontSize: "34px" }}>All Train Bookings</Card.Title>
      <Table striped bordered hover style={{ marginTop: '20px', width: "75%" }} className="mx-auto">
        <thead>
          <tr style={{ fontSize: "17px", fontFamily: "Montserrat" }}>
            <th>Train Name</th>
            <th>Main Passenger Name</th>
            <th>Traveler NIC</th>
            <th>Actions</th>
          </tr>
            </thead>
            <tbody>
              {currentItems.map(reservation => (
                <tr key={reservation.ID} style={{ fontFamily: "Onest" }}>
                  <td>{reservation.TrainName}</td>
                  <td>{reservation.MainPassengerName}</td>
                  <td>{reservation.NIC}</td>
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
                      style={{ background: 'green', color: 'white', textDecoration: 'none', marginRight: '5px' }}
                    >
                      <i className="fas fa-edit"></i>
                    </Button>

                    <Button
                      variant="danger"
                      onClick={() => handleCancel(reservation.BookingID, reservation.ReservationDate, reservation.BookingDate)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="pagination" style={{ textAlign: 'Right', margin: "20px", marginLeft: "40%" }}>
            <span
              onClick={() => currentPage > 1 && handlePagination(currentPage - 1)}
              className={currentPage === 1 ? 'disabled' : ''}
              style={{ margin: "0 5px", cursor: "pointer" }}
            >
              &#8249;  {/* Left arrow */}
            </span>

            {Array.from({ length: Math.ceil(reservations.length / itemsPerPage) }).map((_, index) => (
              <span
                key={index}
                onClick={() => handlePagination(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
                style={{ margin: "0 5px", cursor: "pointer" }}
              >
                {index + 1}
              </span>
            ))}

            <span
              onClick={() => currentPage < Math.ceil(reservations.length / itemsPerPage) && handlePagination(currentPage + 1)}
              className={currentPage === Math.ceil(reservations.length / itemsPerPage) ? 'disabled' : ''}
              style={{ margin: "0 5px", cursor: "pointer" }}
            >
              &#8250;  {/* Right arrow */}
            </span>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default GetAllTrainTicketBookings;
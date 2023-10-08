import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Table, Button, Card } from 'react-bootstrap';

const TravellerUser = () => {
  const { UserID } = useContext(AuthContext);
  const [traveler, setTravellers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = traveler.slice(indexOfFirstItem, indexOfLastItem);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    axios.get('http://localhost:57549/api/users/getallusers')
      .then(response => {
        setTravellers(response.data);
      })
      .catch(error => {
        console.error('Error fetching traveler:', error);
      });
  }, []);

  const handleStatusChange = (UserID, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';

    axios.put(`http://localhost:57549/api/users/updateuserstatus/${UserID}`, { UserStatus: newStatus })
      .then(response => {
        if (response.status === 200) {
          setTravellers(traveler.map(traveler =>
            traveler.UserID === UserID ? { ...traveler, UserStatus: newStatus } : traveler
          ));
          alert('Status updated successfully');
        } else {
          console.error('Error updating status:', response.data);
          alert('Failed to update status');
        }
      })
      .catch(error => {
        console.error('Error updating status:', error);
        alert('Failed to update status');
      });
  };

  return (
    <Container className="my-5 text-center" style={{height: "700px", paddingLeft: "250px"}}>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
  <Card style={{ background: 'rgba(255, 255, 255, 0.7)', border: 'none' }}>
        <Card.Body>
          <Card.Title style={{ margin: "25px", fontFamily: "Dela Gothic One", fontSize: "34px" }}>Traveler Status</Card.Title>
  <Table striped bordered hover responsive>
    <thead>
      <tr style={{fontSize: "17px", fontFamily: "Montserrat"}}>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Username</th>
        <th>NIC</th>
        <th>Email</th>
        <th>Phone Number</th>
        <th>User Type</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {traveler.map(traveler => (
        <tr key={traveler.UserID} style={{fontFamily: "Onest"}}>
          <td>{traveler.FirstName}</td>
          <td>{traveler.LastName}</td>
          <td>{traveler.UserName}</td>
          <td>{traveler.NIC}</td>
          <td>{traveler.Email}</td>
          <td>{traveler.ContactNumber}</td>
          <td>{traveler.UserType}</td>
          <td>{traveler.UserStatus}</td>
          <td>
            <Button
              variant="primary"
              onClick={() => handleStatusChange(traveler.UserID, traveler.UserStatus)}
            >
              {traveler.UserStatus === 'Active' ? 'Deactivate' : 'Activate'}
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
  <div className="pagination" style={{ textAlign: 'Right', margin: "20px", marginLeft: "40%"}}>
  <span
    onClick={() => currentPage > 1 && handlePagination(currentPage - 1)}
    className={currentPage === 1 ? 'disabled' : ''}
    style={{margin: "0 5px", cursor: "pointer"}}
  >
    &#8249;  {/* Left arrow */}
  </span>

  {Array.from({ length: Math.ceil(traveler.length / itemsPerPage) }).map((_, index) => (
    <span
      key={index}
      onClick={() => handlePagination(index + 1)}
      className={currentPage === index + 1 ? 'active' : ''}
      style={{margin: "0 5px", cursor: "pointer"}}
    >
      {index + 1}
    </span>
  ))}

  <span
    onClick={() => currentPage < Math.ceil(traveler.length / itemsPerPage) && handlePagination(currentPage + 1)}
    className={currentPage === Math.ceil(traveler.length / itemsPerPage) ? 'disabled' : ''}
    style={{margin: "0 5px", cursor: "pointer"}}
  >
    &#8250;  {/* Right arrow */}
  </span>
</div>
  </Card.Body>
  </Card>
</Container>
  );
};

export default TravellerUser;
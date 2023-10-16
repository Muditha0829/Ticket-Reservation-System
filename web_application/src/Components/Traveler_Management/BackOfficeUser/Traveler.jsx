import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Table, Button, Card } from 'react-bootstrap';

const TravellerUser = () => {
  // Retrieve UserID from the AuthContext
  const { UserID } = useContext(AuthContext);

  // State to hold the list of travelers
  const [traveler, setTravellers] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = traveler.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle pagination
  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Fetch traveler data on component mount
  useEffect(() => {
    axios.get('http://pasinduperera-001-site1.atempurl.com/api/users/getallusers')
      .then(response => {
        setTravellers(response.data);
      })
      .catch(error => {
        console.error('Error fetching traveler:', error);
      });
  }, []);

  // Function to handle status change (Activate/Deactivate)
  const handleStatusChange = (UserID, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Deactive' : 'Active';

    axios.put(`http://pasinduperera-001-site1.atempurl.com/api/users/updateuserstatus/${UserID}`, { UserStatus: newStatus })
      .then(response => {
        if (response.status === 200) {
          setTravellers(traveler.map(traveler =>
            traveler.UserID === UserID ? { ...traveler, UserStatus: newStatus } : traveler
          ));
          toast.success('Status updated successfully');
        } else {
          console.error('Error updating status:', response.data);
          toast.error('Failed to update status');
        }
      })
      .catch(error => {
        console.error('Error updating status:', error);
        toast.error('Failed to update status');
      });
  };

  return (
    <Container className="my-5 text-center" style={{ height: "570px", paddingLeft: "250px", maxWidth: "900px" }}>
  <ToastContainer position="top-center" autoClose={1000} hideProgressBar />
  <Card style={{ background: 'rgba(255, 255, 255, 0.7)', border: 'none', borderRadius: '15px', boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)' }}>
    <Card.Body>
      <Card.Title style={{ margin: "25px", fontFamily: "Dela Gothic One", fontSize: "34px" }}>Traveler Status</Card.Title>
      <Table striped bordered hover responsive>
        <thead>
          <tr style={{ fontSize: "17px", fontFamily: "Montserrat" }}>
            <th>Username</th>
            <th>NIC</th>
            <th>User Type</th>
            <th>User Status</th>
            <th>Actions</th>
          </tr>
    </thead>
    <tbody>
      {traveler.map(traveler => (
        <tr key={traveler.UserID} style={{fontFamily: "Onest"}}>
          <td>{traveler.UserName}</td>
          <td>{traveler.NIC}</td>
          <td>{traveler.UserType}</td>
          <td>{traveler.UserStatus}</td>
          <td>
          <Link to={`/viewtraveller/${traveler.UserID}`} className="mr-2">
              <Button variant="warning" style={{marginRight: "5px"}}><i className="fas fa-eye"></i></Button>
            </Link>
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
  <div className="pagination" style={{ textAlign: 'Right', margin: "20px", marginLeft: "47%" }}>
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
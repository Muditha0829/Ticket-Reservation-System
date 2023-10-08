import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';
import { Container, Table, Button, Card } from 'react-bootstrap';

const TravellerUser = () => {
  const { userID } = useContext(AuthContext);
  const [travellers, setTravellers] = useState([]);

  useEffect(() => {
    axios.get('/api/users/getall')
      .then(response => {
        setTravellers(response.data);
      })
      .catch(error => {
        console.error('Error fetching travellers:', error);
      });
  }, []);

  const handleStatusChange = (userID, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';

    axios.put(`/api/users/updatestatusbyid/${userID}`, { UserStatus: newStatus })
      .then(response => {
        if (response.status === 200) {
          setTravellers(travellers.map(traveller =>
            traveller.ID === userID ? { ...traveller, UserStatus: newStatus } : traveller
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
    <Container className="my-5 text-center" style={{height: "700px"}}>
  <Card>
        <Card.Body>
          <Card.Title style={{ margin: "25px", fontFamily: "MyCustomFont, sans-serif", fontSize: "34px" }}>Travel User List</Card.Title>
  <Table striped bordered hover responsive>
    <thead>
      <tr>
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
      {travellers.map(traveller => (
        <tr key={traveller.ID}>
          <td>{traveller.FirstName}</td>
          <td>{traveller.LastName}</td>
          <td>{traveller.UserName}</td>
          <td>{traveller.NIC}</td>
          <td>{traveller.Email}</td>
          <td>{traveller.ContactNumber}</td>
          <td>{traveller.UserType}</td>
          <td>{traveller.UserStatus}</td>
          <td>
            <Button
              variant="primary"
              onClick={() => handleStatusChange(traveller.ID, traveller.UserStatus)}
            >
              {traveller.UserStatus === 'Active' ? 'Inactivate' : 'Activate'}
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

export default TravellerUser;
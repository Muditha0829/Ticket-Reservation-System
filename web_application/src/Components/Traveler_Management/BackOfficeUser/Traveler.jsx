import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';
import { Container, Table, Button, Card } from 'react-bootstrap';

const TravellerUser = () => {
  const { UserID } = useContext(AuthContext);
  const [traveler, setTravellers] = useState([]);

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
    <Container className="my-5 text-center" style={{height: "1200px", paddingLeft: "250px"}}>
  <Card>
        <Card.Body>
          <Card.Title style={{ margin: "25px", fontFamily: "Dela Gothic One", fontSize: "34px" }}>Travel User List</Card.Title>
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
              {traveler.UserStatus === 'Active' ? 'Inactivate' : 'Activate'}
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
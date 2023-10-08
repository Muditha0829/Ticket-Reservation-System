import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Table, Row, Col, Button, Card } from 'react-bootstrap';

const GetTraveler = () => {
  const { UserID } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:57549/api/users/getuser/${UserID}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    if (UserID) {
      fetchData();
    }
  }, [UserID]);

  if (!UserID) {
    return <div>No user ID found</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="my-5 text-center" style={{paddingLeft: "250px"}}>
      <Card style={{ background: 'rgba(255, 255, 255, 0.7)', border: 'none' }}>
            <Card.Body>
  <Card.Title style={{ margin: "25px", fontFamily: "Dela Gothic One", fontSize: "34px" }}>View Travel User</Card.Title>
  <div className="text-center mb-4">
            <img src="https://th.bing.com/th/id/OIP.x7X2oAehk5M9IvGwO_K0PgHaHa?pid=ImgDet&rs=1" alt="Profile" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
          </div>
  <Table striped bordered responsive>
    <tbody>
      <tr>
        <td style={{fontSize: "17px", fontFamily: "Montserrat"}}><strong>User NIC</strong></td>
        <td style={{fontFamily: "Onest"}}>{user.NIC}</td>
      </tr>
      <tr>
        <td style={{fontSize: "17px", fontFamily: "Montserrat"}}><strong>Username</strong></td>
        <td style={{fontFamily: "Onest"}}>{user.UserName}</td>
      </tr>
      <tr>
        <td style={{fontSize: "17px", fontFamily: "Montserrat"}}><strong>First Name</strong></td>
        <td style={{fontFamily: "Onest"}}>{user.FirstName}</td>
      </tr>
      <tr>
        <td style={{fontSize: "17px", fontFamily: "Montserrat"}}><strong>Last Name</strong></td>
        <td style={{fontFamily: "Onest"}}>{user.LastName}</td>
      </tr>
      <tr>
        <td style={{fontSize: "17px", fontFamily: "Montserrat"}}><strong>Email</strong></td>
        <td style={{fontFamily: "Onest"}}>{user.Email}</td>
      </tr>
      <tr>
        <td style={{fontSize: "17px", fontFamily: "Montserrat"}}><strong>Gender</strong></td>
        <td style={{fontFamily: "Onest"}}>{user.Gender}</td>
      </tr>
      <tr>
        <td style={{fontSize: "17px", fontFamily: "Montserrat"}}><strong>Phone Number</strong></td>
        <td style={{fontFamily: "Onest"}}>{user.ContactNumber}</td>
      </tr>
      <tr>
        <td style={{fontSize: "17px", fontFamily: "Montserrat"}}><strong>User Type</strong></td>
        <td style={{fontFamily: "Onest"}}>{user.UserType}</td>
      </tr>
      <tr>
        <td style={{fontSize: "17px", fontFamily: "Montserrat"}}><strong>Status</strong></td>
        <td style={{fontFamily: "Onest"}}>{user.UserStatus}</td>
      </tr>
    </tbody>
  </Table>
  <Row className="justify-content-center" style={{margin: "25px"}}>
              <Col xs="auto">
              <Button variant="secondary" onClick={() => window.history.back()} style={{ width: '150px' }}>Back</Button>{' '}
              </Col>
            </Row>
            </Card.Body>
            </Card>
</Container>
  );
};

export default GetTraveler;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';

const UpdateTraveller = () => {
  const { userId } = useParams();
  const history = useHistory();

  const [userData, setUserData] = useState({
    UName: '',
    FName: '',
    LName: '',
    Email: '',
    CNumber: '',
    UserType: '',
  });

  useEffect(() => {
    axios.get(`/api/users/get/${userId}`)
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const phoneRegex = /^[0-9]{10}$/;

  if (!phoneRegex.test(userData.CNumber)) {
    alert('Invalid phone number. Please enter a 10-digit phone number.');
    return;
  }

    axios.put(`/api/users/updatebyid/${userId}`, userData)
      .then(response => {
        console.log('User updated:', response.data);
        alert('Travel user updated successfully!');
        history.push(`/viewtraveller/${userId}`);
        window.location.href = `/listtraveluser`;
      })
      .catch(error => {
        console.error('Error updating user:', error);
      });
  };

  return (
    <Container className="my-5 text-center" style={{width: "47%"}}>
      <Card>
            <Card.Body>
  <Card.Title style={{ margin: "25px", fontFamily: "MyCustomFont, sans-serif", fontSize: "34px" }}>Update Traveller</Card.Title>
  <div className="text-center mb-4">
            <img src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Photos.png" alt="Profile" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
          </div>
  <Form onSubmit={handleSubmit}>
    <Form.Group>
      <Form.Label>Username:</Form.Label>
      <Form.Control
        type="text"
        id="UName"
        name="UName"
        value={userData.UName}
        onChange={handleChange}
        required
      />
    </Form.Group>
    <Form.Group>
      <Form.Label>First Name:</Form.Label>
      <Form.Control
        type="text"
        id="FName"
        name="FName"
        value={userData.FName}
        onChange={handleChange}
        required
      />
    </Form.Group>
    <Form.Group>
      <Form.Label>Last Name:</Form.Label>
      <Form.Control
        type="text"
        id="LName"
        name="LName"
        value={userData.LName}
        onChange={handleChange}
        required
      />
    </Form.Group>
    <Form.Group>
      <Form.Label>Email:</Form.Label>
      <Form.Control
        type="email"
        id="Email"
        name="Email"
        value={userData.Email}
        onChange={handleChange}
        required
      />
    </Form.Group>
    <Form.Group>
      <Form.Label>Phone Number:</Form.Label>
      <Form.Control
        type="text"
        id="CNumber"
        name="CNumber"
        value={userData.CNumber}
        onChange={handleChange}
        required
      />
    </Form.Group>
    <Row className="justify-content-center" style={{margin: "25px"}}>
              <Col xs="auto">
              <Button variant="secondary" onClick={() => window.history.back()} style={{ width: '150px' }}>Back</Button>{' '}
            <Button type="submit" variant="primary" style={{ width: '150px' }}>Update</Button>
              </Col>
            </Row>
  </Form>
  </Card.Body>
  </Card>
</Container>
  );
};

export default UpdateTraveller;
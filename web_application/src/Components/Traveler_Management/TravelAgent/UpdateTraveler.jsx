import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';

const UpdateTraveller = () => {
  const { userId } = useParams();
  const history = useHistory();

  const [userData, setUserData] = useState({
    UserName: '',
    FirstName: '',
    LastName: '',
    Email: '',
    Gender: '',
    ContactNumber: '',
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

  if (!phoneRegex.test(userData.ContactNumber)) {
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
        id="UserName"
        name="UserName"
        value={userData.UserName}
        onChange={handleChange}
        required
      />
    </Form.Group>
    <Form.Group>
      <Form.Label>First Name:</Form.Label>
      <Form.Control
        type="text"
        id="FirstName"
        name="FirstName"
        value={userData.FirstName}
        onChange={handleChange}
        required
      />
    </Form.Group>
    <Form.Group>
      <Form.Label>Last Name:</Form.Label>
      <Form.Control
        type="text"
        id="LastName"
        name="LastName"
        value={userData.LastName}
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
      <Form.Label>Gender:</Form.Label>
      <Form.Control
        type="text"
        id="Gender"
        name="Gender"
        value={userData.Gender}
        onChange={handleChange}
        required
      />
    </Form.Group>
    <Form.Group>
      <Form.Label>Phone Number:</Form.Label>
      <Form.Control
        type="text"
        id="ContactNumber"
        name="ContactNumber"
        value={userData.ContactNumber}
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
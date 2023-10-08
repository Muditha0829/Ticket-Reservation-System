import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {

  const [formData, setFormData] = useState({
    NIC: '',
    UserName: '',
    FirstName: '',
    LastName: '',
    Gender: '',
    Email: '',
    Password: '',
    RePassword: '',
    ContactNumber: '',
    UserType: ''
  });

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:57549/api/users/signup', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      console.log('Success:', response.data);
      toast.success('User registered successfully!');
      history.push('/');
    })    
    .catch(error => {
      console.error('Error:', error);
      toast.error('Error registering user. Please try again.');
    });
  };

  return (
    <div>
    <Container style={{width:"75%", marginTop: "87px"}}>
      <Card style={{ background: 'rgba(255, 255, 255, 0.7)', border: 'none' }}>
        <Row>
          <Col>
          <img src='https://www.telegraph.co.uk/content/dam/travel/2023/03/10/TELEMMGLPICT000328038771_trans_NvBQzQNjv4BqqVzuuqpFlyLIwiB6NTmJwSX5rhseiWKOo9p9OQ-ymek.jpeg' style={{width: "100%", margin: "25px", height: "84%"}}/>
          </Col>
          <Col>
        <Card.Body>
        <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
        <Card.Title style={{ margin: "25px", fontFamily: "Dela Gothic One", fontSize: "34px", textAlign: "center" }}>Sign Up</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
            <Form.Group controlId="NIC" style={{marginBottom:"25px"}}>
              <Form.Control
                type="text"
                name="NIC"
                style={{fontFamily: "Montserrat"}}
                value={formData.NIC}
                onChange={handleChange}
                placeholder="NIC"
                required
              />
            </Form.Group>
            <Form.Group controlId="UserName" style={{marginBottom:"25px"}}>
              <Form.Control
                type="text"
                name="UserName"
                style={{fontFamily: "Montserrat"}}
                value={formData.UserName}
                onChange={handleChange}
                placeholder="Username"
                required
              />
            </Form.Group>
            <Form.Group controlId="FirstName" style={{marginBottom:"25px"}}>
              <Form.Control
                type="text"
                name="FirstName"
                style={{fontFamily: "Montserrat"}}
                value={formData.FirstName}
                onChange={handleChange}
                placeholder="First Name"
                required
              />
            </Form.Group>
            <Form.Group controlId="LastName" style={{marginBottom:"25px"}}>
              <Form.Control
                type="text"
                name="LastName"
                style={{fontFamily: "Montserrat"}}
                value={formData.LastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
              />
            </Form.Group>
            
            <Form.Group controlId="Email" style={{marginBottom:"25px"}}>
              <Form.Control
                type="Email"
                name="Email"
                style={{fontFamily: "Montserrat"}}
                value={formData.Email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
              
              </Form.Group>
              </Col>
            <Col>
              <Form.Group controlId="Gender" style={{marginBottom:"25px"}}>
              <Form.Control
                type="text"
                name="Gender"
                style={{fontFamily: "Montserrat"}}
                value={formData.Gender}
                onChange={handleChange}
                placeholder="Gender"
                required
              />
            </Form.Group>
            <Form.Group controlId="ContactNumber" style={{marginBottom:"25px"}}>
              <Form.Control
                type="text"
                name="ContactNumber"
                style={{fontFamily: "Montserrat"}}
                value={formData.ContactNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                required
              />
            </Form.Group>
            <Form.Group controlId="Password" style={{marginBottom:"25px"}}>
              <Form.Control
                type="password"
                name="Password"
                style={{fontFamily: "Montserrat"}}
                value={formData.Password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </Form.Group>
            <Form.Group controlId="RePassword" style={{marginBottom:"25px"}}>
              <Form.Control
                type="password"
                name="RePassword"
                style={{fontFamily: "Montserrat"}}
                value={formData.RePassword}
                onChange={handleChange}
                placeholder="Re-enter Password"
                required
              />
            </Form.Group>
            <Form.Group controlId="UserType" style={{marginBottom:"25px"}}>
              <Form.Control
                as="select"
                name="UserType"
                style={{fontFamily: "Montserrat"}}
                value={formData.UserType}
                onChange={handleChange}
                required
              >
                <option value="">Select User Type</option>
                <option value="backofficeuser">Backoffice User</option>
                <option value="travelagent">Travel Agent</option>
              </Form.Control>
            </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center">
              <Col xs="auto">
            <Button type="submit" variant="primary" style={{ width: '150px', backgroundColor: '#003300', fontFamily: "Montserrat" }}>Sign Up</Button>
              </Col>
            </Row>
          <div className="text-center mt-2">
            <p style={{ marginTop: "15px", fontSize: "1.2em", color: "#555", fontFamily: "Montserrat" }}>
  Don't have an account? <Link to="/" style={{ color: "#003300", textDecoration: "none", fontWeight: "bold", fontFamily: "Montserrat" }}>Sign In</Link>
</p>
          </div>
          </Form>
        </Card.Body>
        </Col>
        </Row>
      </Card>
    </Container>
    </div>
  );
};

export default Signup;
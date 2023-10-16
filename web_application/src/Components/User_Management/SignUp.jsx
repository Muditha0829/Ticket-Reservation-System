/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IsValidEmail, IsValidPassword, IsValidNIC, IsValidContactNumber } from '../Validations';

const Signup = () => {

  // State for form data
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

  // Access to the history object to navigate
  const history = useHistory();

  // Handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.Password !== formData.RePassword) {
      toast.error('Passwords do not match.');
      return;
    }

    if (!IsValidEmail(formData.Email)) {
      toast.error('Invalid email format.');
      return;
    }

    if (!IsValidNIC(formData.NIC)) {
      toast.error('Invalid NIC format.');
      return;
    }

    if (!IsValidPassword(formData.Password)) {
      toast.error('Invalid Password format.');
      return;
    }

    if (!IsValidContactNumber(formData.ContactNumber)) {
      toast.error('Invalid contact number format.');
      return;
    }

    axios.post('http://pasinduperera-001-site1.atempurl.com/api/users/signup', formData, {
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
    <Container style={{width:"75%", marginTop: "47px", marginBottom: "48px"}}>
      <Card style={{ background: 'rgba(255, 255, 255, 0.7)', border: 'none' }}>
        <Row>
          <Col>
          <img src='https://www.telegraph.co.uk/content/dam/travel/2023/03/10/TELEMMGLPICT000328038771_trans_NvBQzQNjv4BqqVzuuqpFlyLIwiB6NTmJwSX5rhseiWKOo9p9OQ-ymek.jpeg' style={{width: "100%", margin: "25px", height: "84%"}}/>
          </Col>
          <Col>
        <Card.Body>
        <ToastContainer position="top-center" autoClose={1000} hideProgressBar />
        <Card.Title style={{ margin: "25px", fontFamily: "Dela Gothic One", fontSize: "34px", textAlign: "center" }}>Sign Up</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
            <Form.Group controlId="NIC" style={{marginBottom:"7px"}}>
            <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>NIC</Form.Label>
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
            <Form.Group controlId="UserName" style={{marginBottom:"7px"}}>
            <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>User Name</Form.Label>
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
            <Form.Group controlId="FirstName" style={{marginBottom:"7px"}}>
            <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>First Name</Form.Label>
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
            <Form.Group controlId="LastName" style={{marginBottom:"7px"}}>
            <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Last Name</Form.Label>
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
            
            <Form.Group controlId="Email" style={{marginBottom:"7px"}}>
            <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Email</Form.Label>
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
            <Form.Group controlId="Gender" style={{marginBottom:"7px"}}>
            <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Gender</Form.Label>
    <Form.Control
        as="select"
        name="Gender"
        style={{fontFamily: "Montserrat"}}
        value={formData.Gender}
        onChange={handleChange}
        required
    >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
    </Form.Control>
</Form.Group>
            <Form.Group controlId="ContactNumber" style={{marginBottom:"7px"}}>
            <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Contact Number</Form.Label>
              <Form.Control
                type="text"
                name="ContactNumber"
                style={{fontFamily: "Montserrat"}}
                value={formData.ContactNumber}
                onChange={handleChange}
                placeholder="Contact Number"
                required
              />
            </Form.Group>
            <Form.Group controlId="Password" style={{marginBottom:"7px"}}>
            <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Password</Form.Label>
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
            <Form.Group controlId="RePassword" style={{marginBottom:"7px"}}>
            <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Re enter Password</Form.Label>
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
            <Form.Group controlId="UserType" style={{marginBottom:"7px"}}>
            <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>User Type</Form.Label>
              <Form.Control
                as="select"
                name="UserType"
                style={{fontFamily: "Montserrat"}}
                value={formData.UserType}
                onChange={handleChange}
                required
              >
                <option value="">Select User Type</option>
                <option value="BackOfficeUser">Backoffice User</option>
                <option value="TravelAgent">Travel Agent</option>
              </Form.Control>
            </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center">
              <Col xs="auto">
            <Button type="submit" variant="primary" style={{ width: '150px', backgroundColor: '#00284d', fontFamily: "Montserrat", marginTop: "27px" }}>Sign Up</Button>
              </Col>
            </Row>
          <div className="text-center mt-2">
            <p style={{ marginTop: "15px", fontSize: "1.2em", color: "#555", fontFamily: "Montserrat" }}>
  Don't have an account? <Link to="/" style={{ color: "#00284d", textDecoration: "none", fontWeight: "bold", fontFamily: "Montserrat" }}>Sign In</Link>
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
import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';

const AddTraveller = () => {
  const [formData, setFormData] = useState({
    NIC: '',
    UserName: '',
    FirstName: '',
    LastName: '',
    Email: '',
    Gender: '',
    Password: '',
    RePassword: '',
    ContactNumber: '',
    UserType: "Traveller"
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

  //   const nicRegex = /^[0-9]{10,12}$/;
  //   const EmailRegex = /^[0-9]{10}$/;

  //   const isValidPassword = (password) => {
  //     const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  //     return passwordPattern.test(password);
  //   };

  // if (!nicRegex.test(formData.NIC.toUpperCase())) {
  //   alert('Invalid NIC number. Please enter a valid NIC number.');
  //   return;
  // }

  // if (!EmailRegex.test(formData.ContactNumber)) {
  //   alert('Invalid Email number. Please enter a 10-digit Email number.');
  //   return;
  // }

  //   if (formData.Password !== formData.RePassword) {
  //     alert("Passwords do not match. Please try again.");
  //     return;
  //   }

  //   if (!isValidPassword(formData.Password)) {
  //     alert('Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long.');
  //     return;
  //   }
  
    axios.post('http://localhost:57549/api/users/signup', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      console.log('Success:', response.data);
      toast.success('User Created successfully!');
      history.push('/travelagentdashboard');
    })
    .catch(error => {
      toast.error('Error:', error);
      alert('error');
    });
  };

  return (
    <Container className="my-5 text-center" style={{width: "1200px", paddingLeft: "250px"}}>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
  <Row className="justify-content-center">
    <Col>
    <Card style={{ background: 'rgba(255, 255, 255, 0.7)', border: 'none' }}>
            <Card.Body>
              <Card.Title style={{ margin: "25px", fontFamily: "Dela Gothic One", fontSize: "34px" }}>Create New Traveller</Card.Title>
      <Form onSubmit={handleSubmit}>
      <div className="row">
      <div className="col-md-6" style={{textAlign: "left"}}>
        <Form.Group controlId="NIC" style={{fontSize: "17px", fontFamily: "Montserrat"}}>
          <Form.Control
            type="text"
            name="NIC"
            value={formData.NIC}
            style={{fontFamily: "Onest"}}
            onChange={handleChange}
            placeholder="NIC"
            required
          />
          <br/>
        </Form.Group>
        <Form.Group controlId="UserName" style={{fontSize: "17px", fontFamily: "Montserrat"}}>
          <Form.Control
            type="text"
            name="UserName"
            value={formData.UserName}
            style={{fontFamily: "Onest"}}
            onChange={handleChange}
            placeholder="Username"
            required
          />
        </Form.Group>
        <br/>
        <Form.Group controlId="FirstName" style={{fontSize: "17px", fontFamily: "Montserrat"}}>
          <Form.Control
            type="text"
            name="FirstName"
            value={formData.FirstName}
            style={{fontFamily: "Onest"}}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
        </Form.Group>
        <br/>
        <Form.Group controlId="LastName" style={{fontSize: "17px", fontFamily: "Montserrat"}}>
          <Form.Control
            type="text"
            name="LastName"
            value={formData.LastName}
            style={{fontFamily: "Onest"}}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
        </Form.Group>
        <br/>
        <Form.Group controlId="userType" style={{fontSize: "17px", fontFamily: "Montserrat"}}>
          <Form.Control
            type="text"
            name="userType"
            value={formData.LastName}
            style={{fontFamily: "Onest"}}
            onChange={handleChange}
            placeholder="Traveler"
            required
            disabled
          />
        </Form.Group>
        <br/>
        </div>
        <div className="col-md-6" style={{textAlign: "left"}}>
        <Form.Group controlId="Email" style={{fontSize: "17px", fontFamily: "Montserrat"}}>
          <Form.Control
            type="Email"
            name="Email"
            value={formData.Email}
            style={{fontFamily: "Onest"}}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </Form.Group>
        <br/>
        <Form.Group controlId="Gender" style={{fontSize: "17px", fontFamily: "Montserrat"}}>
          <Form.Control
            type="text"
            name="Gender"
            value={formData.Gender}
            style={{fontFamily: "Onest"}}
            onChange={handleChange}
            placeholder="Gender"
            required
          />
        </Form.Group>
        <br/>
        <Form.Group controlId="ContactNumber" style={{fontSize: "17px", fontFamily: "Montserrat"}}>
          <Form.Control
            type="text"
            name="ContactNumber"
            value={formData.ContactNumber}
            style={{fontFamily: "Onest"}}
            onChange={handleChange}
            placeholder="Phone Number"
            required
          />
        </Form.Group>
        <br/>
        <Form.Group controlId="Password" style={{fontSize: "17px", fontFamily: "Montserrat"}}>
          <Form.Control
            type="password"
            name="Password"
            value={formData.Password}
            style={{fontFamily: "Onest"}}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </Form.Group>
        <br/>
        <Form.Group controlId="RePassword" style={{fontSize: "17px", fontFamily: "Montserrat"}}>
          <Form.Control
            type="password"
            name="RePassword"
            value={formData.RePassword}
            style={{fontFamily: "Onest"}}
            onChange={handleChange}
            placeholder="Re Password"
            required
          />
        </Form.Group>
        <br/>
        </div>
        </div>
        <Row className="justify-content-center" style={{margin: "25px"}}>
              <Col xs="auto">
              <Button variant="secondary" onClick={() => window.history.back()} style={{ width: '150px' }}>Back</Button>{' '}
            <Button type="submit" variant="primary" style={{ width: '150px' }}>Submit</Button>
              </Col>
            </Row>
      </Form>
      </Card.Body>
  </Card>
    </Col>
  </Row>
</Container>
  );
};

export default AddTraveller;
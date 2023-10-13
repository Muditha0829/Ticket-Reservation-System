import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import { IsValidEmail, IsValidPassword, IsValidNIC, IsValidContactNumber } from '../../Validations';

const AddTraveller = () => {

  // Initialize state with form data
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
    UserType: "Traveler"
  });

  // Get the history object for programmatic navigation
  const history = useHistory();

  // Handle input changes
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

    // Check if passwords match
    if (formData.Password !== formData.RePassword) {
      toast.error('Passwords do not match.');
      return;
    }

    // Validate email
    if (!IsValidEmail(formData.Email)) {
      toast.error('Invalid email format.');
      return;
    }

    // Validate NIC
    if (!IsValidNIC(formData.NIC)) {
      toast.error('Invalid NIC format.');
      return;
    }

    // Validate password
    if (!IsValidPassword(formData.Password)) {
      toast.error('Invalid Password format.');
      return;
    }

    // Validate contact number
    if (!IsValidContactNumber(formData.ContactNumber)) {
      toast.error('Invalid contact number format.');
      return;
    }
  
    // Send POST request to create a new traveler
    axios.post('http://localhost:57549/api/users/signup', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      console.log('Success:', response.data);
      toast.success('User Created successfully!');
      setTimeout(() => {
      history.push('/travelagentdashboard');
      }, 2000)
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
              <Card.Title style={{ margin: "25px", fontFamily: "Dela Gothic One", fontSize: "34px" }}>Create New Traveler</Card.Title>
      <Form onSubmit={handleSubmit}>
      <div className="row">
      <div className="col-md-6" style={{textAlign: "left"}}>
        <Form.Group controlId="NIC" style={{fontSize: "17px", fontFamily: "Montserrat"}}>
        <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>NIC</Form.Label>
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
        <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>User Name</Form.Label>
          <Form.Control
            type="text"
            name="UserName"
            value={formData.UserName}
            style={{fontFamily: "Onest"}}
            onChange={handleChange}
            placeholder="User Name"
            required
          />
        </Form.Group>
        <br/>
        <Form.Group controlId="FirstName" style={{fontSize: "17px", fontFamily: "Montserrat"}}>
        <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>First Name</Form.Label>
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
        <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Last Name</Form.Label>
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
        <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>User Type</Form.Label>
          <Form.Control
            type="text"
            name="userType"
            value={formData.UserType}
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
        <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Email</Form.Label>
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
  <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Gender</Form.Label>
  <Form.Select
    name="Gender"
    value={formData.Gender}
    style={{fontFamily: "Onest"}}
    onChange={handleChange}
    required
  >
    <option value="">Select Gender</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
  </Form.Select>
</Form.Group>
        <br/>
        <Form.Group controlId="ContactNumber" style={{fontSize: "17px", fontFamily: "Montserrat"}}>
        <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Contact Number</Form.Label>
          <Form.Control
            type="text"
            name="ContactNumber"
            value={formData.ContactNumber}
            style={{fontFamily: "Onest"}}
            onChange={handleChange}
            placeholder="Contact Number"
            required
          />
        </Form.Group>
        <br/>
        <Form.Group controlId="Password" style={{fontSize: "17px", fontFamily: "Montserrat"}}>
        <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Password</Form.Label>
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
        <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Re enter Password</Form.Label>
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
              <Button variant="secondary" onClick={() => window.history.back('/travelerlist')} style={{ width: '150px' }}>Back</Button>{' '}
            <Button type="submit" variant="primary" style={{ width: '150px', backgroundColor: "#00284d" }}>Create Traveler</Button>
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
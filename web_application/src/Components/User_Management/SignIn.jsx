import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

const SignIn = () => {

  const sectionStyle = {
    backgroundImage: `url(https://img.freepik.com/premium-photo/train-forest-with-yellow-smoke-background-trees_900706-5336.jpg)`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    minHeight: '100vh', // Adjust this value as needed for full page height
    paddingTop: '100px', // Add padding to keep content visible
  };

  const { setUser, UserType } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    NIC: '',
    Password: ''
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

    axios.post('http://localhost:57549/api/users/signin', formData)
      .then(response => {
        console.log('User authenticated:', response.data);
        setUser(response.data.UserID, response.data.UserType);
        sessionStorage.setItem('userID', response.data.userID);
        console.log('User Type:', response.data.UserType);
        console.log('UserType:', UserType);

        if (response.data.UserType === 'backofficeuser') {
          history.push('/backofficeuserdashboard');
          window.location.href="/backofficeuserdashboard";
        } else if (response.data.UserType === 'travelagent') {
          history.push('/travelagentdashboard');
          window.location.href="/travelagentdashboard";
        } else {
          history.push('/home');
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          alert('Password or NIC mismatch. Please try again.');
        } else if (error.response && error.response.status === 400) {
          alert('Invalid User credentials. Please check your inputs.');
        } else {
          console.error('Error authenticating user:', error);
          alert('Invalid User credentials. Please check your inputs.');
        }
      });
  };

  return (
    <div style={sectionStyle}>
    <Container className="my-5 text-center">
      <Row className="justify-content-center" style={{marginTop:"78px"}}>
        <Col md={6}>
          <Card style={{ padding: '25px', margin: '25px' }}>
          <Card.Title style={{ margin: "25px", fontFamily: "MyCustomFont, sans-serif", fontSize: "34px" }}>Sign In</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="NIC" style={{marginBottom: "25px"}}>
                <Form.Control 
                  type="text" 
                  name="NIC" 
                  value={formData.NIC} 
                  onChange={handleChange} 
                  placeholder='NIC'
                  required 
                />
              </Form.Group>
              <Form.Group controlId="Password" style={{marginBottom:"25px"}}>
                <Form.Control 
                  type="password" 
                  name="Password" 
                  value={formData.Password} 
                  onChange={handleChange} 
                  placeholder='Password'
                  required 
                />
              </Form.Group>
              <Button variant="primary" type="submit" style={{ padding: '10px 20px', backgroundColor: '#003300' }}>
  Sign In
</Button>
            </Form>
            <p style={{ marginTop: "15px", fontSize: "1.2em", color: "#555" }}>
  Don't have an account? <Link to="/signup" style={{ color: "#003300", textDecoration: "none", fontWeight: "bold", color: '#003300' }}>Sign Up</Link>
</p>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default SignIn;
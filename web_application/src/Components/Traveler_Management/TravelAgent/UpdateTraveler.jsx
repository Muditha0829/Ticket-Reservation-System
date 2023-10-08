import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';

const UpdateTraveller = () => {
  const { UserID } = useParams();
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
    axios.get(`http://localhost:57549/api/users/getuser/${UserID}`)
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [UserID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const EmailRegex = /^[0-9]{10}$/;

  if (!EmailRegex.test(userData.ContactNumber)) {
    alert('Invalid Email number. Please enter a 10-digit Email number.');
    return;
  }

    axios.put(`http://localhost:57549/api/users/updateuser/${UserID}`, userData)
      .then(response => {
        console.log('User updated:', response.data);
        alert('Travel user updated successfully!');
        history.push(`/viewtraveller/${UserID}`);
        window.location.href = `/listtraveluser`;
      })
      .catch(error => {
        console.error('Error updating user:', error);
      });
  };

  return (
    <Container className="my-5 text-center" style={{width: "1200px", paddingLeft: "250px"}}>
      <Card>
            <Card.Body>
  <Card.Title style={{ margin: "25px", fontFamily: "Dela Gothic One", fontSize: "34px" }}>Update Traveller</Card.Title>
  <div className="text-center mb-4">
            <img src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Photos.png" alt="Profile" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
          </div>
  <Form onSubmit={handleSubmit}>
  <div className="row">
  <div className="col-md-6" style={{textAlign: "left"}}>
  <Form.Group>
      <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>NIC</Form.Label>
      <Form.Control
        type="text"
        id="NIC"
        name="NIC"
        value={userData.NIC}
        style={{fontFamily: "Onest"}}
        onChange={handleChange}
        required
        disabled
      />
    </Form.Group>
    <br/>
    <Form.Group>
      <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>User Name</Form.Label>
      <Form.Control
        type="text"
        id="UserName"
        name="UserName"
        value={userData.UserName}
        style={{fontFamily: "Onest"}}
        onChange={handleChange}
        required
      />
    </Form.Group>
    <br/>
    <Form.Group>
      <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>First Name</Form.Label>
      <Form.Control
        type="text"
        id="FirstName"
        name="FirstName"
        value={userData.FirstName}
        style={{fontFamily: "Onest"}}
        onChange={handleChange}
        required
      />
    </Form.Group>
    <br/>
    <Form.Group>
      <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Last Name</Form.Label>
      <Form.Control
        type="text"
        id="LastName"
        name="LastName"
        value={userData.LastName}
        style={{fontFamily: "Onest"}}
        onChange={handleChange}
        required
      />
    </Form.Group>
    <br/>
    </div>
    <div className="col-md-6" style={{textAlign: "left"}}>
    <Form.Group>
      <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Email</Form.Label>
      <Form.Control
        type="Email"
        id="Email"
        name="Email"
        value={userData.Email}
        style={{fontFamily: "Onest"}}
        onChange={handleChange}
        required
      />
    </Form.Group>
    <br/>
    <Form.Group>
      <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Gender</Form.Label>
      <Form.Control
        type="text"
        id="Gender"
        name="Gender"
        style={{fontFamily: "Onest"}}
        value={userData.Gender}
        onChange={handleChange}
        required
      />
    </Form.Group>
    <br/>
    <Form.Group>
      <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Phone Number</Form.Label>
      <Form.Control
        type="text"
        id="ContactNumber"
        name="ContactNumber"
        value={userData.ContactNumber}
        style={{fontFamily: "Onest"}}
        onChange={handleChange}
        required
      />
    </Form.Group>
    <br/>
    <Form.Group>
      <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>User Status</Form.Label>
      <Form.Control
        type="text"
        id="UserStatus"
        name="UserStatus"
        value={userData.UserStatus}
        style={{fontFamily: "Onest"}}
        onChange={handleChange}
        required
        disabled
      />
    </Form.Group>
    <br/>
    </div>
            </div>
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
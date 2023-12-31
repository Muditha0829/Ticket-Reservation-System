import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { IsValidEmail, IsValidNIC, IsValidContactNumber } from '../Validations';
import imageprofileavatar from '../Assests/profileavatar.png'

const UpdateTraveller = () => {

  // Extracting UserID from the URL parameters
  const { UserID } = useParams();

  // Initializing history hook for navigation
  // const history = useHistory();

  // Initializing state to hold user data
  const [userData, setUserData] = useState({
    UserName: '',
    FirstName: '',
    LastName: '',
    Email: '',
    Gender: '',
    ContactNumber: '',
    UserType: '',
  });

  // Fetching user data on component mount
  useEffect(() => {
    axios.get(`http://pasinduperera-001-site1.atempurl.com/api/users/getuser/${UserID}`)
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [UserID]);

  // Handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate email format
    if (!IsValidEmail(userData.Email)) {
      toast.error('Invalid email format.');
      return;
    }

    // Validate NIC format
    if (!IsValidNIC(userData.NIC)) {
      toast.error('Invalid NIC format.');
      return;
    }

    // Validate contact number format
    if (!IsValidContactNumber(userData.ContactNumber)) {
      toast.error('Invalid contact number format.');
      return;
    }

    // Sending a PUT request to update user data
    axios.put(`http://pasinduperera-001-site1.atempurl.com/api/users/updateuser/${UserID}`, userData)
      .then(response => {
        console.log('User updated:', response.data);
        setTimeout(() => {
          toast.success('user updated successfully!');
        }, 2000)
      })
      .catch(error => {
        console.error('Error updating user:', error);
      });
  };

  return (
    <Container className="my-5 text-center" style={{width: "1200px", paddingLeft: "250px"}}>
      <ToastContainer position="top-center" autoClose={1000} hideProgressBar />
      <Card style={{ background: 'rgba(255, 255, 255, 0.7)', border: 'none' }}>
            <Card.Body>
  <Card.Title style={{ margin: "25px", fontFamily: "Dela Gothic One", fontSize: "34px" }}>Update User</Card.Title>
  <div className="text-center mb-4">
  <img src={imageprofileavatar} alt="Profile" style={{ width: '250px', height: '170px', borderRadius: '50%' }} />
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
        placeholder='NIC'
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
        placeholder='User Name'
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
        placeholder='First Name'
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
        placeholder='Last Name'
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
        placeholder='Email'
        value={userData.Email}
        style={{fontFamily: "Onest"}}
        onChange={handleChange}
        required
      />
    </Form.Group>
    <br/>
    <Form.Group controlId="Gender" style={{fontSize: "17px", fontFamily: "Montserrat"}}>
  <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Gender</Form.Label>
  <Form.Select
    name="Gender"
    value={userData.Gender}
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
    <Form.Group>
      <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Phone Number</Form.Label>
      <Form.Control
        type="text"
        id="ContactNumber"
        name="ContactNumber"
        placeholder='Contact Number'
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
        placeholder='User Status'
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
            <Button type="submit" variant="primary" style={{ width: '150px', backgroundColor: "#00284d" }} onClick={() => window.history.back()} >Update Profile</Button>
              </Col>
            </Row>
  </Form>
  </Card.Body>
  </Card>
</Container>
  );
};

export default UpdateTraveller;
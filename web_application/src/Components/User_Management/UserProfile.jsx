import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Table, Row, Col, Button, Card } from 'react-bootstrap';
import imageprofileavatar from '../Assests/profileavatar.png'

const UserProfile = () => {

  const history = useHistory();

    // Get the user ID from URL parameters
  const { userId } = useParams();

  // State to store user data
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Function to fetch user data
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:57549/api/users/getuser/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    // Check if userId exists before fetching data
    if (userId) {
      fetchData();
    }
  }, [userId]);

  // Function to handle update button click
  const handleUpdate = () => {
    history.push(`/updateuserprofile/${userId}`);
  };

  // Function to handle delete button click
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:57549/api/users/deletuser/${userId}`);
      toast.success('User deleted successfully!');
      window.location.href="/"
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Error deleting user. Please try again later.');
    }
  };

  if (!userId) {
    return <div>No user ID found</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="my-5 text-center" style={{ paddingLeft: "250px" }}>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      <Card style={{ background: 'rgba(255, 255, 255, 0.7)', border: 'none', borderRadius: '15px', boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)' }}>
        <Card.Body>
          <Card.Title style={{ margin: "25px", fontFamily: "Dela Gothic One", fontSize: "34px", color: "#00284d" }}>My Profile</Card.Title>
          <div className="text-center mb-4">
            <img src={imageprofileavatar} alt="Profile" style={{ width: '250px', height: '170px', borderRadius: '50%' }} />
          </div>
          <Table striped bordered responsive style={{ fontFamily: "Onest" }}>
            <tbody>
            <tr>
        <td style={{fontSize: "17px", fontFamily: "Montserrat"}}><strong>NIC</strong></td>
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
          <Row className="justify-content-center" style={{ margin: "25px" }}>
        <Col xs="auto">
        <Button variant="secondary" onClick={() => window.history.back()} style={{ width: '150px', backgroundColor: '#00284d', fontFamily: "Montserrat" }}>Back</Button>{' '}
          <Button variant="secondary" onClick={handleUpdate} style={{ width: '150px', backgroundColor: '#006600', fontFamily: "Montserrat", marginRight: '10px' }}>Update</Button>{' '}
          <Button variant="danger" onClick={handleDelete} style={{ width: '150px', fontFamily: "Montserrat", marginRight: '10px' }}>Delete</Button>{' '}
        </Col>
      </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserProfile;
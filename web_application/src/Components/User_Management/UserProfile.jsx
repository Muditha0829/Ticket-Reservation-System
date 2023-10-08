import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import Cookies from 'js-cookie';
import { Container, Row, Col, Button, Table, Card } from 'react-bootstrap';

const UserProfile = () => {
  const history = useHistory();
  const { userID, setUser, UserType } = useContext(AuthContext);
  const [user, setUserState] = useState(null);

  useEffect(() => {
    const saveduserID = Cookies.get('userID');
    if (!userID && saveduserID) {
        setUser(saveduserID);
      }
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/users/get/${userID}`);
        setUserState(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    if (userID) {
      fetchData();
    }
  }, [userID]);

  useEffect(() => {
    const saveduserID = Cookies.get('userID');

    if (saveduserID) {
      setUser(saveduserID);
    }
  }, [setUser]);

  const handleUpdate = () => {
    history.push(`/updateprofile/${userID}`);
  };

  const handleDelete = () => {
    axios.delete(`/api/users/delete/${userID}`)
      .then(response => {
        console.log('User deleted:', response.data);
        alert('Profile deleted successfully!');
        Cookies.remove('userID');
        Cookies.remove('UserType');
        setUser(null);
        history.push('/home');
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  if (!userID) {
    return <div>No user ID found</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  const setCookies = () => {
    Cookies.set('userID', userID, { expires: 7 });
    Cookies.set('UserType', UserType, { expires: 7 });
  };

  setCookies();

  return (
    <Container className="my-5 text-center" style={{paddingLeft: "250px"}}>
      <Row>
        <Col md={0}>
        <Card.Title style={{ margin: "25px", fontFamily: "MyCustomFont, sans-serif", fontSize: "34px" }}>Profile</Card.Title>
          <div className="text-center mb-4">
            <img src="https://cdn4.vectorstock.com/i/1000x1000/06/18/male-avatar-profile-picture-vector-10210618.jpg" alt="Profile" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
          </div>
          <Table striped bordered responsive>
            <tbody>
              <tr>
                <td><strong>First Name</strong></td>
                <td>{user.FirstName}</td>
              </tr>
              <tr>
                <td><strong>Last Name</strong></td>
                <td>{user.LastName}</td>
              </tr>
              <tr>
                <td><strong>User Name</strong></td>
                <td>{user.UserName}</td>
              </tr>
              <tr>
                <td><strong>NIC</strong></td>
                <td>{user.NIC}</td>
              </tr>
              <tr>
                <td><strong>Email</strong></td>
                <td>{user.Email}</td>
              </tr>
              <tr>
                <td><strong>Contact Number</strong></td>
                <td>{user.ContactNumber}</td>
              </tr>
              <tr>
                <td><strong>User Type</strong></td>
                <td>{user.UserType}</td>
              </tr>
            </tbody>
          </Table>
          <div className="text-center">
            <Button variant="primary" className="mr-2" onClick={handleUpdate} style={{margin: "25px"}}>Update Profile</Button>
            <Button variant="danger" className="mr-2" onClick={handleDelete} style={{margin: "25px"}}>Delete Profile</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Table, Button, Container, Card, Form } from 'react-bootstrap';

const GetAllTravelers = () => {

  // State for storing the list of users
  const [users, setUsers] = useState([]);

  // State for storing the search query
  const [searchQuery, setSearchQuery] = useState('');

  // Function to fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:57549/api/users/getallusers');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Function to handle user deletion
  const handleDeleteUser = async (userID) => {
    try {
      await axios.delete(`http://localhost:57549/api/users/deleteuser/${userID}`);

      const updatedUsers = users.filter(user => user.UserID !== userID);
      setUsers(updatedUsers);
      toast.success('Travel user deleted successfully!');
      setTimeout(() => {
        window.location.href="#";
      }, 2000)
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Function to filter users based on search query
  const filteredUsers = users.filter(user => {
    const { NIC, UserName, Email } = user;
    const query = searchQuery.toLowerCase();
    return NIC.toLowerCase().includes(query) || 
           UserName.toLowerCase().includes(query) || 
           Email.toLowerCase().includes(query);
  });

  return (
    <Container className="my-5 text-center" style={{ height: "600px", paddingLeft: "250px", maxWidth: "900px" }}>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      <Card style={{ background: 'rgba(255, 255, 255, 0.7)', border: 'none', borderRadius: '15px', boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)' }}>
        <Card.Body>
          <Card.Title style={{ margin: "25px", fontFamily: "Dela Gothic One", fontSize: "34px" }}>Travelers</Card.Title>
          <Form.Control
            type="text"
            placeholder="Search by NIC, Username, or Email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
          <Table striped bordered hover responsive>
            <thead>
              <tr style={{fontSize: "17px", fontFamily: "Montserrat"}}>
                <th>NIC</th>
                <th>Username</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.ID} style={{fontFamily: "Onest"}}>
                  <td>{user.NIC}</td>
                  <td>{user.UserName}</td>
                  <td>{user.Email}</td>
                  <td>
                    <Link to={`/viewtraveller/${user.UserID}`} className="mr-2">
                      <Button variant="warning" style={{marginRight: "5px"}}><i className="fas fa-eye"></i></Button>
                    </Link>
                    <Link to={`/updatetraveller/${user.UserID}`} className="mr-2">
                      <Button variant="success" style={{marginRight: "5px"}}><i className="fas fa-edit"></i></Button>
                    </Link>
                    <Button variant="danger" onClick={() => handleDeleteUser(user.UserID)} style={{marginRight: "5px"}}><i className="fas fa-trash-alt"></i></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default GetAllTravelers;
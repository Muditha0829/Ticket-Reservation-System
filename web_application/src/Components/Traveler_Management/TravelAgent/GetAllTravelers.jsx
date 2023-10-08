import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Button, Container, Card } from 'react-bootstrap';

const GetAllTravelers = () => {
  const [users, setUsers] = useState([]);

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

  const handleDeleteUser = async (userID) => {
    try {
      await axios.delete(`http://localhost:57549/api/users/deleteuser/${userID}`);

      const updatedUsers = users.filter(user => user.UserID !== userID);
      setUsers(updatedUsers);
      alert('Travel user deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <Container className="my-5 text-center" style={{height: "700px", paddingLeft: "250px"}}>
  <Card>
            <Card.Body>
              <Card.Title style={{ margin: "25px", fontFamily: "MyCustomFont, sans-serif", fontSize: "34px" }}>Travel Users</Card.Title>
  <Table striped bordered hover responsive>
    <thead>
      <tr>
      <th>NIC</th>
        <th>Username</th>
        <th>Email</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.map(user => (
        <tr key={user.ID}>
          <td>{user.NIC}</td>
          <td>{user.UserName}</td>
          <td>{user.Email}</td>
          <td>
            <Link to={`/viewtraveller/${user.UserID}`} className="mr-2">
              <Button variant="warning" style={{marginRight: "25px"}}><i className="fas fa-eye"></i>View Travel User</Button>
            </Link>
            <Link to={`/updatetraveller/${user.UserID}`} className="mr-2">
              <Button variant="success" style={{marginRight: "25px"}}><i className="fas fa-edit"></i>Update Travel User</Button>
            </Link>
            <Button variant="danger" onClick={() => handleDeleteUser(user.UserID)} style={{marginRight: "25px"}}><i className="fas fa-trash-alt"></i>Delete Travel User</Button>
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
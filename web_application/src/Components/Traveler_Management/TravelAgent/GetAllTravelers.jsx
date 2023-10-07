import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Button, Container, Card } from 'react-bootstrap';

const GetAllTravelers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users/getall');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/api/users/delete/${userId}`);

      // If successful, update state accordingly
      const updatedUsers = users.filter(user => user.ID !== userId);
      setUsers(updatedUsers);
      alert('Travel user deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <Container className="my-5 text-center" style={{height: "700px"}}>
  <Card>
            <Card.Body>
              <Card.Title style={{ margin: "25px", fontFamily: "MyCustomFont, sans-serif", fontSize: "34px" }}>Travel Users</Card.Title>
  <Table striped bordered hover responsive>
    <thead>
      <tr>
        <th>Username</th>
        <th>Email</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.map(user => (
        <tr key={user.ID}>
          <td>{user.UName}</td>
          <td>{user.Email}</td>
          <td>
            <Link to={`/viewtraveller/${user.ID}`} className="mr-2">
              <Button variant="warning" style={{marginRight: "25px"}}>View Travel User</Button>
            </Link>
            <Link to={`/updatetraveller/${user.ID}`} className="mr-2">
              <Button variant="success" style={{marginRight: "25px"}}>Update Travel User</Button>
            </Link>
            <Button variant="danger" onClick={() => handleDeleteUser(user.ID)} style={{marginRight: "25px"}}>Delete Travel User</Button>
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
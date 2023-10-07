import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Button, Card, Container } from 'react-bootstrap';

const GetAllTrain = () => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    axios.get('/api/trains/getall')
      .then(response => {
        setTrains(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const handleDelete = (trainID) => {
    axios.delete(`/api/trains/delete/${trainID}`)
      .then(response => {
        alert('Train successfully deleted!');
        window.location.reload();
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error deleting train. Please try again later.');
      });
  };  

  return (
    <Container className="my-5 text-center" style={{height: "700px"}}>
      <Card>
        <Card.Body>
          <Card.Title style={{ margin: "25px", fontFamily: "MyCustomFont, sans-serif", fontSize: "34px" }}>Train Shedules</Card.Title>
          <Table striped bordered hover style={{ marginTop: '20px', width: '75%' }} className="mx-auto">
            <thead>
              <tr>
                <th>Train ID</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {trains.map(train => (
                <tr key={train.ID}>
                  <td>{train.TrainID}</td>
                  <td>{train.TrainStatus}</td>
                  <td>
                    <Link to={`/view/${train.ID}`}>
                      <Button variant="warning" style={{ marginRight: '17px', color: 'white' }}>View Train Shedule</Button>
                    </Link>
                    <Link to={`/update/${train.ID}`}>
                      <Button variant="success" style={{ marginRight: '17px' }}>Update Train Shedule</Button>
                    </Link>
                    <Button variant="danger" onClick={() => handleDelete(train.ID)} style={{ marginRight: '17px' }}>
                      Delete Train Shedule
                    </Button>
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

export default GetAllTrain;
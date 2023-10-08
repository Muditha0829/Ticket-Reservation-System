import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Button, Card, Container } from 'react-bootstrap';

const GetAllTrainShedules = () => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:57549/api/trains/getalltrains')
      .then(response => {
        setTrains(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const handleDelete = (TrainID) => {
    axios.delete(`http://localhost:57549/api/trains/deletetrain/${TrainID}`)
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
    <Container className="my-5 text-center" style={{height: "700px", paddingLeft: "250px"}}>
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
                  <td>{train.TrainNumber}</td>
                  <td>{train.TrainStatus}</td>
                  <td>
                    <Link to={`/view/${train.TrainID}`}>
                      <Button variant="warning" style={{ marginRight: '17px', color: 'white' }}><i className="fas fa-eye"></i></Button>
                    </Link>
                    <Link to={`/update/${train.TrainID}`}>
                      <Button variant="success" style={{ marginRight: '17px' }}><i className="fas fa-edit"></i></Button>
                    </Link>
                    <Button variant="danger" onClick={() => handleDelete(train.TrainID)} style={{ marginRight: '17px' }}>
                    <i className="fas fa-trash-alt"></i>
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

export default GetAllTrainShedules;
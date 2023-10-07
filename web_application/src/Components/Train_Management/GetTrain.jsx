import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Table, Row, Col, Button, Card, Container } from 'react-bootstrap';

const GetTrain = () => {
  const [train, setTrain] = useState({});
  const { trainID } = useParams();

  useEffect(() => {
    axios.get(`/api/trains/get/${trainID}`)
      .then(response => {
        setTrain(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [trainID]);

  return (
    <Container className="my-5 text-center" style={{width: "470px"}}>
      <Card>
        <Card.Body>
          <Card.Title style={{ margin: "25px", fontFamily: "MyCustomFont, sans-serif", fontSize: "34px" }}>View Train Shedule</Card.Title>
          <div className="mx-auto" style={{ maxWidth: '600px' }}>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <td><strong>Train ID</strong></td>
                  <td>{train.TrainID}</td>
                </tr>
                <tr>
                  <td><strong>Train Name</strong></td>
                  <td>{train.TrainName}</td>
                </tr>
                <tr>
                  <td><strong>TrainDriver</strong></td>
                  <td>{train.TrainDriver}</td>
                </tr>
                <tr>
                  <td><strong>Departure Time</strong></td>
                  <td>{train.DeDateTime}</td>
                </tr>
                <tr>
                  <td><strong>Arrival Time</strong></td>
                  <td>{train.ArDateTime}</td>
                </tr>
                <tr>
                  <td><strong>Status</strong></td>
                  <td>{train.TrainStatus}</td>
                </tr>
              </tbody>
            </Table>
            <Row className="justify-content-center" style={{ margin: '25px' }}>
              <Col xs="auto">
                <Button variant="secondary" onClick={() => window.history.back()} style={{ width: '150px' }}>Back</Button>{' '}
              </Col>
            </Row>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default GetTrain;
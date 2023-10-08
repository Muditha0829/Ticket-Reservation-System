import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, CardBody } from 'react-bootstrap';

const TravelAgentDashboard = () => {
  // State variables to store user counts
  const [travelAgentCount, setTravelAgentCount] = useState(0);
  const [backofficeUserCount, setBackofficeUserCount] = useState(0);
  const [travelUserCount, setTravelUserCount] = useState(0);
  const [trainBookingCount, setTrainBookingCount] = useState(0);

  useEffect(() => {
    // Fetch user counts from the API
    axios.get('http://localhost:57549/api/users/getbackofficeusercount')
      .then(response => {
        setBackofficeUserCount(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });

    axios.get('http://localhost:57549/api/users/gettravelagentcount')
      .then(response => {
        setTravelAgentCount(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });

    axios.get('http://localhost:57549/api/users/gettravelusercount')
      .then(response => {
        setTravelUserCount(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <Container className="text-center" style={{ paddingLeft: "250px", marginBottom: "25px", marginTop: "25px" }}>
      <Card style={{ padding: "1px", height: "537px", background: 'rgba(255, 255, 255, 0.7)', border: 'none' }}>
        <Card.Body>
          <Row className="mb-4">
            <Col>
              {/* Dashboard title */}
              <Card.Title style={{ textAlign: "center", fontSize: "34px", padding: "25px", width: "600px", fontFamily: "Dela Gothic One" }}>
                Travel Agent Dashboard
              </Card.Title>
              {/* Dashboard image */}
              <Card.Img src='https://th.bing.com/th/id/OIP.qZl2uQ0RJQTxq2DMJsjsAQHaC5?pid=ImgDet&w=1280&h=500&rs=1' style={{ height: "200px", marginBottom: "17px" }} />
              <CardBody>
                <Card.Text style={{fontFamily: "Onest"}}>With a focus on train booking management and traveler management, travel agents are essential to the travel sector. They professionally plan clients' lodging and travel arrangements, assuring hassle-free and delightful trips. They also offer thorough assistance to tourists, from preliminary questions to aid following a trip, ensuring a smooth journey. Travel agents are essential in delivering memorable and stress-free travel experiences thanks to their attention to detail and individualized service.</Card.Text>
              </CardBody>
            </Col>
            <Col>
              {/* Card displaying Travel Agents count */}
              <Card style={{width: "75%", margin: "33px", marginTop: "25%"}}>
                <Card.Body style={{fontFamily: "Montserrat"}}>
                  <Card.Title>Number of Travel Agents</Card.Title>
                  <Card.Text>{travelAgentCount}</Card.Text>
                </Card.Body>
              </Card>
              {/* Card displaying Travellers count */}
              <Card style={{width: "75%", margin: "34px", marginTop: "25%"}}>
                <Card.Body style={{fontFamily: "Montserrat"}}>
                  <Card.Title>Number of Travellers</Card.Title>
                  <Card.Text>{travelUserCount}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TravelAgentDashboard;
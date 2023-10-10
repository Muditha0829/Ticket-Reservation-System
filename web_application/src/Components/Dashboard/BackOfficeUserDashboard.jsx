import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, CardBody } from 'react-bootstrap';

const BackOfficeUserDashboard = () => {
  // State variables to store user counts
  const [travelAgentCount, setTravelAgentCount] = useState(0);
  const [backofficeUserCount, setBackofficeUserCount] = useState(0);
  const [travelUserCount, setTravelUserCount] = useState(0);
  const [trainshedulerCount, setTrainSheduleCount] = useState(0);

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

  axios.get('http://localhost:57549/api/trains/gettraincount')
      .then(response => {
        setTrainSheduleCount(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);


  return (
    <Container className="text-center" style={{ paddingLeft: "250px", marginBottom: "25px", marginTop: "25px" }}>
      <Card style={{ padding: "1px", background: 'rgba(255, 255, 255, 0.7)', border: 'none' }}>
        <Card.Body>
          <Row className="mb-4">
            <Col>
              {/* Dashboard title */}
              <Card.Title style={{ textAlign: "center", fontSize: "34px", padding: "25px", width: "600px", fontFamily: "Dela Gothic One" }}>
                BackOffice User Dashboard
              </Card.Title>
              {/* Dashboard image */}
              <Card.Img src='https://th.bing.com/th/id/OIP.qZl2uQ0RJQTxq2DMJsjsAQHaC5?pid=ImgDet&w=1280&h=500&rs=1' style={{ height: "200px", marginBottom: "17px" }} />
              <CardBody>
                <Card.Text style={{fontFamily: "Onest", textAlign: "justify"}}>The management of administrative activities and assistance for the online train ticket booking system is the responsibility of back office users. 
                  To guarantee the system runs well, they take care of tasks including train shedule management, user account administration.</Card.Text>
              </CardBody>
            </Col>
            <Col>
              {/* Card displaying Back Office Users count */}
              <Card style={{width: "75%", margin: "33px", marginBottom: "7%"}}>
                <Card.Body style={{fontFamily: "Montserrat"}}>
                  <Card.Title>Number of Backofficers</Card.Title>
                  <Card.Text>{backofficeUserCount}</Card.Text>
                </Card.Body>
              </Card>
              {/* Card displaying Travel Agents count */}
              <Card style={{width: "75%", margin: "33px", marginBottom: "8%"}}>
                <Card.Body style={{fontFamily: "Montserrat"}}>
                  <Card.Title>Number of Travel Agents</Card.Title>
                  <Card.Text>{travelAgentCount}</Card.Text>
                </Card.Body>
              </Card>
              {/* Card displaying Travellers count */}
              <Card style={{width: "75%", margin: "34px", marginBottom: "8%"}}>
                <Card.Body style={{fontFamily: "Montserrat"}}>
                  <Card.Title>Number of Travelers</Card.Title>
                  <Card.Text>{travelUserCount}</Card.Text>
                </Card.Body>
              </Card>
              {/* Card displaying Train Shedule count */}
              <Card style={{width: "75%", margin: "34px", marginBottom: "7%"}}>
                <Card.Body style={{fontFamily: "Montserrat"}}>
                  <Card.Title>Number of Train Shedules</Card.Title>
                  <Card.Text>{trainshedulerCount}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BackOfficeUserDashboard;
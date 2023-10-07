import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const TravelAgentDashboard = () => {
  return (
    <Container className="text-center mt-5">
      <Card style={{ padding: "20px" }}>
        <Card.Body>
          <Card.Title style={{ textAlign: "center", fontSize: "43px", padding: "25px" }}>Welcome To Travel Agent Dashboard</Card.Title>
          <Row className="mb-4">
            <Col>
              <Card style={{ textAlign: "center" }}>
                <Card.Img variant="top" src="https://seatreservation.railway.gov.lk/mtktwebslr/gallery/gallery-5.jpg" />
                <Card.Body>
                  <Card.Text>
                  The travel agent dashboard for online train ticket booking is a comprehensive web-based platform designed to empower travel agents in efficiently managing train reservations for their clients. This intuitive system offers a range of essential features, including user authentication for secure access, reservation management for modifying or canceling reservations, and a powerful search and booking interface. Travel agents can easily search for available train services based on various criteria, select specific seats or berths, and process payments seamlessly. The dashboard also provides real-time information on seat availability, ensuring agents can offer customers the best options. With a user-friendly interface, integrated communication tools, and robust reporting capabilities, this dashboard streamlines the entire booking process, ultimately enhancing the travel agent's ability to provide top-notch service to their clientele.
                  </Card.Text>
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
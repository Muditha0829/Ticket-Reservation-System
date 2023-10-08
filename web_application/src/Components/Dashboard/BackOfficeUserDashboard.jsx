import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const BackOfficeUserDashboard = () => {
  return (
    <Container className="text-center mt-5" style={{paddingLeft: "250px"}}>
      <Card style={{ padding: "20px" }}>
        <Card.Body>
          <Card.Title style={{ textAlign: "center", fontSize: "43px", padding: "25px" }}>Welcome To Back Office User Dashboard</Card.Title>
          <Row className="mb-4">
            <Col>
              <Card style={{ textAlign: "center" }}>
                <Card.Img variant="top" src="https://cdn.sriggle.tech/kantents/production/1/1345/06/0bae9807-860e-472c-914c-f32b481ade40.webp" />
                <Card.Body>
                  <Card.Text>
                  Back Office User Dashboard provides a comprehensive platform for managing various aspects of the online train ticket booking system. It empowers back-office staff with a range of functionalities, including reservation management, user account administration, and monitoring of ticket sales. This dashboard streamlines the process of handling customer inquiries, processing refunds, and generating reports for performance analysis. Additionally, it offers tools for updating train schedules, managing seat availability, and overseeing payment transactions. With its intuitive interface and powerful features, the BackOfficeUserDashboard plays a crucial role in ensuring a seamless and efficient operation of the online ticket booking system.
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

export default BackOfficeUserDashboard;
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { IsValidTrainNumber } from '../Validations';

const AddTrainShedule = () => {
  // Getting userID from AuthContext
  const { userID } = useContext(AuthContext);

  // State for submission status
  // eslint-disable-next-line no-unused-vars
  const [submissionSuccessful, setSubmissionSuccessful] = useState(false);

  // State for storing train data
  const [trainData, setTrainData] = useState({
    TrainNumber: '',
    userID: userID,
    TrainName: '',
    TrainDriver: '',
    DepartureStation: '', 
    ArrivalStation: '', 
    DepartureTime: '', 
    ArrivalTime: '', 
    TrainType: '', 
    FirstClassTicketPrice: '', 
    SecondClassTicketPrice: '', 
    ThirdClassTicketPrice: '', 
    TrainStatus: 'Sheduled',
  });

  // Getting history object for navigation
  const history = useHistory();

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrainData({
      ...trainData,
      [name]: value,
    });
  };

  const [todayDateTime, setTodayDateTime] = useState('');

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    let month = (now.getMonth() + 1).toString().padStart(2, '0');
    let day = now.getDate().toString().padStart(2, '0');
    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');
    const today = `${year}-${month}-${day}T${hours}:${minutes}`;
    setTodayDateTime(today);
  }, []);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validating Train Number format
  if (!IsValidTrainNumber(trainData.TrainNumber)) {
    toast.error('Invalid Train Number. Please enter a valid Train Number format (TXXXX).');
    return;
}

    const TrainIDPattern = /^[A-Z]\d{4}$/;

    if (!TrainIDPattern.test(trainData.TrainNumber)) {
      toast.error('Invalid Train Number. Please enter a valid Train Number format (TXXXX).');
      return;
    }
    axios.post('http://pasinduperera-001-site1.atempurl.com/api/trains/createtrain', trainData)
      .then(response => {
        console.log('Train added:', response.data);
        toast.success("Train Added");
      setSubmissionSuccessful(true);
      setTimeout(() => {
        history.push('/backofficeuserdashboard');
      }, 2000);
      })
      .catch(error => {
        toast.error(error.response.data.Message);
      });
  };

  return (
    <Container className="text-center mt-5" style={{width: "1200px", paddingLeft: "250px", marginBottom: "25px"}}>
      <ToastContainer position="top-center" autoClose={1000} hideProgressBar />
      <Row className="justify-content-center">
        <Col>
          <Card style={{ background: 'rgba(255, 255, 255, 0.7)', border: 'none' }}>
            <Card.Body>
              <Card.Title style={{ margin: "25px", fontFamily: "Dela Gothic One", fontSize: "34px" }}>Create New Train Schedule</Card.Title>
              <Form onSubmit={handleSubmit}>
              <div className="row">
  <div className="col-md-6" style={{textAlign: "left"}}>
                <Form.Group controlId="TrainID" style={{fontSize: "17px", fontFamily: "Montserrat"}}>
                  <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Train Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="TrainNumber"
                    placeholder='Train Number'
                    style={{fontFamily: "Onest"}}
                    value={trainData.TrainNumber}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <br/>
                <Form.Group controlId="trainName" style={{fontSize: "17px", fontFamily: "Montserrat"}}>
                  <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Train Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="TrainName"
                    placeholder='Train Name'
                    style={{fontFamily: "Onest"}}
                    value={trainData.TrainName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <br/>
                <Form.Group controlId="trainDriver" style={{fontSize: "17px", fontFamily: "Montserrat"}}>
                  <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Train Driver</Form.Label>
                  <Form.Control
                    type="text"
                    name="TrainDriver"
                    placeholder='Train Driver'
                    style={{fontFamily: "Onest"}}
                    value={trainData.TrainDriver}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <br/>
                <Form.Group controlId="departureStation" style={{fontSize: "17px", fontFamily: "Montserrat"}}>
                  <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Departure Station</Form.Label>
                  <Form.Control
                    type="text"
                    name="DepartureStation"
                    placeholder='Departure Station'
                    style={{fontFamily: "Onest"}}
                    value={trainData.DepartureStation}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <br/>
                <Form.Group controlId="arrivalStation" style={{fontSize: "17px", fontFamily: "Montserrat"}}>
                  <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Arrival Station</Form.Label>
                  <Form.Control
                    type="text"
                    name="ArrivalStation"
                    placeholder='Arrival Station'
                    style={{fontFamily: "Onest"}}
                    value={trainData.ArrivalStation}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <br/>
                <Form.Group controlId="trainStatus" style={{fontSize: "17px", fontFamily: "Montserrat"}}>
                  <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Train Status</Form.Label>
                  <Form.Control
                    type="text"
                    name="trainStatus"
                    placeholder='Train Status'
                    style={{fontFamily: "Onest"}}
                    value="Active"
                    onChange={handleChange}
                    required
                    disabled
                  />
                </Form.Group>
                <br/>
                </div>
                <div className="col-md-6" style={{textAlign: "left"}}>
                <Form.Group controlId="departureTime" style={{fontSize: "17px", fontFamily: "Montserrat"}}>
                  <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Departure Time</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="DepartureTime"
                    placeholder='Departure Time'
                    min={todayDateTime}
                    style={{fontFamily: "Onest"}}
                    value={trainData.DepartureTime}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <br/>
                <Form.Group controlId="arrivalTime" style={{fontSize: "17px", fontFamily: "Montserrat"}}>
                  <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Arrival Time</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="ArrivalTime"
                    placeholder='Arrival Time'
                    min={todayDateTime}
                    style={{fontFamily: "Onest"}}
                    value={trainData.ArrivalTime}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <br/>

                <Form.Group controlId="trainType" style={{fontSize: "17px", fontFamily: "Montserrat"}}>
  <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Train Type</Form.Label>
  <Form.Control
    as="select"
    name="TrainType"
    placeholder='Train Type'
    style={{fontFamily: "Onest"}}
    value={trainData.TrainType}
    onChange={handleChange}
    required
  >
    <option value="">Select Train Type</option>
    <option value="Express">Express</option>
    <option value="Intercity">Intercity</option>
    <option value="Local">Local</option>
  </Form.Control>
</Form.Group>
                <br/>
                <Form.Group controlId="firstClassTicketPrice" style={{fontSize: "17px", fontFamily: "Montserrat"}}>
                  <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>First Class Ticket Price</Form.Label>
                  <Form.Control
                    type="text"
                    name="FirstClassTicketPrice"
                    placeholder='First Class Ticket price'
                    style={{fontFamily: "Onest"}}
                    value={trainData.FirstClassTicketPrice}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <br/>
                <Form.Group controlId="secondClassTicketPrice" style={{fontSize: "17px", fontFamily: "Montserrat"}}>
                  <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Second Class Ticket Price</Form.Label>
                  <Form.Control
                    type="text"
                    name="SecondClassTicketPrice"
                    placeholder='Second Class Ticket price'
                    value={trainData.SecondClassTicketPrice}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <br/>
                <Form.Group controlId="thirdClassTicketPrice" style={{fontSize: "17px", fontFamily: "Montserrat"}}>
                  <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Third Class Ticket Price</Form.Label>
                  <Form.Control
                    type="text"
                    name="ThirdClassTicketPrice"
                    placeholder='Third Class Ticket price'
                    value={trainData.ThirdClassTicketPrice}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <br/>
                </div>
                </div>
                <Row className="justify-content-center">
                  <Col xs="auto" style={{ margin: "34px" }}>
                    <Button variant="secondary" onClick={() => window.history.back()} style={{ width: '150px' }}>Back</Button>{' '}
                    <Button type="submit" variant="primary" style={{ width: '150px', backgroundColor: "#00284d" }}>Submit</Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddTrainShedule;
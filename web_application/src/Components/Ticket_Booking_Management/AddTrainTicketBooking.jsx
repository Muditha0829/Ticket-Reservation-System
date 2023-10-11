import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { IsValidEmail, IsValidPassword, IsValidNIC, IsValidContactNumber, IsValidTicketClass } from '../Validations';

const AddTrainTicketBooking = () => {
  const { userId } = useContext(AuthContext);
  const [trainData, setTrainData] = useState([]);
  const [inputsDisabled, setInputsDisabled] = useState(true);
  const [formData, setFormData] = useState({
    MainPassengerName: '',
    UserID: userId,
    ReservationDate: '',
    BookingDate: '',
    DepartureStation: '',
    DestinationStation: '',
    TrainName: '',
    TotalPassengers: "",
    TicketClass: '',
    Email: '',
    NIC: '',
    ContactNumber: '',
    TotalPrice: ''
  });

  const history = useHistory();

  const calculateTotalPrice = () => {
    const ticketClass = formData.TicketClass;
    const totalPassengers = parseInt(formData.TotalPassengers);

    // Add logic to calculate total price based on ticket class and total passengers
    let TotalPrice = 0;
    if (ticketClass === 'First Class') {
      TotalPrice = totalPassengers * formData.ticketPrice1;
      console.log("Total price"+ TotalPrice);
    } else if (ticketClass === 'Second Class') {
      TotalPrice = totalPassengers * formData.ticketPrice2;
    } else if (ticketClass === 'Third Class') {
      TotalPrice = totalPassengers * formData.ticketPrice3;
    }

    setFormData({
      ...formData,
      TotalPrice: TotalPrice.toString()
    });
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    if (month < 10) {
      month = `0${month}`;
    }

    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  
    if (name === 'TrainName') {
      fetchTicketPrice(value);
      setInputsDisabled(false);
    }
  };
  
  const fetchTicketPrice = (id) => {
    console.log(`Fetching ticket price for train ID: ${id}`);
    axios.get(`http://localhost:57549/api/trains/gettrain/${id}`)
      .then(response => {
        const ticketPrice1 = response.data.FirstClassTicketPrice;
        const ticketPrice2 = response.data.SecondClassTicketPrice; 
        const ticketPrice3 = response.data.ThirdClassTicketPrice; 
  
        setFormData(prevState => ({
          ...prevState,
          ticketPrice1, // Add ticket prices to the state
          ticketPrice2,
          ticketPrice3
        }));
      })
      .catch(error => {
        console.error('Error fetching ticket price:', error);
      });
  };    
  

  useEffect(() => {
    axios.get('http://localhost:57549/api/trains/getalltrains')
      .then(response => {
        setTrainData(response.data);
        calculateTotalPrice();
      })
      .catch(error => {
        console.error('Error fetching train data:', error);
      });
  }, [formData.TotalPassengers, formData.TicketClass]);

  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value
  //   });
  // };

  console.log('Form Data:', formData);
  console.log('UserID:', formData.UserID);
  console.log('TrainName:', formData.TrainName);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!IsValidNIC(formData.NIC)) {
      toast.error('Invalid NIC format.');
      return;
    }

    if (!IsValidContactNumber(formData.ContactNumber)) {
      toast.error('Invalid Contact Number format.');
      return;
    }

    if (!IsValidTicketClass(formData.TicketClass)) {
      toast.error('Invalid ticket Class format.');
      return;
    }

    setFormData({
      ...formData,
      BookingDate: getCurrentDate()
    });
  
    axios.post('http://localhost:57549/api/trainbooking/createticketbooking', formData)
      .then(response => {
        console.log('Reservation created:', response.data);
        toast.success("Reservation Added");
        setTimeout(() => {
        history.push('/travelagentdashboard');
        }, 2000)
      })
      .catch(error => {
        toast.error('Reservation date must be within 30 days from the current date.', error);
      });
  };

  return (
    <Container className="text-center mt-5" style={{width: "1200px", paddingLeft: "250px", marginBottom: "25px"}}>
      <ToastContainer position="top-center" autoClose={1000} hideProgressBar />
      <div className="container">
      <Card style={{ background: 'rgba(255, 255, 255, 0.7)', border: 'none' }}>
            <Card.Body>
              <Card.Title style={{ margin: "25px", fontFamily: "Dela Gothic One", fontSize: "34px" }}>Create Your Train Booking</Card.Title>
        <Form onSubmit={handleSubmit}>
          <div className="row">
            {/* Left Column */}
            <div className="col-md-6" style={{textAlign: "left"}}>
            <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Main Passenger Name</Form.Label>
              <Form.Control
                type="text"
                name="MainPassengerName"
                placeholder='main Passenger Name'
                style={{fontFamily: "Onest"}}
                value={formData.MainPassengerName}
                onChange={handleChange}
                required
              /><br />

<Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Email</Form.Label>
              <Form.Control
                type="Email"
                name="Email"
                value={formData.Email}
                style={{fontFamily: "Onest"}}
                onChange={handleChange}
                placeholder="Email"
                required
              /><br />

              <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Contact Number</Form.Label>
              <Form.Control
                type="text"
                name="ContactNumber"
                style={{fontFamily: "Onest"}}
                value={formData.ContactNumber}
                onChange={handleChange}
                placeholder="Contact Number"
                required
              /><br />
              
              <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Reservation Date</Form.Label>
              <Form.Control
                type="date"
                name="ReservationDate"
                placeholder='Reservation Date'
                style={{fontFamily: "Onest"}}
                value={formData.ReservationDate}
                onChange={handleChange}
                required
              /><br />
              <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Train Name</Form.Label>
              <Form.Group controlId="TrainName">
          <Form.Select
            name="TrainName"
            value={formData.TrainName}
            onChange={handleChange}
            style={{fontFamily: "Onest"}}
            required
          >
            <option value="">Select Train Name</option>
            {trainData.map(train => (
              <option key={train._id} value={train._id}>
                {train.TrainName}
              </option>
            ))}
          </Form.Select>

        </Form.Group>
              <br />
              
              
            </div>

            {/* Right Column */}
            <div className="col-md-6" style={{textAlign: "left"}}>
            <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Total Passengers</Form.Label>
            <Form.Group controlId="TotalPassengers">
  <Form.Control
    as="select"
    name="TotalPassengers"
    value={formData.TotalPassengers}
    style={{fontFamily: "Onest"}}
    disabled={inputsDisabled}
    onChange={handleChange}
    required
  >
    <option value="" disabled>Select Passengers Count</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
  </Form.Control>
</Form.Group>

              <br />
              <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Ticket Class</Form.Label>
              <Form.Group controlId="TicketClass">
  <Form.Control
    as="select"
    name="TicketClass"
    value={formData.TicketClass}
    style={{fontFamily: "Onest"}}
    disabled={inputsDisabled}
    onChange={handleChange}
    required
  >
    <option value="" disabled>Select Ticket Class</option>
    <option value="First Class">First Class</option>
    <option value="Second Class">Second Class</option>
    <option value="Third Class">Third Class</option>
  </Form.Control>
  </Form.Group>
              <br />

<Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Destination Station</Form.Label>
              <Form.Control
                type="text"
                name="DestinationStation"
                value={formData.DestinationStation}
                style={{fontFamily: "Onest"}}
                onChange={handleChange}
                placeholder='Destination Station'
                required
              /><br />

<Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Deaprture Station</Form.Label>
              <Form.Control
                type="text"
                name="DepartureStation"
                value={formData.DepartureStation}
                style={{fontFamily: "Onest"}}
                onChange={handleChange}
                placeholder='Departure Station'
                required
              /><br />

<Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>NIC</Form.Label>
              <Form.Control
                type="text"
                name="NIC"
                value={formData.NIC}
                style={{fontFamily: "Onest"}}
                onChange={handleChange}
                placeholder='NIC'
                required
              /><br />
            </div>
          </div>
          <br/>
          <Row>
            <Col>
          <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat", marginLeft: "200px"}}>Total Price</Form.Label>
          </Col>
          <Col>
              <Form.Control
                type="text"
                name="TotalPrice"
                style={{marginRight: "100px", width: "100px", fontFamily: "Onest"}}
                value={"Rs." + formData.TotalPrice + ".00"}
                onChange={handleChange}
                placeholder='Total Price'
                required
                disabled
              />
              </Col>
              </Row>


          <div className="text-center" style={{margin: "34px"}}>
            <Button variant="secondary" onClick={() => window.history.back()} style={{ width: '150px' }}>Back</Button>{' '}
            <Button type="submit" variant="primary" style={{ width: '150px' }}>Submit</Button>
          </div>
        </Form>
        </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default AddTrainTicketBooking;
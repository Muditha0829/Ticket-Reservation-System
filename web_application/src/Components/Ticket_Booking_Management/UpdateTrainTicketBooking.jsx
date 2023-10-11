import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../AuthContext';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { IsValidNIC, IsValidContactNumber, IsValidTicketClass } from '../Validations';

const UpdateTrainTicketBooking = () => {
  const { BookingID } = useParams();
  const { userId } = useContext(AuthContext);
  const [trainData, setTrainData] = useState([]);
  const [inputsDisabled, setInputsDisabled] = useState(true);
  const [updatedReservationData, setUpdatedReservationData] = useState({
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
    ContactNumber: '',
    TotalPrice: '',
    ticketPrice1: 0, // Initialize ticket prices
    ticketPrice2: 0,
    ticketPrice3: 0,
  });

  const history = useHistory();

  const calculateTotalPrice = () => {
    const ticketClass = updatedReservationData.TicketClass;
    const totalPassengers = parseInt(updatedReservationData.TotalPassengers);
  
    let TotalPrice = 0;
    if (ticketClass === 'First Class') {
      TotalPrice = totalPassengers * updatedReservationData.uticketPrice1;
    } else if (ticketClass === 'Second Class') {
      TotalPrice = totalPassengers * updatedReservationData.uticketPrice2;
    } else if (ticketClass === 'Third Class') {
      TotalPrice = totalPassengers * updatedReservationData.uticketPrice3;
    }
  
    console.log(`Ticket Class: ${ticketClass}`);
    console.log(`Total Passengers: ${totalPassengers}`);
    console.log(`Total Price: ${TotalPrice}`);
  
    setUpdatedReservationData({
      ...updatedReservationData,
      TotalPrice: TotalPrice.toString()
    });
  };  

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'TrainName') {
      console.log('Selected Train Name:', value); // Add this line
      setUpdatedReservationData({
        ...updatedReservationData,
        [name]: value,
      });
  
      fetchTicketPrice(value);
      setInputsDisabled(false);
    } else {
      console.log('Other Field Name:', name); // Add this line
      console.log('Other Field Value:', value); // Add this line
      setUpdatedReservationData({
        ...updatedReservationData,
        [name]: value,
      });
  
      if (value === 'TicketClass' || value === 'TotalPassengers') {
        calculateTotalPrice();
      }
    }
  };  

  const fetchTicketPrice = (id) => {
    axios.get(`http://localhost:57549/api/trains/gettrain/${id}`)
      .then(response => {
        const uticketPrice1 = response.data.FirstClassTicketPrice;
        const uticketPrice2 = response.data.SecondClassTicketPrice; 
        const uticketPrice3 = response.data.ThirdClassTicketPrice; 
  
        setUpdatedReservationData(prevState => ({
          ...prevState,
          uticketPrice1,
          uticketPrice2,
          uticketPrice3
        }));
      })
      .catch(error => {
        console.error('Error fetching ticket price:', error);
      });
  };     

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!IsValidNIC(updatedReservationData.NIC)) {
      toast.error('Invalid NIC format.');
      return;
    }

    if (!IsValidContactNumber(updatedReservationData.ContactNumber)) {
      toast.error('Invalid Contact Number format.');
      return;
    }

    if (!IsValidTicketClass(updatedReservationData.TicketClass)) {
      toast.error('Invalid ticket Class format.');
      return;
    }

    const ReservationDateObj = new Date(updatedReservationData.ReservationDate);
    const BookingDateObj = new Date(updatedReservationData.BookingDate);
    const differenceInMilliseconds = ReservationDateObj - BookingDateObj;
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

    axios.put(`http://localhost:57549/api/trainbooking/updateticketbooking/${BookingID}`, updatedReservationData)
      .then(response => {
        console.log('Reservation updated:', response.data);
        toast.success('Reservation updated successfully!');
        setTimeout(() => {
        history.push('/listreservation');
        }, 2000)
      })
      .catch(error => {
        console.error('Error:', error);
        toast.error('Reservation can only be updated if reservation date is more than 5 days after booking date.');
      });
  };

  useEffect(() => {
    if (BookingID) {
      axios.get(`http://localhost:57549/api/trainbooking/getticketbooking/${BookingID}`)
        .then(response => {
          setUpdatedReservationData(response.data);
        })
        .catch(error => {
          console.error('Error fetching reservation data:', error);
        });
    }
  }, [BookingID]);
  
  useEffect(() => {
    let isMounted = true;

    axios.get('http://localhost:57549/api/trains/getallsheduledtrains')
      .then(response => {
        if (isMounted) {
          setTrainData(response.data);
          calculateTotalPrice();
        }
      })
      .catch(error => {
        console.error('Error fetching train data:', error);
      });
  
    return () => {
      isMounted = false;
    };
  }, [updatedReservationData.TotalPassengers, updatedReservationData.TicketClass]);

  return (
    <Container className="my-5 text-center" style={{width: "75%", paddingLeft: "250px"}}>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
  <Card style={{ background: 'rgba(255, 255, 255, 0.7)', border: 'none' }}>
            <Card.Body>
              <Card.Title style={{ margin: "25px", fontFamily: "Dela Gothic One", fontSize: "34px" }}>Update Trian Booking</Card.Title>
              
                
  <Form onSubmit={handleSubmit}>
  <div className="row">
  <div className="col-md-6" style={{textAlign: "left"}}>
    <Form.Group style={{textAlign:"left", margin: "25px"}}>
      <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Main Passenger Name</Form.Label>
      <Form.Control
        type="text"
        name="TravelerName"
        value={updatedReservationData.MainPassengerName}
        onChange={handleChange}
        placeholder="Main Passenger Name"
        style={{fontFamily: "Onest"}}
        required
      />
    </Form.Group>
    <Form.Group style={{textAlign:"left", margin: "25px"}}>
      <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Email:</Form.Label>
      <Form.Control
        type="Email"
        name="Email"
        value={updatedReservationData.Email}
        style={{fontFamily: "Onest"}}
        onChange={handleChange}
        placeholder="Email"
        required
      />
    </Form.Group>
    <Form.Group style={{textAlign:"left", margin: "25px"}}> 
      <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Contact Number</Form.Label>
      <Form.Control
        type="tel"
        name="Phone"
        value={updatedReservationData.ContactNumber}
        style={{fontFamily: "Onest"}}
        onChange={handleChange}
        placeholder="Contact Number"
        required
      />
    </Form.Group>
    
    <Form.Group controlId="TrainName" style={{textAlign:"left", margin: "25px"}}>
      <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Train Name</Form.Label>
      <Form.Select
        name="TrainName"
        style={{fontFamily: "Onest"}}
        value={updatedReservationData.TrainName}
        onChange={handleChange}
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
    <Form.Group style={{textAlign:"left", margin: "25px"}}>
      <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Reservation Date</Form.Label>
      <Form.Control
  type="date"
  name="ReservationDate"
  placeholder='Reservation Date'
  style={{fontFamily: "Onest"}}
  value={updatedReservationData.ReservationDate}
  onChange={handleChange}
  required
/>
    </Form.Group>
    
    </div>
    <div className="col-md-6" style={{textAlign: "left"}}>

    <Form.Group style={{textAlign:"left", margin: "25px"}}>
      <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>NIC</Form.Label>
      <Form.Control
        type="text"
        name="NIC"
        style={{fontFamily: "Onest"}}
        value={updatedReservationData.NIC}
        onChange={handleChange}
        placeholder="NIC"
        required
      />
    </Form.Group>

    <Form.Group controlId="TotalPassengers" style={{textAlign:"left", margin: "25px"}}>
      <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Total Passengers</Form.Label>
      <Form.Select
        name="TotalPassengers"
        style={{fontFamily: "Onest"}}
       
        disabled={inputsDisabled}
        onChange={handleChange}
        required
      >value={updatedReservationData.TotalPassengers}
        <option value="">Select total passengers</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </Form.Select>
    </Form.Group>
    
    <Form.Group controlId="TicketClass" style={{textAlign:"left", margin: "25px"}}>
      <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Ticket Class:</Form.Label>
      <Form.Select
        name="TicketClass"
        style={{fontFamily: "Onest"}}
        value={updatedReservationData.TicketClass}
        disabled={inputsDisabled}
        onChange={handleChange}
        required
      >
        <option value="">Select Ticket Class</option>
        <option value="First Class">First Class</option>
        <option value="Second Class">Second Class</option>
        <option value="Third Class">Third Class</option>
      </Form.Select>
    </Form.Group>

    <Form.Group style={{textAlign:"left", margin: "25px"}}>
      <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Departure Station</Form.Label>
      <Form.Control
        type="text"
        name="DepartureStation"
        style={{fontFamily: "Onest"}}
        value={updatedReservationData.DepartureStation}
        onChange={handleChange}
        placeholder="Departure Station"
        required
      />
    </Form.Group>

    <Form.Group style={{textAlign:"left", margin: "25px"}}>
      <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat"}}>Destination Station</Form.Label>
      <Form.Control
        type="text"
        style={{fontFamily: "Onest"}}
        name="DestinationStation"
        value={updatedReservationData.DestinationStation}
        onChange={handleChange}
        placeholder="Destination Station"
        required
      />
    </Form.Group>
    
        </div>
        </div>
        <Form.Group style={{textAlign:"left", margin: "25px"}}>
        <Row>
            <Col>
      <Form.Label style={{fontSize: "17px", fontFamily: "Montserrat", marginLeft: "200px"}}>Total Price</Form.Label>
      </Col>
      <Col>
      <Form.Control
        type="text"
        style={{fontFamily: "Onest", marginRight: "100px", width: "100px"}}
        name="TotalPrice"
        value={"Rs: "+updatedReservationData.TotalPrice+ ".00"}
        onChange={handleChange}
        placeholder="Total Price"
        required
        disabled
      />
      </Col>
      </Row>
    </Form.Group>
        <Row className="mb-3" style={{margin: "25px"}}>
          <Col md={0} className="mx-auto">
            <Button variant="secondary" onClick={() => window.history.back()} style={{ width: '150px' }}>Back</Button>{' '}
            <Button variant="primary" type="submit" style={{ width: '150px' }}>Update Booking</Button>
          </Col>
        </Row>
  </Form>
  
  
  </Card.Body>
  </Card>
  
</Container>
  );
};

export default UpdateTrainTicketBooking;
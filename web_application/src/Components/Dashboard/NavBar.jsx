import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../AuthContext';
import { FaUser } from 'react-icons/fa';

const NavBar = () => {
  // Get userId and UserType from AuthContext
  const { userId, UserType } = useContext(AuthContext);

  return (
    <Navbar style={{ backgroundColor: '#b3daff', marginBottom: "25px", height: "75px", fontFamily: "Dela Gothic One", fontSize: "23px", border: "1px solid #00284d", color: "#00284d" }} className="justify-content-between">
      {/* Section for Travel Agents */}
      <Nav className="m3-auto">
        {UserType === 'TravelAgent' && (
          <>
            <Nav.Link as={Link} to="/addticketbooking" style={{padding: "34px", color: "#00284d", marginLeft: "278px"}}>Add Train Booking</Nav.Link>
            <Nav.Link as={Link} to="/addtraveler" style={{padding: "34px", color: "#00284d"}}>Add Traveler</Nav.Link>
          </>
        )}
      </Nav>

      {/* Section for Back Office Users */}
      <Nav className="m3-auto">
        {UserType === 'BackOfficeUser' && (
          <>
            <Nav.Link as={Link} to="/addtrainshedule" style={{padding: "34px", color: "#00284d", marginRight: "740px"}}>Add Train</Nav.Link>
          </>
        )}
      </Nav>

      {/* Section for User Profile */}
      <Nav>
        <Nav.Link as={Link} to={`/userprofile/${userId}`} style={{padding: "34px", color: "#00284d"}}>
          <FaUser style={{ marginRight: '8px' }} />
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavBar;
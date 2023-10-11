import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../AuthContext';
import Cookies from 'js-cookie';
import { FaUser } from 'react-icons/fa';

const NavBar = () => {
  const { userId, setUser, UserType } = useContext(AuthContext);
  const history = useHistory();

  return (
    <Navbar style={{ backgroundColor: '#b3daff', marginBottom: "25px", height: "75px", fontFamily: "Dela Gothic One", fontSize: "23px", border: "1px solid #00284d", color: "#00284d" }} className="justify-content-between">
      <Navbar.Brand as={Link} to="#" style={{marginLeft: "1px"}}>
        <img
          src="https://melbournesptgallery.weebly.com/uploads/1/9/9/4/19942089/mptg-avatar-2020-yellow-15_orig.jpg"
          width="47"
          height="47"
          className="d-inline-block align-top"
          alt="Logo"
        />
      </Navbar.Brand>
      <Nav className="m3-auto">
        {UserType === 'TravelAgent' && (
          <>
                <Nav.Link as={Link} to="/makereservation" style={{padding: "34px", color: "#00284d"}}>Add Train Booking</Nav.Link>
              <Nav.Link as={Link} to="/addtraveluser" style={{padding: "34px", color: "#00284d"}}>Add Traveler</Nav.Link>
          </>
        )}
      </Nav>
      <Nav className="m3-auto">
        {UserType === 'BackOfficeUser' && (
          <>
              <Nav.Link as={Link} to="/addtrain" style={{padding: "34px", color: "#00284d", marginRight: "740px"}}>Add Train</Nav.Link>
          </>
        )}
      </Nav>
      <Nav>
      <Nav.Link as={Link} to={`/profile/${userId}`} style={{padding: "34px", color: "#00284d"}}>
  <FaUser style={{ marginRight: '8px' }} />
</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavBar;
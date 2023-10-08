// Sidebar.jsx

import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../AuthContext';
import Cookies from 'js-cookie';
import imglogo from '../Assests/logo.png'

const SideBar = () => {
  const { userId, setUser, UserType } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = () => {
    Cookies.remove('userId');
    setUser(null);
    history.push('/');
    window.location.href = "/";
  };

  return (
    <div style={{ width: '250px', height: '100%', backgroundColor: '#003300', position: 'fixed', top: '0', left: '0', fontFamily: "Dela Gothic One", fontSize: "23px" }}>
      {/* Logo */}
      <div style={{ padding: '15px', textAlign: 'center' }}>
        <img
          src={imglogo}
          alt="Logo"
          style={{ width: '200px', height: '200px', borderRadius: '50%' }}
        />
      </div>

      <Nav className="flex-column">
        {UserType === 'travelagent' && (
          <>
            <Nav.Link as={Link} to="/travelagentdashboard" style={{ color: "white", padding: "15px", textAlign: "center" }}>Home</Nav.Link>
            {/* <Nav.Link as={Link} to="/makereservation" style={{ color: "white", padding: "15px", textAlign: "center" }}>Add Reservation</Nav.Link> */}
            <Nav.Link as={Link} to="/listreservation" style={{ color: "white", padding: "15px", textAlign: "center" }}>Booking Management</Nav.Link>
            {/* <Nav.Link as={Link} to="/addtraveluser" style={{ color: "white", padding: "15px", textAlign: "center" }}>Add Traveller</Nav.Link> */}
            <Nav.Link as={Link} to="/listtraveluser" style={{ color: "white", padding: "15px", textAlign: "center" }}>Traveller Management</Nav.Link>
          </>
        )}
        {UserType === 'backofficeuser' && (
          <>
            <Nav.Link as={Link} to="/backofficeuserdashboard" style={{ color: "white", padding: "15px", textAlign: "center" }}>Home</Nav.Link>
            {/* <Nav.Link as={Link} to="/addtrain" style={{ color: "white", padding: "15px", textAlign: "center" }}>Add Train</Nav.Link> */}
            <Nav.Link as={Link} to="/listtrain" style={{ color: "white", padding: "15px", textAlign: "center" }}>Train Management</Nav.Link>
            <Nav.Link as={Link} to="/traveluserstatus" style={{ color: "white", padding: "15px", textAlign: "center" }}>Traveler Status</Nav.Link>
          </>
        )}
        <Nav.Link onClick={handleLogout} style={{ color: "white", padding: "15px", textAlign: "center", marginTop: "140px" }}>SignOut</Nav.Link>
      </Nav>
    </div>
  );
};

export default SideBar;
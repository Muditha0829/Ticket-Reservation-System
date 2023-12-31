import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../AuthContext';
import Cookies from 'js-cookie';
import imglogo from '../Assests/logo.png'

const SideBar = () => {
  const { setUser, UserType } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = () => {
    // Remove userId cookie and set user to null
    Cookies.remove('userId');
    setUser(null);
    history.push('/');
    window.location.href = "/"; // Redirect to home
  };

  return (
    <div style={{ width: '250px', height: '100%', backgroundColor: '#00284d', position: 'fixed', top: '0', left: '0', fontFamily: "Dela Gothic One", fontSize: "23px" }}>
      {/* Logo */}
      <div style={{ padding: '15px', textAlign: 'center' }}>
        <img
          src={imglogo}
          alt="Logo"
          style={{ width: '200px', height: '200px', borderRadius: '50%' }}
        />
      </div>

      <Nav className="flex-column">
        {UserType === 'TravelAgent' && (
          <>
            <Nav.Link as={Link} to="/travelagentdashboard" style={{ color: "white", padding: "15px", textAlign: "center" }}>Home</Nav.Link>
            <Nav.Link as={Link} to="/getmyticketbookings" style={{ color: "white", padding: "15px", textAlign: "center" }}>My Bookings</Nav.Link>
            <Nav.Link as={Link} to="/getallticketbookings" style={{ color: "white", padding: "15px", textAlign: "center" }}>Booking Management</Nav.Link>
            <Nav.Link as={Link} to="/travelerlist" style={{ color: "white", padding: "15px", textAlign: "center" }}>Traveler Management</Nav.Link>
          </>
        )}
        {UserType === 'BackOfficeUser' && (
          <>
            <Nav.Link as={Link} to="/backofficeuserdashboard" style={{ color: "white", padding: "15px", textAlign: "center" }}>Home</Nav.Link>
            <Nav.Link as={Link} to="/trainshedulelist" style={{ color: "white", padding: "15px", textAlign: "center" }}>Train Management</Nav.Link>
            <Nav.Link as={Link} to="/travelerstatus" style={{ color: "white", padding: "15px", textAlign: "center" }}>Traveler Status</Nav.Link>
          </>
        )}
        <Nav.Link onClick={handleLogout} style={{ color: "white", padding: "15px", textAlign: "center", marginTop: "27px" }}>SignOut</Nav.Link>
      </Nav>
    </div>
  );
};

export default SideBar;
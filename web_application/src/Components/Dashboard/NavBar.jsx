import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../AuthContext';
import Cookies from 'js-cookie';

const NavBar = () => {
  const { userId, setUser, UserType } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = () => {
    Cookies.remove('userId');
    setUser(null);
    history.push('/');
    window.location.href = "/";
  };

  return (
    <Navbar style={{ backgroundColor: '#003300', marginBottom: "25px", height: "75px", fontFamily: "MyCustomFont, sans-serif", fontSize: "17px" }} variant="dark" className="justify-content-between">
      <Navbar.Brand as={Link} to="#" style={{marginLeft: "25px"}}>
        <img
          src="https://melbournesptgallery.weebly.com/uploads/1/9/9/4/19942089/mptg-avatar-2020-yellow-15_orig.jpg"
          width="47"
          height="47"
          className="d-inline-block align-top"
          alt="Logo"
        />
      </Navbar.Brand>
      <Nav className="ml-auto">
        {UserType === 'travelagent' && (
          <>
            <Nav.Link as={Link} to="/travelagentdashboard" style={{padding: "34px"}}>Home</Nav.Link>
            <NavDropdown title="Reservation Management" style={{padding: "25px"}}>
                <NavDropdown.Item as={Link} to="/makereservation" style={{padding: "25px"}}>Add Reservation</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/listreservation" style={{padding: "25px"}}>Reservation List</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Travel User Management" style={{padding: "25px"}}>
              <NavDropdown.Item as={Link} to="/addtraveluser" style={{padding: "25px"}}>Add Traveller</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/listtraveluser" style={{padding: "25px"}}>Travel user List</NavDropdown.Item>
              </NavDropdown>
            {/* <Nav.Link as={Link} to={`/profile/${userId}`} style={{padding: "34px"}}>Profile</Nav.Link> */}
          </>
        )}
      </Nav>
      <Nav className="mr-auto">
        {UserType === 'backofficeuser' && (
          <>
            <Nav.Link as={Link} to="/backofficeuserdashboard" style={{padding: "34px"}}>Home</Nav.Link>
            <NavDropdown title="Train Management" style={{padding: "25px"}}>
              <NavDropdown.Item as={Link} to="/addtrain" style={{padding: "25px"}}>Add Train</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/listtrain" style={{padding: "25px"}}>Train List</NavDropdown.Item>
              </NavDropdown>
            <Nav.Link as={Link} to="/traveluserstatus" style={{padding: "34px"}}>Travel Users</Nav.Link>
            {/* <Nav.Link as={Link} to={`/profile/${userId}`} style={{padding: "34px"}}>Profile</Nav.Link> */}
          </>
        )}
      </Nav>
      <Nav>
        <Nav.Link onClick={handleLogout} style={{ color: "white", marginRight: "25px", padding: "25px"}}>Signout</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavBar;
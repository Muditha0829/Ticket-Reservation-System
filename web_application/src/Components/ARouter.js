import React from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import { UserProvider } from './AuthContext';

import NavBar from '../Components/Dashboard/NavBar';
import Footer from './Dashboard/Footer';

import SignIn from './User_Management/SignIn';
import Signup from './User_Management/SignUp';
import UserProfile from '../Components/User_Management/UserProfile';
import UpdateUserProfile from './User_Management/UpdateUserProfile';

import AddTrain from './Train_Management/AddTrain';
import UpdateTrain from './Train_Management/UpdateTrain';
import GetTrain from './Train_Management/GetTrain';
import GetAllTrain from './Train_Management/GetAllTrain';

import AddTrainTicketBooking from './Train_Ticket_Booking_Management/AddTrainTicketBooking';
import UpdateTrainTicketBooking from './Train_Ticket_Booking_Management/UpdateTrainTicketBooking';
import GetTrainTicketBooking from './Train_Ticket_Booking_Management/GetTrainTicketBooking';
import GetAllTrainTicketBooking from './Train_Ticket_Booking_Management/GetAllTrainTicketBooking';

import Traveler from './Traveler_Management/BackOfficeUser/Traveler';

import AddTraveler from './Traveler_Management/TravelAgent/AddTraveler';
import UpdateTraveler from './Traveler_Management/TravelAgent/UpdateTraveler';
import GetTraveler from './Traveler_Management/TravelAgent/GetTraveler';
import GetAllTravelers from './Traveler_Management/TravelAgent/GetAllTravelers';

import BackOfficeUserDashboard from './Dashboard/BackOfficeUserDashboard';
import TravelAgentDashboard from './Dashboard/TravelAgentDashboard';

const ARouter = () => {
  const location = useLocation();

  const hideNavbarRoutes = ['/', '/signup'];
  const hideFooterRoutes = ['/', '/signup'];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);
  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <Router>
      <UserProvider>
        {!shouldHideNavbar && <NavBar />}
        <Switch>
          <Route path="/listtrain" exact component={GetAllTrain} />
          <Route path="/view/:trainID" component={GetTrain} />
          <Route path="/update/:trainID" component={UpdateTrain} />
          <Route path="/addtrain" component={AddTrain}/>
          <Route path="/listreservation" component={GetAllTrainTicketBooking}/>
          <Route path="/makereservation" component={AddTrainTicketBooking}/>
          <Route path="/reservationview/:reservationID" component={GetTrainTicketBooking} />
          <Route path="/reservationupdate/:reservationID" component={UpdateTrainTicketBooking} />
          <Route path="/profile/:userId" component={UserProfile} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/" exact component={SignIn} />
          <Route path="/updateprofile/:userId" component={UpdateUserProfile} />
          <Route path="/traveluserstatus" component={Traveler} />
          <Route path="/listtraveluser" component={GetAllTravelers} />
          <Route path="/updatetraveller/:userId" component={UpdateTraveler} />
          <Route path="/viewtraveller/:userId" component={GetTraveler} />
          <Route path="/addtraveluser" component={AddTraveler} />
          <Route path="/backofficeuserdashboard" component={BackOfficeUserDashboard} />
          <Route path="/travelagentdashboard" component={TravelAgentDashboard} />
          <Route path="/footer" component={Footer} />
        </Switch>
        {!shouldHideFooter && <Footer />}
      </UserProvider>
    </Router>
  );
};

export default ARouter;
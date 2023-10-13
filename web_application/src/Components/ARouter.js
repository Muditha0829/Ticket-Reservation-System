import React from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import { UserProvider } from './AuthContext';

import NavBar from '../Components/Dashboard/NavBar';

import Footer from './Dashboard/Footer';

import SignIn from './User_Management/SignIn';
import Signup from './User_Management/SignUp';
import UserProfile from '../Components/User_Management/UserProfile';
import UpdateUserProfile from './User_Management/UpdateUserProfile';

import AddTrainShedule from './Train_Management/AddTrainShedule';
import UpdateTrainShedule from './Train_Management/UpdateTrainShedule';
import GetTrainShedule from './Train_Management/GetTrainShedule';
import GetAllTrainShedules from './Train_Management/GetAllTrainShedules';

import AddTrainTicketBooking from './Ticket_Booking_Management/AddTrainTicketBooking';
import UpdateTrainTicketBooking from './Ticket_Booking_Management/UpdateTrainTicketBooking';
import GetTrainTicketBooking from './Ticket_Booking_Management/GetTrainTicketBooking';
import GetMyTrainTicketBooking from './Ticket_Booking_Management/GetMyTrainTicketBooking';
import GetAllTrainTicketBookings from './Ticket_Booking_Management/GetAllTrainTicketBookings';

import Traveler from './Traveler_Management/BackOfficeUser/Traveler';

import AddTraveler from './Traveler_Management/TravelAgent/AddTraveler';
import UpdateTraveler from './Traveler_Management/TravelAgent/UpdateTraveler';
import GetTraveler from './Traveler_Management/TravelAgent/GetTraveler';
import GetAllTravelers from './Traveler_Management/TravelAgent/GetAllTravelers';

import BackOfficeUserDashboard from './Dashboard/BackOfficeUserDashboard';
import TravelAgentDashboard from './Dashboard/TravelAgentDashboard';

import SideBar from './Dashboard/SideBar';

const ARouter = () => {
  // Get the current location
  const location = useLocation();

  // Define routes to hide Navbar, Sidebar, and Footer components
  const hideNavbarRoutes = ['/', '/signup'];
  const hideSideBarRoutes = ['/', '/signup'];
  const hideFooterRoutes = ['/', '/signup'];

  // Determine if Navbar, Sidebar, and Footer should be hidden
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);
  const shouldHideSideBar = hideSideBarRoutes.includes(location.pathname);
  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <Router>
      <UserProvider>
        {/* Render NavBar unless shouldHideNavbar is true */}
        {!shouldHideNavbar && <NavBar />}

        {/* Render SideBar unless shouldHideSideBar is true */}
        {!shouldHideSideBar && <SideBar />}
        <Switch>
          <Route path="/signup" exact component={Signup} />
          <Route path="/" exact component={SignIn} />
          <Route path="/updateuserprofile/:UserID" component={UpdateUserProfile} />
          <Route path="/userprofile/:userId" component={UserProfile} />

          <Route path="/addtrainshedule" component={AddTrainShedule}/>
          <Route path="/updatetrainshedule/:TrainID" component={UpdateTrainShedule} />
          <Route path="/viewtrainshedule/:TrainID" component={GetTrainShedule} />
          <Route path="/trainshedulelist" exact component={GetAllTrainShedules} />
          
          <Route path="/addticketbooking" component={AddTrainTicketBooking}/>
          <Route path="/updateticketbooking/:BookingID" component={UpdateTrainTicketBooking} />
          <Route path="/getticketbooking/:BookingID" component={GetTrainTicketBooking} />
          <Route path="/getmyticketbookings" component={GetMyTrainTicketBooking}/>
          <Route path="/getallticketbookings" component={GetAllTrainTicketBookings}/>

          <Route path="/travelerstatus" component={Traveler} />

          <Route path="/addtraveler" component={AddTraveler} />
          <Route path="/updatetraveller/:UserID" component={UpdateTraveler} />
          <Route path="/viewtraveller/:UserID" component={GetTraveler} />
          <Route path="/travelerlist" component={GetAllTravelers} />

          <Route path="/backofficeuserdashboard" component={BackOfficeUserDashboard} />
          <Route path="/travelagentdashboard" component={TravelAgentDashboard} />

          <Route path="/footer" component={Footer} />
        </Switch>
        {/* Render Footer unless shouldHideFooter is true */}
        {!shouldHideFooter && <Footer />}
      </UserProvider>
    </Router>
  );
};

export default ARouter;
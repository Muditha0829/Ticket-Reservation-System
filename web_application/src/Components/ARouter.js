import React from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import { UserProvider } from './AuthContext';

 // Navbar file path
import NavBar from '../Components/Dashboard/NavBar';

// Footer file path
import Footer from './Dashboard/Footer';

// SignIn file path
import SignIn from './User_Management/SignIn';
// Signup file path
import Signup from './User_Management/SignUp';
// UserProfile file path
import UserProfile from '../Components/User_Management/UserProfile';
// UpdateUserProfile file path
import UpdateUserProfile from './User_Management/UpdateUserProfile';

// AddTrainShedule file path
import AddTrainShedule from './Train_Management/AddTrainShedule';
// UpdateTrainShedule file path
import UpdateTrainShedule from './Train_Management/UpdateTrainShedule';
// GetTrainShedule file path
import GetTrainShedule from './Train_Management/GetTrainShedule';
// GetAllTrainShedules file path
import GetAllTrainShedules from './Train_Management/GetAllTrainShedules';

// AddTrainTicketBooking file path
import AddTrainTicketBooking from './Ticket_Booking_Management/AddTrainTicketBooking';
// UpdateTrainTicketBooking file path
import UpdateTrainTicketBooking from './Ticket_Booking_Management/UpdateTrainTicketBooking';
// GetTrainTicketBooking file path
import GetTrainTicketBooking from './Ticket_Booking_Management/GetTrainTicketBooking';
// GetMyTrainTicketBooking file path
import GetMyTrainTicketBooking from './Ticket_Booking_Management/GetMyTrainTicketBooking';
// GetAllTrainTicketBookings file path
import GetAllTrainTicketBookings from './Ticket_Booking_Management/GetAllTrainTicketBookings';

// Traveler file path
import Traveler from './Traveler_Management/BackOfficeUser/Traveler';

// AddTraveler file path
import AddTraveler from './Traveler_Management/TravelAgent/AddTraveler';
// UpdateTraveler file path
import UpdateTraveler from './Traveler_Management/TravelAgent/UpdateTraveler';
// GetTraveler file path
import GetTraveler from './Traveler_Management/TravelAgent/GetTraveler';
// GetAllTravelers file path
import GetAllTravelers from './Traveler_Management/TravelAgent/GetAllTravelers';

// BackOfficeUserDashboard file path
import BackOfficeUserDashboard from './Dashboard/BackOfficeUserDashboard';
// TravelAgentDashboard file path
import TravelAgentDashboard from './Dashboard/TravelAgentDashboard';

// SideBar file path
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
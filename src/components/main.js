import React from 'react';                            /*used instead of BrowserRouter to switch between pages */
import { Switch, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage.js';
import Anon from './pages/AnonymousVoting/AnonymousV.js';
import Voting from './pages/Voting/Voting';
import LogIn from './pages/Login/login';
import signUp from './pages/SignUp/signUp';
import AboutUs from './pages/AboutUs/AboutUs';
import ForgotPassword from './pages/PasswordReset/ForgotPassword';
import RequestSent from './pages/PasswordResetConfirmation/RequestSent';
import Search from './pages/Search/Search';
import Profile from './pages/Profile/Profile';
import ChangePassword from './pages/ChangePassword/ChangePassword';
import ContactUs from './pages/ContactUs/ContactUs';
import VotingAlt from "./pages/Voting/VotingAlt";

const Main = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route path="/signUp" component={signUp} />
    <Route path="/login" component={LogIn} />
    <Route path="/Voting" component={Voting} />
    <Route path="/AboutUs" component={AboutUs} />
    <Route path="/ForgotPassword" component={ForgotPassword} />
    <Route path="/RequestSent" component={RequestSent} />
    <Route path="/ChangePassword" component={ChangePassword} />
    <Route path="/AnonymousV" component={Anon}/>
    <Route path="/Search" component={Search}/>
    <Route path="/Profile" component={Profile}/>
    <Route path="/ContactUs" component={ContactUs}/>
    <Route path="/VotingAlt" component={VotingAlt}/>
  </Switch>
)

export default Main;
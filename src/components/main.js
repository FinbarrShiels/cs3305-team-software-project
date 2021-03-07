import React from 'react';                            /*used instead of BrowserRouter to switch between pages */
import { Switch, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage.js';
import AnonymousV from './pages/AnonymousVoting/AnonymousV.js';
import LogIn from './pages/Login/login';
import signUp from './pages/SignUp/signUp';
import AboutUs from './pages/AboutUs/AboutUs';
import ForgotPassword from './pages/PasswordReset/ForgotPassword';
import RequestSent from './pages/PasswordResetConfirmation/RequestSent';
import Search from './pages/Search/Search';
import Profile from './pages/Profile/Profile';
import ChangePassword from './pages/ChangePassword/ChangePassword';
import ContactUs from './pages/ContactUs/ContactUs';
import Organise from "./pages/Voting/Organise";
import LatchPage from "./pages/latchPage";
import PasswordChanged from "./pages/PasswordReset/PasswordChanged";
import SignUpComplete from "./pages/SignUp/SignUpComplete";
import Vote from './pages/Voting/Vote.js';

const Main = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route path="/signUp" component={signUp} />
    <Route path="/login" component={LogIn} />
    <Route path="/AboutUs" component={AboutUs} />
    <Route path="/ForgotPassword" component={ForgotPassword} />
    <Route path="/RequestSent" component={RequestSent} />
    <Route path="/ChangePassword" component={ChangePassword} />
    <Route path="/AnonymousV" component={AnonymousV}/>
    <Route path="/Search" component={Search}/>
    <Route path="/Profile" component={Profile}/>
    <Route path="/ContactUs" component={ContactUs}/>
    <Route path="/organise" component={Organise}/>
    <Route path="/latchPage" component={LatchPage}/>
    <Route path="/PasswordChanged" component={PasswordChanged}/>
    <Route path="/SignUpComplete" component={SignUpComplete}/>
    <Route path="/Vote" component={Vote}/>
  </Switch>
)

export default Main;
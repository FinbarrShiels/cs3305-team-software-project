import React from 'react';                            /*used instead of BrowserRouter to switch between pages */
import { Switch, Route } from 'react-router-dom';
import LandingPage from './landingpage';
import Anon from './AnonymousV.js';
import Voting from './Voting';
import LogIn from './login';
import signUp from './signUp';
import AboutUs from './AboutUs';
import ForgotPassword from './ForgotPassword';
import RequestSent from './RequestSent';
import Search from './Search';
import Profile from './Profile';


const Main = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route path="/signUp" component={signUp} />
    <Route path="/login" component={LogIn} />
    <Route path="/Voting" component={Voting} />
    <Route path="/AboutUs" component={AboutUs} />
    <Route path="/ForgotPassword" component={ForgotPassword} />
    <Route path="/RequestSent" component={RequestSent} />
    <Route path="/AnonymousV" component={Anon} />
    <Route path="/Search" component={Search} />
    <Route path="/Profile" component={Profile} />
  </Switch>
)

export default Main;
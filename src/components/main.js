import React from 'react';                            /*used instead of BrowserRouter to switch between pages */
import { Switch, Route } from 'react-router-dom';
import LandingPage from './landingpage';
import Anon from './AnonymousV.js';
import Voting from './Voting';
import LogIn from './login';
import signUp from './signUp';
import AboutUs from './AboutUs';
import ForgotPassword from './ForgotPassword';


const Main = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route path="/signUp" component={signUp} />
    <Route path="/login" component={LogIn} />
    <Route path="/Voting" component={Voting} />
    <Route path="/AboutUs" component={AboutUs} />
    <Route path="/ForgotPassword" component={ForgotPassword} />
    <Route path="/AnonymousV" component={Anon} />
  </Switch>
)

export default Main;
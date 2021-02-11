import React, { Component } from 'react';
import './login.css';
import loginLogo from './id-card.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class LogIn extends Component {
  render() {
    return(
      // <div><h1>Once logged in , this could change to Myprofile :\</h1></div>
      <div className="loginContainer">
        <div className="mainLogin">
            <div className="title">
                <img src={loginLogo} alt="loginLogo"/>
            </div>
            <form className="loginForm">
              <input className="loginFormInput" type="text" placeholder="Username"></input>
              <br/>
              <input className="loginFormInput" type="password" placeholder="Password"></input>
              <br/>
              <input className="btn" type="submit" value="Login"></input>
            </form>
            <div className="loginOptionBreak">
                <p><span>Or Sign In With</span></p>
            </div>

            <div className="thirdPartyLogins">
                {/* <p>Third party portal logins go here</p> */}
                <a href="/" className="socialIcon">
                    <FontAwesomeIcon icon={['fab', 'facebook-f']}/>
                </a>
                <a href="/" className="socialIcon">
                    <FontAwesomeIcon icon={['fab', 'google']}/>
                </a>
                <a href="/" className="socialIcon">
                    <FontAwesomeIcon icon={['fab', 'twitter']}/>
                </a>
            </div>

            <div className="bottomOptionButtons">
                <a href="/login">Create Account</a>
                <a href="/ForgotPassword">Forgot Password</a>
            </div>
        </div>
      </div>
    )
  }
}

export default LogIn;
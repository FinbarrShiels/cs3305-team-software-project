import React, { useState } from 'react';
import './login.css';
import loginLogo from '../../Images/id-card.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { firebaseTwitterLogIn, firebaseFacebookLogIn, firebaseGoogleLogIn, firebaseRegularLogIn } from '../../../firebaseFunctions/auth';
import { useInput } from '../../../customHooks/form-input.js';
import FormError from '../../formError';

function LogIn() {
  const [ formErrors, setFormErrors ] = useState(() => ({
    username: "",
    password: ""
  }))

  const { value:username, bind:bindUsername, reset:resetUsername } = useInput('');
  const { value:password, bind:bindPassword, reset:resetPassword } = useInput('');

  const handleSubmit = (e) => {
    e.preventDefault();
    regularLogin(e);
    resetUsername();
    resetPassword();
  }

  return(
    <div className="loginContainer">
      <div className="mainLogin">
        <div className="title">
            <img src={loginLogo} alt="loginLogo"/>
        </div>

        <form className="loginForm" onSubmit={handleSubmit}>
          <FormError errorMsg={formErrors.username}/>
          <input 
            className="loginFormInput" 
            type="text" 
            placeholder="Username" 
            {...bindUsername} />
          <br/>
          <FormError errorMsg={formErrors.password}/>
          <input 
            className="loginFormInput" 
            type="password" 
            placeholder="Password"
            {...bindPassword} />
          <br/>
          <input 
            className="btn" 
            type="submit" 
            value="Login" />
        </form>


        <div className="loginOptionBreak">
            <p><span>Or Sign In With</span></p>
        </div>

        <div className="thirdPartyLogins">
            {/* <p>Third party portal logins go here</p> */}
            <a href="/" className="socialIcon" onClick={(e)=>facebookLogIn(e)}>
                <FontAwesomeIcon icon={['fab', 'facebook-f']}/>
            </a>
            <a href="/" className="socialIcon" onClick={(e)=>googleLogIn(e)}>
                <FontAwesomeIcon icon={['fab', 'google']}/>
            </a>
            <a href="/" className="socialIcon" onClick={(e)=>twitterLogIn(e)}>
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
export default LogIn;

function regularLogin(e) {
  // e.preventDefault();
  var creds = document.getElementsByClassName("loginFormInput");
  firebaseRegularLogIn(creds[0].value, creds[1].value);
  creds[0].value = "";
  creds[1].value = "";
}

function facebookLogIn(e) {
  e.preventDefault();
  firebaseFacebookLogIn();
}

function googleLogIn(e) {
  e.preventDefault();
  firebaseGoogleLogIn();
}

function twitterLogIn(e) {
  e.preventDefault();
  firebaseTwitterLogIn();
}

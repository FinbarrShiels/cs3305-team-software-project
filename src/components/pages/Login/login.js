import React, { useState } from 'react';
import './login.css';
import loginLogo from '../../Images/id-card.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { firebaseTwitterLogIn, firebaseFacebookLogIn, firebaseGoogleLogIn, firebaseRegularLogIn } from '../../../firebaseFunctions/auth';
import { useInput } from '../../../customHooks/form-input.js';
import FormError from '../../formError';
import { useHistory } from 'react-router-dom';
import { useUserSet } from '../../../context/UserContext'

function LogIn() {
  const [ formErrors, setFormErrors ] = useState(() => ({
    username: "",
    password: ""
  }))
  
  const history = useHistory();
  const userSet = useUserSet();
  
  const { value:username, bind:bindUsername, reset:resetUsername } = useInput('');
  const { value:password, bind:bindPassword, reset:resetPassword } = useInput('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors({
      ...formErrors,
      username: username.trim() === "" ? "Please enter your username" : "",
      password: password.trim() === "" ? "Please enter your password" : ""
    })
    if (formErrors.username === "" & formErrors.password === "") {
      console.log(`Attempt login:\nUsername: ${username}, Password: ${password}`) 
      firebaseRegularLogIn(username, password)
      .then(userOBJ => {
        console.log("Successful login!");
        userSet({
          email: userOBJ.email,
          verified: userOBJ.emailVerified,
          uid: userOBJ.uid,
          anon: userOBJ.isAnonymous
        })
        history.push("/");
      })
    }
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
            className="submitButton"
            type="submit" 
            value="Login" />
        </form>


        <div className="loginOptionBreak">
            <p><span>Or Sign In With</span></p>
        </div>

        <div className="thirdPartyLogins">
            <a href="/" className="socialIcon" onClick={()=>firebaseFacebookLogIn()}>
                <FontAwesomeIcon icon={['fab', 'facebook-f']} size="2x"/>
            </a>
            <a href="/" className="socialIcon" onClick={()=>firebaseGoogleLogIn()}>
                <FontAwesomeIcon icon={['fab', 'google']} size="2x"/>
            </a>
            <a href="/" className="socialIcon" onClick={()=>firebaseTwitterLogIn()}>
                <FontAwesomeIcon icon={['fab', 'twitter']} size="2x"/>
            </a>
        </div>
        <div className="bottomOptionButtons">
            <a href="/signUp"> Create Account </a>
            <a href="/ForgotPassword"> Forgot Password </a>
        </div>
      </div>
    </div>
  )
}
export default LogIn;

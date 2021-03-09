import React, { useEffect, useState } from 'react'
import './login.css'
import loginLogo from '../../Images/id-card.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { firebaseTwitterLogIn, firebaseFacebookLogIn, firebaseGoogleLogIn } from '../../../firebaseFunctions/auth'
import { useInput } from '../../../customHooks/form-input.js'
import FormError from '../../formError'
import { useUserLogin } from '../../../context/UserContext'

function LogIn() {
  const [ formErrors, setFormErrors ] = useState(() => ({
    username: null,
    password: null,
    loginFail: null
  }))

  const userLogin = useUserLogin()
  
  const { value:username, bind:bindUsername } = useInput("")
  const { value:password, bind:bindPassword } = useInput("")

  const invalidDetails = () => {
    setFormErrors({
      username: "",
      password: "",
      loginFail: "Username or password was incorrect"
    })
  }

  useEffect(() => {
    if (formErrors.username === "" && formErrors.password === "") {
      userLogin(username, password)
      .then()
      .catch(error => {
        switch(error) {
          case 'auth/invalid-email':
            invalidDetails()
            break;
          default:
            console.log("UNEXPECTED ERROR")
            console.log(error)
        }
      })
    }
  }, [ formErrors ])

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormErrors({
      username: username.trim() === "" ? "Please enter your username" : "",
      password: password.trim() === "" ? "Please enter your password" : ""
    })
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
          <FormError errorMsg={formErrors.loginFail}/>
          <input 
            className="submitButton"
            type="submit" 
            value="Login" />
        </form>


        <div className="loginOptionBreak">
            <p><span>Or Sign In With</span></p>
        </div>

        <div className="thirdPartyLogins">
            <a href="/" className="socialIcon" onClick={() => firebaseFacebookLogIn()}>
                <FontAwesomeIcon icon={['fab', 'facebook-f']} size="2x"/>
            </a>
            <a href="/" className="socialIcon" onClick={() => firebaseGoogleLogIn()}>
                <FontAwesomeIcon icon={['fab', 'google']} size="2x"/>
            </a>
            <a href="/" className="socialIcon" onClick={() => firebaseTwitterLogIn()}>
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
export default LogIn

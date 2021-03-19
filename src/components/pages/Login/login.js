import React, { useEffect, useState } from 'react'
import './login.css'
import loginLogo from '../../Images/id-card.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { firebaseTwitterLogIn, firebaseFacebookLogIn, firebaseGoogleLogIn } from '../../../firebaseFunctions/auth'
import { useInput } from '../../../customHooks/form-input.js'
import FormError from '../../formError'
import { useUser, useUserLogin, useUserLogOut } from '../../../context/UserContext'

function LogIn() {
  const [ formErrors, setFormErrors ] = useState(() => ({
    username: "",
    password: "",
    loginFail: ""
  }))

  const user = useUser()
  const userLogin = useUserLogin()
  const userLogOut = useUserLogOut()
  
  const { value:username, bind:bindUsername } = useInput("")
  const { value:password, bind:bindPassword, reset:resetPassword } = useInput("")
  const [ loginMsg, setLoginMsg ] = useState("")
  const [ submitting, setSubmitting ] = useState(false)

  const invalidDetails = () => {
    setFormErrors({
      username: "",
      password: "",
      loginFail: "Username or password was incorrect"
    })
  }

  useEffect(() => {
    if (formErrors.username === "" && formErrors.password === "" && submitting) {
      setLoginMsg("Logging in...")
      userLogin(username, password)
      .then(() => {
        setFormErrors({
          username: "",
          password: "",
          loginFail: "",
        })
      })
      .catch(error => {
        setLoginMsg("")
        switch(error) {
          case 'auth/invalid-email':
            invalidDetails()
            break
          case 'auth/user-not-found':
            invalidDetails()
            break
          case 'auth/wrong-password':
            invalidDetails()
            break
          default:
            console.log("UNEXPECTED LOGIN ERROR")
            console.log(error)
            setLoginMsg("Sorry, we've had an unexpected error while trying to log you in")
        }
      })
    }
    else {
      resetPassword()
    }
    setSubmitting(false)
  }, [ submitting ])

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormErrors({
      username: username.trim() === "" ? "Please enter your username" : "",
      password: password.trim() === "" ? "Please enter your password" : ""
    })
    setSubmitting(true)
  }

  return(
    user === null ?
    <div className="loginContainer">
      <div className="mainLogin">
        <div className="title">
            <img src={loginLogo} alt="loginLogo"/>
        </div>
        <p className="loginMsg"> {loginMsg} </p>
        <form className="loginForm" onSubmit={handleSubmit}>
          <FormError errorMsg={formErrors.username}/>
          <input 
            className="loginFormInput" 
            type="text" 
            placeholder="Username / Email" 
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
  :
    <div>
      <h2> You seem to be already logged in, you don't need to be here... </h2>
      <h3> Click <a onClick={() => userLogOut()}> here </a> to log out</h3>
    </div>
  )
}
export default LogIn

import React, { useEffect, useState } from 'react'
import './login.css'
import loginLogo from '../../Images/id-card.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { firebaseTwitterLogIn, firebaseFacebookLogIn, firebaseGoogleLogIn } from '../../../firebaseFunctions/auth'
import { useInput } from '../../../customHooks/form-input.js'
import FormError from '../../formError'
import { useUser, useUserLogin, useUserLogOut } from '../../../context/UserContext'
import { useHistory } from 'react-router'

function LogIn() {
  const [ formErrors, setFormErrors ] = useState(() => ({ // State object holds the error messages for the login form
    username: "",
    password: "",
    loginFail: ""
  }))

  const user = useUser() // The current user object from UserContext
  const userLogin = useUserLogin() // Retrieves the login function from UserContext
  const userLogOut = useUserLogOut() // Retrieves the logout function from UserContext
  const history = useHistory() // The page history from react router dom. Used for redirection
  
  const { value:username, bind:bindUsername } = useInput("") // The current value in the username field
  const { value:password, bind:bindPassword, reset:resetPassword } = useInput("") // The current value in the password field
  const [ loginMsg, setLoginMsg ] = useState("") // Status message that is displayed to the user
  const [ submitting, setSubmitting ] = useState(false) // Toggles whether the login functionality in the useEffect hook is allowed to run

  const invalidDetails = () => { // Resets username and password error messages and sets the login failed message
    setFormErrors({
      username: "",
      password: "",
      loginFail: "Username or password was incorrect"
    })
  }

  useEffect(() => { // Runs when the submitting state changes
    if (formErrors.username === "" && formErrors.password === "" && submitting === true) { // Login is only attempted when submitting == true
      setLoginMsg("Logging in...") 
      userLogin(username, password) // Attempts to log the user in with current values
      .then(result => { // Login was successful
        if (result === true) {
          setFormErrors({
            username: "",
            password: "",
            loginFail: "",
          })
          console.log("Successful login")
          setLoginMsg("You have successfully logged in")
          history.push("/")
        }
      })
      .catch(error => { // Login failed
        setLoginMsg("")
        switch(error) { // Act on the error depending on what went wrong
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
      resetPassword() // Resets the password field for security purposes (when the page is refreshed)
    }
    setSubmitting(false) // Make sure there are no more subsquent login attempts until the submit button is pressed again
  }, [ submitting ])

  const handleSubmit = (e) => { // Checks for empty user input fields and allows a login attempt
    e.preventDefault()
    setFormErrors({
      username: username.trim() === "" ? "Please enter your username" : "",
      password: password.trim() === "" ? "Please enter your password" : ""
    })
    setSubmitting(true)
  }

  const handleThirdPartyLoginError = (provider, error) => { // Determines what to do if there was an error while trying to login through a third party portal
    console.log(`Error signing in with ${provider}`, error)
    userLogOut()
    switch (error) {
      case 'auth/popup-closed-by-user':
        setLoginMsg("The popup was closed before we could sign you in")
        break
      default:
        setLoginMsg(`There was an unexpected error while trying to log you in with ${provider}, please try again`)
    }
  }

  const handleThirdPartyLoginSuccess = (provider, result) => { // Determines what to do if the third party login through a portal was successful
    console.log(`${provider} login:`, result)
    setLoginMsg(`Succesfully logged in with ${provider}`)
    history.push("/") // Redirect to the homepage
  }

  const thirdPartyLogin = (provider) => { // Attempt to log in with the selected portal provider
    setLoginMsg(`Logging in with ${provider}...`)
    switch (provider.toLowerCase()) {
      case "google":
        console.log("google login")
        firebaseGoogleLogIn()
        .then(result => {
          handleThirdPartyLoginSuccess(provider, result)
        })
        .catch(error => {
          handleThirdPartyLoginError("Google", error)
        })
        break
      case "twitter":
        console.log("twitter login")
        firebaseTwitterLogIn()
        .then(result => {
          handleThirdPartyLoginSuccess(provider, result)
        })
        .catch(error => {
          handleThirdPartyLoginError("Twitter", error)
        })
        break
      case "facebook":
        console.log("facebook login")
        firebaseFacebookLogIn()
        .then(result => {
          handleThirdPartyLoginSuccess(provider, result)
        })
        .catch(error => {
          handleThirdPartyLoginError("Facebook", error)
        })
        break
      default:
        console.log(`Unhandled error with ${provider}`)
        setLoginMsg(`There was an unexpected outcome when trying to log in with ${provider}, please try again`)
    }
  }

  return(
    user === null ? // If there is no valid current user the login form is displayed
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
            <a href="/" className="socialIcon" onClick={e => {e.preventDefault(); thirdPartyLogin("Facebook")}}>
                <FontAwesomeIcon icon={['fab', 'facebook-f']} size="2x"/>
            </a>
            <a href="/" className="socialIcon" onClick={e => {e.preventDefault(); thirdPartyLogin("Google")}}>
                <FontAwesomeIcon icon={['fab', 'google']} size="2x"/>
            </a>
            <a href="/" className="socialIcon" onClick={e => {e.preventDefault(); thirdPartyLogin("Twitter")}}>
                <FontAwesomeIcon icon={['fab', 'twitter']} size="2x"/>
            </a>
        </div>
        <div className="bottomOptionButtons">
            <a href="/signUp"> Create Account </a>
            <a href="/ForgotPassword"> Forgot Password </a>
        </div>
      </div>
    </div>
  : // If there is already a valid current user, a message is displayed instead of the login form
    <div>
      <h2> You seem to be already logged in, you don't need to be here... </h2>
      <h3> Click <a onClick={() => userLogOut()}> here </a> to log out</h3>
    </div>
  )
}
export default LogIn

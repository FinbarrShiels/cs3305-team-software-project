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
    email: "",
    password: "",
    loginFail: ""
  }))

  const userLogin = useUserLogin()
  
  const { value:email, bind:bindEmail } = useInput("")
  const { value:password, bind:bindPassword } = useInput("")
  const [ loginMsg, setLoginMsg ] = useState("")
  const [ submitting, setSubmitting ] = useState(false)

  const invalidDetails = () => {
    setFormErrors({
      email: "",
      password: "",
      loginFail: "Email or password was incorrect"
    })
  }

  useEffect(() => {
    if (formErrors.email === "" && formErrors.password === "" && submitting) {
      setLoginMsg("Logging you in...")
      userLogin(email, password)
      .then(
        setFormErrors({
          email: "",
          password: "",
          loginFail: "",
        })
      )
      .catch(error => {
        console.log(error)
        switch(error) {
          case 'auth/invalid-email':
            setFormErrors({
              ...formErrors,
              email: "Make sure you've typed a valid email"
            })
            break
          case 'auth/user-not-found':
            invalidDetails()
            break
          case 'auth/wrong-password':
            invalidDetails()
            break
          default:
            console.log("UNEXPECTED ERROR")
            console.log(error)
            setLoginMsg("Sorry, we've had an unexpected error. Please contact us to help fix it!")
        }
      })
    }
    setLoginMsg("")
    setSubmitting(false)
  }, [ submitting ])

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormErrors({
      email: email.trim() === "" ? "Please enter your username" : "",
      password: password.trim() === "" ? "Please enter your password" : ""
    })
    setSubmitting(true)
  }

  return(
    <div className="loginContainer">
      <div className="mainLogin">
        <div className="title">
            <img src={loginLogo} alt="loginLogo"/>
        </div>
        <p className="loginMsg"> {loginMsg} </p>
        <form className="loginForm" onSubmit={handleSubmit}>
          <FormError errorMsg={formErrors.email}/>
          <input 
            className="loginFormInput" 
            type="text" 
            placeholder="Email" 
            {...bindEmail} />
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

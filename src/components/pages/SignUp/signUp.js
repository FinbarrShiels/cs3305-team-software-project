import React, { useState, useEffect } from 'react'
import './signUp.css'
import { useInput } from '../../../customHooks/form-input.js'
import FormError from '../../formError'
import { useUserSignUp } from '../../../context/UserContext'
import { isUsernameUnique } from '../../../firebaseFunctions/auth'

function SignUp() {
  const [ formErrors, setFormErrors ] = useState({
    username: null,
    fname: null,
    sname: null,
    email: null,
    password: null,
    confirmPass: null,
    tos: null
  })

  const userSignUp = useUserSignUp()
  const { value:username, bind:bindUsername } = useInput("")
  const { value:fname, bind:bindFname } = useInput("")
  const { value:sname, bind:bindSname } = useInput("")
  const { value:email, bind:bindEmail } = useInput("")
  const { value:password, bind:bindPassword, reset:resetPassword } = useInput("")
  const { value:confirmPass, bind:bindConfirmPass, reset:resetConfirmPass } = useInput("")
  const [tosChecked, setTosChecked] = useState(false)
  const [ submitting, setSubmitting ] = useState(false)
  const [ passwordShown, setPasswordShown ] = useState(false)

  const getUsernameErrors = () => {
    return new Promise((resolve, reject) => {
      console.log("finding username")
      let trimmed = username.trim()
      if (trimmed === "") {
        console.log("Username empty")
        resolve("Please choose a username")
      } else {
        isUsernameUnique(trimmed)
        .then((unique) => {
          if (unique) {
            resolve("")
          } else {
            resolve("Sorry, this username is already taken")
          }
        })
        .catch(error => {
          console.log(error)
        })
      }
    })
  }

  useEffect(() => {
    if (
      formErrors.username === "" &&
      formErrors.fname === "" &&
      formErrors.sname === "" &&
      formErrors.email === "" &&
      formErrors.password === "" &&
      formErrors.confirmPass === "" &&
      formErrors.tos === "" &&
      submitting === true
    ) {
      userSignUp(fname, sname, email, password, username)
      .then(result => {
      })
      .catch(error => {
        console.log("Sign up error", error)
      })
    } else {
      resetPassword()
      resetConfirmPass()
    }
    setSubmitting(false)
  }, [ formErrors ])

  const isValidPassword = new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)

  const handleSubmit = (e) => {
    e.preventDefault()
    getUsernameErrors()
      .then(userNameError => {
        let fnameError = fname.trim() === "" ? "Please enter your first name" : ""
        let snameError = sname.trim() === "" ? "Please enter your second name" : ""
        let emailError = email.trim() === "" ? "Please enter your email" : ""
        let confirmPassError = (confirmPass.trim() !== password.trim()) ? "Please make sure both passwords are the same" : ""
        let tosError = !tosChecked ? "Please agree to the Terms of Service" : ""
        let passwordError = ""
        if (password.trim() === "") {
          passwordError = "Please enter your password"
        } else if (!isValidPassword.test(password.trim())) {
          passwordError = "Password isn't strong enough"
        }
        // setSubmitting(true)
        setFormErrors({
          username: userNameError,
          fname: fnameError,
          sname: snameError,
          email: emailError,
          password: passwordError,
          confirmPass: confirmPassError,
          tos: tosError
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  return(
    <div className="signUpContainer">
      <div className="sections">
        <div className="leftTab">
          <h2>Cast Your <span>Vote</span> Now!</h2>
        </div>
        <div className="rightTab">
          <form className="signUpForm" onSubmit={handleSubmit}>
            <div className="formInputSection">
             <FormError errorMsg={formErrors.username}/>
              <div className="innerInput"><label htmlFor="username"> Username: </label>
              <input type="text" id="username" {...bindUsername}/></div>
            </div>
            <div className="formInputSection">
              <FormError errorMsg={formErrors.fname}/>
              <div className="innerInput"><label htmlFor="fname"> First Name: </label>
                <input type="text" id="fname" {...bindFname}/></div>
            </div>
            <div className="formInputSection">
              <FormError errorMsg={formErrors.sname}/>
             <div className="innerInput"><label htmlFor="sname"> Second Name: </label>
              <input type="text" id="sname" {...bindSname}/></div>
            </div>
            <div className="formInputSection">
              <FormError errorMsg={formErrors.email}/>
              <div className="innerInput"><label htmlFor="email"> Email: </label>
              <input type="text" id="email" {...bindEmail}/></div>
            </div>
            <div className="formInputSection">
              <FormError errorMsg={formErrors.password}/>
              <div className="innerInput"><label htmlFor="password"> Password: </label>
              <input type={passwordShown ? "text" : "password"} id="password" {...bindPassword}/><button onClick={(e) => {e.preventDefault(); setPasswordShown(!passwordShown)}}>Show Password</button></div>
              <div className="passwordError">ⓘ
                <span className="passwordErrorSpan">
                  Passwords should contain the following:
                  <ul>
                     <li>At least one symbol</li>
                     <li>One number (0-9)</li>
                     <li>At least one lower case and one upper case letter</li>
                     <li>(a-z)6-16 characters</li>
                  </ul>
                </span>
              </div>
            </div>
            <div className="formInputSection">
              <FormError errorMsg={formErrors.confirmPass}/>
              <div className="innerInput"><label htmlFor="confirmPassword"> Confirm Password: </label>
              <input type={passwordShown ? "text" : "password"} id="confirmPassword" {...bindConfirmPass}/></div>
            </div>
            <div className="checkboxSection">
              <FormError errorMsg={formErrors.tos}/>
              <input type="checkbox" id="agreecheckbox" 
              checked={tosChecked}
              onChange={(e) => {
                setTosChecked(e.target.checked)
              }}/>
              <label htmlFor="agreecheckbox"> I agree to terms of Service </label>
            </div>
            <button className="formSubmitButton" type="submit">Create Account</button>
          </form>
          <div id='recaptcha'/>
          <div className="existingMemberLogin">
            <span>Already Have an Account?</span>
            <a href="/login"><button> Log In </button></a>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SignUp

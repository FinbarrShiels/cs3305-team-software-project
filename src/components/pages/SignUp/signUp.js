import React, { useState, useEffect } from 'react';
import './signUp.css';
import { firebaseRegister } from '../../../firebaseFunctions/auth';
import { useInput } from '../../../customHooks/form-input.js';
import FormError from '../../formError';
import { useHistory } from 'react-router-dom';

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

  const history = useHistory();

  const { value:username, bind:bindUsername, reset:resetUsername } = useInput("");
  const { value:fname, bind:bindFname, reset:resetFname } = useInput("");
  const { value:sname, bind:bindSname, reset:resetSname } = useInput("");
  const { value:email, bind:bindEmail, reset:resetEmail } = useInput("");
  const { value:password, bind:bindPassword, reset:resetPassword } = useInput("");
  const { value:confirmPass, bind:bindConfirmPass, reset:resetConfirmPass } = useInput("");
  const [tosChecked, setTosChecked] = useState(false);

  useEffect(() => {
    if (
      formErrors.username === "" &&
      formErrors.fname === "" &&
      formErrors.sname === "" &&
      formErrors.email === "" &&
      formErrors.password === "" &&
      formErrors.confirmPass === "" &&
      formErrors.tos === ""
    ) {
      firebaseRegister(fname, sname, email, password)
      .then((outcome) => {
        console.log("Registration complete: ", outcome);
        history.push("/SignUpComplete");
      })
      .catch((error) => {
        switch (error) {
          default:
            console.log("UNEXPECTED ERROR");
            resetUsername();
            resetFname();
            resetSname();
            resetEmail();
            resetPassword();
            resetConfirmPass();
            setTosChecked(false);
            break;
        }
      })
    }
  }, [ formErrors ])


  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors({
      username: username.trim() === "" ? "Please choose a username" : "",
      fname: fname.trim() === "" ? "Please enter your first name" : "",
      sname: sname.trim() === "" ? "Please enter your second name" : "",
      email: email.trim() === "" ? "Please enter your email" : "",
      password: password.trim() === "" ? "Please enter your password" : "",
      confirmPass: (confirmPass.trim() !== password.trim()) ? "Please make sure both passwords are the same" : "",
      tos: !tosChecked ? "Please agree to the Terms of Service" : ""
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
              <label htmlFor="username"> Username: </label>
              <input type="text" id="username" {...bindUsername}/>
            </div>
            <div className="formInputSection">
              <FormError errorMsg={formErrors.fname}/>
              <label htmlFor="fname"> First Name: </label>
              <input type="text" id="fname" {...bindFname}/>
            </div>
            <div className="formInputSection">
              <FormError errorMsg={formErrors.sname}/>
              <label htmlFor="sname"> Second Name: </label>
              <input type="text" id="sname" {...bindSname}/>
            </div>
            <div className="formInputSection">
              <FormError errorMsg={formErrors.email}/>
              <label htmlFor="email"> Email: </label>
              <input type="text" id="email" {...bindEmail}/>
            </div>
            <div className="formInputSection">
              <FormError errorMsg={formErrors.password}/>
              <label htmlFor="password"> Password: </label>
              <input type="password" id="password" {...bindPassword}/>
            </div>
            <div className="formInputSection">
              <FormError errorMsg={formErrors.confirmPass}/>
              <label htmlFor="confirmPassword"> Confirm Password: </label>
              <input type="password" id="confirmPassword" {...bindConfirmPass}/>
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
            <input className="formSubmitButton" type="submit" value="Create Account"/>
          </form>
          <div id='recaptcha' />
          <div className="existingMemberLogin">
            <span>Already Have an Account?</span>
            <a href="/login"><button> Log In </button></a>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SignUp;

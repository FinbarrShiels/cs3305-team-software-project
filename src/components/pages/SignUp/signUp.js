import React, { useState } from 'react';
import './signUp.css';
import { firebaseRegister } from '../../../firebaseFunctions/auth';
import { useInput } from '../../../customHooks/form-input.js';
import FormError from '../../formError';

function SignUp() {
  const [ formErrors, setFormErrors ] = useState(() => ({
    fname: "",
    sname: "",
    email: "",
    password: "",
    tos: ""
  }))

  const { value:username, bind:bindUsername, reset:resetUsername } = useInput('');
  const { value:fname, bind:bindFname, reset:resetFname } = useInput('');
  const { value:sname, bind:bindSname, reset:resetSname } = useInput('');
  const { value:email, bind:bindEmail, reset:resetEmail } = useInput('');
  const { value:password, bind:bindPassword, reset:resetPassword } = useInput('');
  const [tosChecked, setTosChecked] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors({
      ...formErrors,
      username: username.trim() === "" && "Please choose a username",
      fname: fname.trim() === "" && "Please enter your first name",
      sname: sname.trim() === "" && "Please enter your second name",
      email: email.trim() === "" && "Please enter your email",
      password: password.trim() === "" && "Please enter your password",
      tos: tosChecked === false && "Please agree to the Terms of Service"
    })
    alert(`First: ${fname}, Second: ${sname}, Email: ${email}, Password: ${password}, Checked: ${tosChecked}`) 
    firebaseRegister(fname, sname, email, password);
    resetUsername();
    resetFname();
    resetSname();
    resetEmail();
    resetPassword();
    setTosChecked(false);
  }

  return(
    <div className="signUpContainer">
      <div class="sections">
        <div className="leftTab">
          <h2>Cast Your <span>Vote</span> Now!</h2>
        </div>

        <div className="rightTab">
          <form class="signUpForm" onSubmit={handleSubmit}>
            <div className="formInputSection">
              <FormError errorMsg={formErrors.username}/>
              <label for="username"> Username:  </label>
              <input type="text" id="username" {...bindUsername}/>
            </div>
            <div className="formInputSection">
              <FormError errorMsg={formErrors.fname}/>
              <label for="fname"> First Name:  </label>
              <input type="text" id="fname" {...bindFname}/>
            </div>
            <div className="formInputSection">
              <FormError errorMsg={formErrors.sname}/>
              <label for="sname"> Second Name:  </label>
              <input type="text" id="sname" {...bindSname}/>
            </div>
            <div className="formInputSection">
              <FormError errorMsg={formErrors.email}/>
              <label htmlFor="email"> Email:  </label>
              <input type="text" id="email" {...bindEmail}/>
            </div>
            <div className="formInputSection">
              <FormError errorMsg={formErrors.password}/>
              <label htmlFor="password"> Password:  </label>
              <input type="password" id="password" {...bindPassword}/>
            </div>
            <div className="checkboxSection">
              <FormError errorMsg={formErrors.tos}/>
              <input type="checkbox" id="agreecheckbox" 
              checked={tosChecked}
              onChange={(e) => {
                setTosChecked(e.target.checked)
              }}/>
              <label for="agreecheckbox"> I agree to terms of Service </label>
            </div>
            <input className="formSubmitButton" type="submit" value="Create Account"/>
          </form>
          <div id='recaptcha'></div>
          <div className="existingMemberLogin">
            <span>Already Have an Account?   </span>
            <a href="/login"><button> Log In </button></a>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SignUp;

import React, { useState } from 'react';
import './signUp.css';
import { firebaseRegister } from '../../../firebaseFunctions/auth';
import { useInput } from '../../../customHooks/form-input.js';
import FormError from '../../formError';
import { useHistory } from 'react-router-dom';

function SignUp() {
  const [ formErrors, setFormErrors ] = useState(() => ({
    fname: "",
    sname: "",
    email: "",
    password: "",
    tos: ""
  }))

  const history = useHistory();

  const { value:username, bind:bindUsername, reset:resetUsername } = useInput('');
  const { value:fname, bind:bindFname, reset:resetFname } = useInput('');
  const { value:sname, bind:bindSname, reset:resetSname } = useInput('');
  const { value:email, bind:bindEmail, reset:resetEmail } = useInput('');
  const { value:password, bind:bindPassword, reset:resetPassword } = useInput('');
  const [tosChecked, setTosChecked] = useState(false);


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
    if (firebaseRegister(fname, sname, email, password)) {
      resetUsername();
      resetFname();
      resetSname();
      resetEmail();
      resetPassword();
      setTosChecked(false);
      history.push("/SignUpComplete");
    }
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
              <label htmlFor="username"> Username:  </label>
              <input type="text" id="username" {...bindUsername}/>
            </div>
            <div className="formInputSection">
              <FormError errorMsg={formErrors.fname}/>
              <label htmlFor="fname"> First Name:  </label>
              <input type="text" id="fname" {...bindFname}/>
            </div>
            <div className="formInputSection">
              <FormError errorMsg={formErrors.sname}/>
              <label htmlFor="sname"> Second Name:  </label>
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
              <label htmlFor="agreecheckbox"> I agree to terms of Service </label>
            </div>
            <input className="formSubmitButton" type="submit" value="Create Account"/>
          </form>
          <div id='recaptcha'></div>
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

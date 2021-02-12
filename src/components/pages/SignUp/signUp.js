import React, { Component } from 'react';
import './signUp.css';

class signUp extends Component {
  render() {
    return(
      // <div><h1>Once logged in , Sign up could change to Election Screen </h1></div>

      <div className="signUpContainer">
        <div class="sections">
        <div className="leftTab">
          <h2>Cast Your <span>Vote</span> Now!</h2>
        </div>

        <div className="rightTab">
          <form class="signUpForm">
            <div className="formInputSection">
              <label for="fname"> First Name:  </label>
              <input type="text" id="fname"/>
            </div>
            <div className="formInputSection">
              <label for="sname"> Second Name:  </label>
              <input type="text" id="sname"/>
            </div>
            <div className="formInputSection">
              <label htmlFor="email"> Email:  </label>
              <input type="text" id="email"/>
            </div>
            <div className="formInputSection">
              <label htmlFor="password"> Password:  </label>
              <input type="password" id="password"/>
            </div>
            <div className="checkboxSection">
              <input type="checkbox" id="agreecheckbox"/>
              <label for="agreecheckbox"> I agree to terms of Service </label>
            </div>
            <input className="formSubmitButton" type="submit" value="Create Account"/>
          </form>
          <div className="existingMemberLogin">
            <span>Already Have an Account?   </span>
            <a href="/login"><button> Log In </button></a>
          </div>

        </div>
        </div>
      </div>
    )
  }
}

export default signUp;
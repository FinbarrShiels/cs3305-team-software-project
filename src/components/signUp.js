import React, { Component } from 'react';

class signUp extends Component {
  render() {
    return(
      // <div><h1>Once logged in , Sign up could change to Election Screen </h1></div>

      <div className="mainSignUp">
        <div className="leftTab">
          <h2>Cast Your Vote <span>Now!</span></h2>
        </div>

        <div className="rightTab">
          <form>
            <div className="formInputSection">
              <label for="fname">First Name:</label>
              <input type="text" id="fname"/>
            </div>
            <div className="formInputSection">
              <label for="sname">Second Name:</label>
              <input type="text" id="sname"/>
            </div>
            <div className="checkboxSection">
              <input type="checkbox" id="agreecheckbox"/>
              <label for="agreecheckbox">I agree to terms of Service</label>
            </div>
            <input className="formSubmitButton" type="submit" value="Create Account"/>
          </form>

          <div className="existingMemberLogin">
            <span>Already Have an Account?</span>
            <button>Log In</button>
          </div>
        </div>
      </div>
    )
  }
}

export default signUp;
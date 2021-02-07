import React, { Component } from 'react';

class ForgotPassword extends Component {
    render() {
      return(
        // <div><h1>Once logged in , this could change to Myprofile :\</h1></div>
  
        <div className="mainForgotPassword">
            <div className="forgotPasswordImage">
                
            </div>
            <div className="instructionSection">
                <h2>Forgot your password?</h2>
                <p>No worries enter your email and we'll send you a reset link</p>
            </div>
            <form className="forgotPasswordForm">
                <input type="text" placeholder="example@example.com"/>
                <br/>
                <input type="submit" value="Send Request"/>
            </form>

            <div className="backToLogin">
                <a href="/login">Back to log in</a>
            </div>
        </div>
      )
    }
  }
  
  export default ForgotPassword;
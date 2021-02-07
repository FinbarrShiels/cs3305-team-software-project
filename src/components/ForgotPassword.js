import React, { Component } from 'react';
import BackToLoginButton from './BackToLoginButton';

class ForgotPassword extends Component {
    render() {
      return(
        // <div><h1>Once logged in , this could change to Myprofile :\</h1></div>
  
        <div className="mainForgotPassword">
            <div className="forgotPasswordImage">
                
            </div>
            <div className="instructionSection">
                <h2>Forgot your password?</h2>
                <p>No worries! Enter your email and we'll send you a reset link</p>
            </div>

            <form className="forgotPasswordForm" action="/RequestSent">
                <input type="text" placeholder="example@example.com"/>
                <br/>
                <input type="submit" value="Send Request"/>
            </form>

            <BackToLoginButton/>
        </div>
      )
    }
  }
  
  export default ForgotPassword;
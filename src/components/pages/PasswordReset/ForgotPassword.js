import React, { Component } from 'react';
import BackToLoginButton from './BackToLoginButton';
import {forgotPassword} from "../../../firebaseFunctions/passwordReset.js";

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
                <input type="text" placeholder="example@example.com" id="email"/>
                <br/>
                <input type="submit" value="Send Request" onClick={(e)=> callForgotPassword(e)}/>
            </form>

            <BackToLoginButton/>
        </div>
      )
    }
  }

  function callForgotPassword(e) {
    e.preventDefault();
    var email = document.getElementById('email').value;
    forgotPassword(email);
    var form = document.getElementsByClassName('forgotPasswordForm');
    form[0].submit();
  }
  
  export default ForgotPassword;
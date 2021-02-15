import React, { Component } from 'react';
import BackToLoginButton from '../PasswordReset/BackToLoginButton';
import "./RequestSent.css";
import mail from "../../Images/mail.svg"

class RequestSent extends Component {
    render() {
      return(
        <div>
            <div className="requestSentImage">
                <img className="avatarImage" src={mail} alt="mail"/>
            </div>
            <div className="requestSentNotification">
                <h2>Check your email!</h2>
                <p>We just emailed you with instructions to change your password</p>
            </div>

            <div className="bottomOptions">
                <BackToLoginButton/>
                <button>Resend Link</button>
            </div>
        </div>
        
      )
    }
  }
  
  export default RequestSent;
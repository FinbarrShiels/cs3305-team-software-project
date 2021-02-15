import React, { Component } from 'react';
import arrow from "../../Images/arrow.png";
import "./ForgotPassword.css";
class BackToLoginButton extends Component {
    render() {
      return(
        <div className="backToLogin">
            <img src={arrow} alt="arrow"/>
            <a href="/login">Back to log in</a>
        </div>
      )
    }
  }
  
  export default BackToLoginButton;
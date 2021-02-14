import React, { Component } from 'react';

class BackToLoginButton extends Component {
    render() {
      return(
        <div className="backToLogin">
            <a href="/login">Back to log in</a>
        </div>
      )
    }
  }
  
  export default BackToLoginButton;
import React, { Component } from 'react';

class LogIn extends Component {
  render() {
    return(
      // <div><h1>Once logged in , this could change to Myprofile :\</h1></div>

      <div>
        <div className="loginLogo">
          <p>Logo</p>
        </div>
        <div className="mainLogin">
            <form className="loginForm">
              <input className="loginFormInput" type="text" placeholder="Username"></input>
              <br/>
              <input className="loginFormInput" type="text" placeholder="Password"></input>
              <br/>
              <input className="loginFormInput" type="submit" value="Get Started"></input>
            </form>
        </div>

        <div className="loginOptionBreak">
          <p>or sign in with</p>        
        </div>

        <div className="thirdPartyLogins">
          {/* <p>Third party portal logins go here</p> */}
          <a className="thirdPartyLoginButton" href="/login">FaceBook Login Button</a>
          <a className="thirdPartyLoginButton" href="/login">Google Login Button</a>
          <a className="thirdPartyLoginButton" href="/login">Twitter Login Button</a>
        </div>

        <div className="bottomOptionButtons">
          <a href="/login">Create Account</a>
          <a href="/ForgotPassword">Forgot Password</a>
        </div>
      </div>
    )
  }
}

export default LogIn;
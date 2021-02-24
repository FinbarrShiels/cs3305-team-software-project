import './login.css';
import loginLogo from '../../Images/id-card.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { firebaseTwitterLogIn, firebaseFacebookLogIn, firebaseGoogleLogIn, firebaseRegularLogIn } from '../../../firebaseFunctions/auth';

function LogIn() {
  return(
    <div className="loginContainer">
      <div className="mainLogin">
        <div className="title">
            <img src={loginLogo} alt="loginLogo"/>
        </div>
        <form className="loginForm">
          <input className="loginFormInput" type="text" placeholder="Username"></input>
          <br/>
          <input className="loginFormInput" type="password" placeholder="Password"></input>
          <br/>
          <button type="button" className="button"  onClick={(e)=>regularLogin(e)}>Get Started</button>
        </form>
        <div className="loginOptionBreak">
            <p><span>Or Sign In With</span></p>
        </div>
        <div className="thirdPartyLogins">
            {/* <p>Third party portal logins go here</p> */}
            <a href="/" className="socialIcon" onClick={(e)=>facebookLogIn(e)}>
                <FontAwesomeIcon icon={['fab', 'facebook-f']} size="2x"/>
            </a>
            <a href="/" className="socialIcon" onClick={(e)=>googleLogIn(e)}>
                <FontAwesomeIcon icon={['fab', 'google']} size="2x"/>
            </a>
            <a href="/" className="socialIcon" onClick={(e)=>twitterLogIn(e)}>
                <FontAwesomeIcon icon={['fab', 'twitter']} size="2x"/>
            </a>
        </div>
        <div className="bottomOptionButtons">
            <a href="/login">Create Account</a>
            <a href="/ForgotPassword">Forgot Password</a>
        </div>
      </div>
    </div>
  )
}
export default LogIn;

function regularLogin(e) {
  e.preventDefault();
  var creds = document.getElementsByClassName("loginFormInput");
  firebaseRegularLogIn(creds[0].value, creds[1].value);
  creds[0].value = "";
  creds[1].value = "";
}

function facebookLogIn(e) {
  e.preventDefault();
  firebaseFacebookLogIn();
}

function googleLogIn(e) {
  e.preventDefault();
  firebaseGoogleLogIn();
}

function twitterLogIn(e) {
  e.preventDefault();
  firebaseTwitterLogIn();
}

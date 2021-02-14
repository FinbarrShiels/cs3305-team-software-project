import './signUp.css';
import { firebaseRegister } from '../../../firebaseFunctions/auth';

function signUp() {
  return(
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
          <input className="formSubmitButton" type="submit" value="Create Account" onClick={(e)=>register(e)}/>
        </form>
        <div id='recaptcha'></div>
        <div className="existingMemberLogin">
          <span>Already Have an Account?   </span>
          <a href="/login"><button> Log In </button></a>
        </div>

      </div>
      </div>
    </div>
  )
}
export default signUp;

function register(e) {
  e.preventDefault();
  var registerForm = document.getElementsByClassName('signUpForm');
  var fname = registerForm[0]['fname'].value;
  var sname = registerForm[0]['sname'].value;
  var email = registerForm[0]['email'].value;
  var password = registerForm[0]['password'].value;
  var checkBox = registerForm[0]['agreecheckbox'].checked;
  if ((fname == '' || sname =='') && checkBox == false) {
    console.log('please fill in both fname and sname');
    console.log('please agree to the terms and services');
  }
  else if (fname == '' || sname =='') {
    console.log('please fill in both fname and sname');
  }
  else if (checkBox == false) {
    console.log('please agree to the terms and services');
  }
  else {
    firebaseRegister(fname, sname, email, password);

  }
  

}

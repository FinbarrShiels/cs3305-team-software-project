import BackToLoginButton from './BackToLoginButton'
import {forgotPassword} from "../../../firebaseFunctions/passwordReset.js"
import "./ForgotPassword.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import forgotPW from "../../Images/forgot-password.png"
import { useInput } from '../../../customHooks/form-input'
import { useState } from 'react'
import mail from "../../Images/mail.svg"

function ForgotPassword() {

  const { value:email, bind:bindEmail, reset:resetEmail } = useInput("")
  const [ title, setTitle ] = useState("Forgot your password?")
  const [ subTitle, setSubtitle ] = useState("No worries! Enter your email and we'll send you a reset link")
  const [ message, setMessage ] = useState("")
  const [ requestSent, setRequestSent ] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    forgotPassword(email)
    .then(response => {
      setMessage("We have sent an email to this address, if it exits")
      setTitle("Check your email!")
      setSubtitle("We just emailed you with instructions to change your password")
      setRequestSent(true)
    })
    .catch(error => {
      switch (error.code) {
        case 'auth/invalid-email':
            setMessage("Please enter a valid email")
            break
        case 'auth/user-not-found':
            setMessage("There was no user found related to this email")
            break
        default:
            setMessage("Sorry, there was an unexpected error. Please try again")
            console.log(error.message)
            break
      }
    })
  }

  return(
    <div className="mainForgotPassword">
        <div className="forgotPasswordImage">
            {requestSent ? <img className="avatarImage" src={mail} alt=""/> : <img src={forgotPW} alt=""/>}
        </div>
        <div className="instructionSection">
            <h2>{title}</h2>
            <h3>{subTitle}</h3>
            <p>{message}</p>
        </div>

        <form className="forgotPasswordForm" onSubmit={handleSubmit}>
            { !requestSent && 
              <div>
                <FontAwesomeIcon className="envelopeIcon" icon={['fas', 'envelope']}/>,
                <input type="text" placeholder="example@example.com" id="email" {...bindEmail}/>
              </div>
            }
            <input type="submit" value={requestSent ? "Resend Request" : "Send Request"}/>
            {requestSent && <button onClick={() => {setRequestSent(setRequestSent(false)); resetEmail()}}> Send to a different email </button>}
        </form>
        <div className="backButton">
          <BackToLoginButton/>
        </div>
    </div>
  )
}
export default ForgotPassword
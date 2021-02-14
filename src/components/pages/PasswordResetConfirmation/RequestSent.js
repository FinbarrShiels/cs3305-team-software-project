import BackToLoginButton from '../PasswordReset/BackToLoginButton';

function RequestSent() {
  return(
    <div>
      <div className="requestSentImage">
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
export default RequestSent;
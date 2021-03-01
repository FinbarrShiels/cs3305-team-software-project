import BackToLoginButton from "./BackToLoginButton";

function PasswordChanged() {
    return (
        <div>
            <img className="passwordChangeSuccessImg" alt=""/>
            <h1>Password Changed!</h1>
            <p>Back to log in, enter with new password</p>
            <BackToLoginButton/>
        </div>
    )
}
export default PasswordChanged
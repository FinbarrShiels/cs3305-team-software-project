import "./ChangePassword.css";
function ChangePassword() {
    return (
        <div className="changePasswordContainer">
        <div className="changePassword">
            <h1 className="title"> Change Password </h1>
            <div className="requirements">
                <h5> Make sure your password... </h5>

                    <li>
                        <p> Is longer than 7 characters </p>
                    </li>
                    <li>
                        <p> Does NOT contain your Username </p>
                    </li>
                    <li>
                        <p> Contains a mixture of Upppercase, Lowercase and special characters </p>
                    </li>

                <form className="changePasswordForm">
                    <label for="password"> New Password: </label>
                    <input type="text" id="password" name="password"/>
                    <label for="re-enter password"> Re-enter New Password: </label>
                    <input type="text" id="re-enter password" name="re-enter password"/>
                    <input type="submit" value="Change Password"/>
                </form>
            </div>
        </div>
        </div>
    )
}
export default ChangePassword
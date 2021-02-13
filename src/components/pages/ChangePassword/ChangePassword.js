function ChangePassword() {
    return (
        <div className="changePassword">
            <h1 className="title"> Change Password </h1>
            <div className="requirements">
                <p> Make sure your password... </p>
                <ul>
                    <li>
                        <p> Is longer than 7 characters </p>
                    </li>
                    <li>
                        <p> Does NOT contain your Username </p>
                    </li>
                    <li>
                        <p> Contains a mixture of Upppercase, Lowercase and special characters </p>
                    </li>
                </ul>
                <form className="changePasswordForm">
                    <label for="password"> New Password: </label>
                    <input type="text" id="password" name="password"></input>
                    <label for="re-enter password"> Re-enter New Password: </label>
                    <input type="text" id="re-enter password" name="re-enter password"></input>
                    <input type="submit" value="Change Password"></input>
                </form>
            </div>
        </div>
    )
}

export default ChangePassword
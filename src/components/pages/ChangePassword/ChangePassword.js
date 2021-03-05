import React, { useState } from 'react';
import { useInput } from '../../../customHooks/form-input.js';
import "./ChangePassword.css";
import FormError from '../../formError';
import { useHistory } from "react-router-dom"

function ChangePassword() {

    const history = useHistory();
    const [ formErrors, setFormErrors ] = useState(() => ({
        password1: "",
        password2: ""
    }))
    const { value:password1, bind:bindPassword1, reset:resetPassword1 } = useInput('');
    const { value:password2, bind:bindPassword2, reset:resetPassword2 } = useInput('');
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors({
          ...formErrors,
          password1: password1.trim() === "" && "Please enter a new password",
          password2: password2.trim() === "" && "Please confirm your password"
        })
        alert(`Username: ${password1}, Password: ${password2}`) 
        resetPassword1();
        resetPassword2();
        history.push("/PasswordChanged");
      }
    
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

                <form className="changePasswordForm" onSubmit={handleSubmit}>
                    <FormError errorMsg={formErrors.password1}/>
                    <label for="password"> New Password: </label>
                    <input type="password" id="password" name="password" {...bindPassword1}/>
                    <label for="password2"> Re-enter New Password: </label>
                    <FormError errorMsg={formErrors.password2}/>
                    <input type="password" id="password2" name="password2" {...bindPassword2}/>
                    <input type="submit" value="Change Password"/>
                </form>
            </div>
        </div>
        </div>
    )
}
export default ChangePassword
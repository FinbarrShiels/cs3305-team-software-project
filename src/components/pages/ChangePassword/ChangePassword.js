import React, { useState } from 'react'
import { useInput } from '../../../customHooks/form-input.js'
import "./ChangePassword.css"
import FormError from '../../formError'
import { useHistory } from "react-router-dom"
import {resetPassword} from "../../../firebaseFunctions/custom-landing"

function ChangePassword() {

    const history = useHistory() // The page history from react router dom. Used for redirection
    const [ formErrors, setFormErrors ] = useState(() => ({ // formErrors is an object used to hold the error messages of the form
        password1: "",
        password2: ""
    }))
    const { value:password1, bind:bindPassword1, reset:resetPassword1 } = useInput('') // the current value for the first password field
    const { value:password2, bind:bindPassword2, reset:resetPassword2 } = useInput('') // the current value for the second password field
    
    // called when the page form is submitted
    const handleSubmit = (e) => {
        e.preventDefault()
        // Display error messages if any of the fields are empty
        setFormErrors({
          ...formErrors,
          password1: password1.trim() === "" && "Please enter a new password",
          password2: password2.trim() === "" && "Please confirm your password"
        })
        let actCode = new URL(document.URL).search.replace("?", "")
        console.log("actCode: >", actCode, "<")
        let r = resetPassword(actCode)
        if (r) {
            console.log("Password changed successfully")
            resetPassword1()
            resetPassword2()
            history.push("/PasswordChanged")
        } else {
            console.log(r)
        }
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
import {handleUserParams, verifyEmail, verifyResetCode} from "../../firebaseFunctions/custom-landing";
import {useHistory} from 'react-router-dom';
import {useUser} from "../../context/UserContext";
import React from "react";

function LatchPage() {
    const history = useHistory()
    const user = useUser()
    document.addEventListener('DOMContentLoaded', () => {
        let values = handleUserParams()
        console.log("Values: ", values);
        let mode = values[0];
        let actCode = values[1];
        let cURL = values[3].toString().split("%2f");
        switch (mode) {
            case 'resetPassword':
                //Reset password
                console.log("Mode: Resetting password");
                let v = verifyResetCode(actCode);
                if (v) {
                    history.push("/ChangePassword?" + actCode);
                } else {
                    console.log("V: ", v);
                }
                break;
            case 'recoverEmail':
                //Recover email, dont think we need this
                console.log("Recover email");
                break;
            case 'verifyEmail':
                //Verify email
                verifyEmail(user, actCode, cURL);
                console.log("Verify email");
                break;
            default:
                throw new Error('Malformed query').catch(console.log("malformed query"));
        }
    })
    return(
        user !== null ? (
        <h1 onLoad={handleUserParams}>Please wait while we redirect you. This shouldn't take long!</h1>
        )
        :
        (
            <h1 className="forceLogInMessage"> You do not have access to this page </h1>
        )
)
}
export default LatchPage
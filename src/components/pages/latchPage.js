import {handleUserParams, resetPassword, verifyEmail, verifyResetCode} from "../../firebaseFunctions/custom-landing";
import {useHistory} from 'react-router-dom';

function LatchPage() {
    const history = useHistory()
    document.addEventListener('DOMContentLoaded', () => {
        let values = handleUserParams()
        console.log("Values: ", values);
        let mode = values[0];
        let actCode = values[1];
        let temp = values[3].toString().split("%2f");
        let cURL = temp.split
        console.log("cURL = => " + cURL);
        switch (mode) {
            case 'resetPassword':
                //Reset password
                console.log("Mode: Resetting password");
                let v = verifyResetCode(actCode);
                if (v) {
                    console.log("Changing password > ChangePassword.js")
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
                verifyEmail(actCode, cURL);
                console.log("Verify email");
                break;
            default:
                throw new Error('Malformed query').catch(console.log("malformed query"));
        }
    })
    return (
        <h1 onLoad={handleUserParams}>Please wait while we redirect you. This shouldn't take long!</h1>
    )
}
export default LatchPage
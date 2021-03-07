import '../components/pages/SignUp/signUp.css';

function FormError(props) {
    return (
        props.errorMsg ? <p className="error">{props.errorMsg}</p> : null
    )
}
export default FormError
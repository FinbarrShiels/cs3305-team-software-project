function FormError(props) {
    if (props.errorMsg === "") {
        return (
            <div></div>
        )
    }
    else {
        return (
            <p>{props.errorMsg}</p>
        )
    }
}
export default FormError
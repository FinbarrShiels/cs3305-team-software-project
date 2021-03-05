function FormError(props) {
    return (
        props.errorMsg ? <p>{props.errorMsg}</p> : null
    )
}
export default FormError
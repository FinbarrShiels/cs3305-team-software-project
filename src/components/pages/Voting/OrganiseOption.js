import "./OrganiseOption.css"
function OrganiseOption(props) {
    return (
        <div className="organiseOption">
            <p className="optionCaption"> {props.caption} </p>
            <button className="removeButton"  onClick={() => props.remove(props.index)}> Click to remove </button>
        </div>
    )
}
export default OrganiseOption

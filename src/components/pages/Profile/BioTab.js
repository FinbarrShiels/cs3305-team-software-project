import { useState } from "react"
import "./biotab.css"
function Bio(props) {

    const [ currentText, setBioText ] = useState(props.currentBio) // The current value of the bio text field
    const [ editing, setEditing ] = useState(false) // Boolean, whether the user is currently editing their bio

    function handleSaveBio(e) { // Attempts to save the current bio to the database
        e.preventDefault()
        props.saveBio(currentText)
        setEditing(false) // Indicates no longer editing the bio
    }

    return (
        <div className="bioTab">
            <span className="tabMessage"> {props.message} </span>
            <h3 className="tabHeading"> Your Bio </h3>
            {editing ?
            <form onSubmit={handleSaveBio}>
                <textarea value={currentText} onChange={e => {setBioText(e.target.value)}} autoFocus={true}/>
                <br/>
                <input className="saveBio" type="submit" value="Save bio"/>
            </form>
            :
            <div>
                <p>{currentText}</p>
                <button className="editBio" onClick={() => {setEditing(true)}}> Edit Bio </button>
            </div>
            }
        </div>
    )
}
export default Bio
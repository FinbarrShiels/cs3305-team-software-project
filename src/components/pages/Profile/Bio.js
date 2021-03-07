import { useEffect, useState } from "react"
import "./bio.css"
function Bio(props) {

    const [ currentText, setBioText ] = useState(props.currentBio)
    const [ editing, setEditing ] = useState(false)

    function handleSaveBio(e) {
        e.preventDefault()
        props.saveBio(currentText)
        setEditing(false)
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
import React, { useReducer } from 'react'
import "./Organise.css"
import clipboard from "../../Images/clipboard.png"
import { useState } from "react"
import Switch from "react-switch"
import { useInput } from "../../../customHooks/form-input"
import {createPoll, createPollLink} from "../../../firebaseFunctions/polls"
import OrganiseOption from './OrganiseOption'
import { useHistory } from 'react-router'
import { useUser } from '../../../context/UserContext'
import { useEffect } from 'react/cjs/react.development'

function Organise() {

    const user = useUser()
    const history = useHistory()
    const { value:title, bind:bindTitle, reset:resetTitle } = useInput("")
    const { value:desc, bind:bindDesc, reset:resetDesc } = useInput("")
    // const { value:startTime, bind:bindStartTime, reset:resetStartTime } = useInput("")
    // const { value:startDate, bind:bindStartDate, reset:resetStartDate } = useInput("")
    // const { value:endTime, bind:bindEndTime, reset:resetEndTime } = useInput("")
    // const { value:endDate, bind:bindEndDate, reset:resetEndDate } = useInput("")
    const {value:customOption, bind:bindCustomOption, reset:resetCustomOption } = useInput("")
    const [ optionMsg, setOptionMsg ] = useState("")
    const [ anonChecked, setAnonChecked ] = useState(false)
    const [ options, setOptions ] = useState([])
    const [ nextIndex, setNextIndex ] = useState(0)
    const [ formErrors, setFormErrors ] = useState({
        title: null,
        desc: null
    })
    
    const addNewOption = e => {
        e.preventDefault()
        if (customOption.trim() !== "") {
            setOptions([ ...options,  { caption: customOption, index: nextIndex} ])
            setNextIndex(prevNextIndex => prevNextIndex + 1)
            setOptionMsg("Option added!")
            resetCustomOption()
        }
        else {
            setOptionMsg("Please give the option a name")
        }
    }
    
    const removeOption = indexToRemove => {
        setOptions(options.filter(option => {
            return option.index !== indexToRemove
        }))
    }

    const convertOptions = () => {
        let newArray = []
        let i = 0
        for (i=0; i<options.length; i++) {
            newArray.push(options[i].caption)
        }
        return newArray
    }
    
    const handleSubmit = e => {
        e.preventDefault()
        setFormErrors({
            title: title.trim() === "" ? "Please give your vote a title" : "",
            desc: desc.trim() === "" ? "Please give your vote a description" : ""
        })
    }

    useEffect(() => {
        if (
            formErrors.title === "" &&
            formErrors.desc === ""
        ) {
            let optionCaptions = convertOptions()
            console.log("Creating vote with the following options:")
            console.log(optionCaptions)
            createPoll(title, desc, anonChecked, optionCaptions)
            .then(response => {
                console.log(`SUCCESS CREATING POLL: ${response}`)
                history.push(createPollLink(user.uid, title))
            })
            .catch(error => {
                console.log('ERROR CREATING POLL:')
                console.log(error)
            })
        }
    }, [ formErrors ])

    return (

        <div className="votingContainer">
            <div className="voteSections">
            <div className="leftTab">
                <h2> Organise your <span>poll</span> </h2>
                <img src={clipboard} alt="img"/>
            </div>
            <div className="rightTab">
                <form className="voteOptions" onSubmit={handleSubmit}>
                    <div className="title">
                    <label>Title:</label>
                        <input type="text" {...bindTitle}/>
                    </div>
                    <div className="desc" >
                        <label>Description:</label>
                        <input type="text" {...bindDesc}/>
                    </div>
                    <div className="anonToggle" >
                    <label> Allow Anonymous Voters: </label>
                        <Switch checked={anonChecked} onChange={setAnonChecked}/>
                    </div>
                    {/* <div className="scheduleStart">
                    <label >Start:</label>
                    <input type="date" {...bindStartDate}/>
                    <input type="time" {...bindStartTime}/>
                    </div>
                    <div className="scheduleEnd">
                    <label>End:</label>
                    <input type="date" {...bindEndDate}/>
                    <input type="time" {...bindEndTime}/>
                    </div> */}
                    <div className="createOptions">
                        <h3> Create Options </h3>
                        <p>{optionMsg}</p>
                        <div onClick={addNewOption}>
                            <label htmlFor="customOption"> New Option: </label>
                            <input className="createOptionsInput" type="text" {...bindCustomOption} id="customOption"></input>
                            <input className="createOptionsButton" type="submit" value="Add Option"></input>
                        </div>
                    </div>
                    <div className="createVote">
                        <input type="submit" value="Create"/>
                    </div>
                </form>
                <div className="optionsList">
                    {options.map(option => <OrganiseOption key={options.indexOf(option)} index={option.index} caption={option.caption} remove={removeOption}/>)}
                </div>
            </div>
            </div>
        </div>
    )
}
export default Organise;
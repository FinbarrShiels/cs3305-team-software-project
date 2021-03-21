import React from 'react'
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
import FormError from '../../formError'

function Organise() {

    const user = useUser()
    const history = useHistory()
    const { value:title, bind:bindTitle } = useInput("")
    const { value:desc, bind:bindDesc } = useInput("")
    const { value:customOption, bind:bindCustomOption, reset:resetCustomOption } = useInput("")
    const [ optionMsg, setOptionMsg ] = useState("")
    const [ anonChecked, setAnonChecked ] = useState(false)
    const [ options, setOptions ] = useState([])
    const [ nextIndex, setNextIndex ] = useState(0)
    const [ creating, setCreating ] = useState(false)
    const [ formErrors, setFormErrors ] = useState({
        title: null,
        desc: null,
        options: null
    })
    
    const addNewOption = () => {
        if (customOption.trim() !== "") {
            let conflictFound = false
            for (let i=0;i<options.length;i++) {
                if (options[i].caption.toLowerCase() === customOption.toLowerCase()) {
                    conflictFound = true
                    setFormErrors({
                        ...formErrors,
                        options: `There's already an option with the caption ${customOption}`
                    })
                    setOptionMsg("Option captions are not case sensitive")
                    break
                }
            }
            if (!conflictFound) {
                setOptions([ ...options,  { caption: customOption, index: nextIndex} ])
                setNextIndex(prevNextIndex => prevNextIndex + 1)
                setOptionMsg(`${customOption} added`)
                setFormErrors({
                    ...formErrors,
                    options: ""
                })
                resetCustomOption()
            }
        }
        else {
            setFormErrors({
                ...formErrors,
                options: "Please give the option a name"
            })
            setOptionMsg("")
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

    const findOptionsError = () => {
        if (options.length > 1) {
            return ""
        } else {
            setOptionMsg("")
            return "You must have more than one option"
        }
    }
    
    const handleSubmit = e => {
        e.preventDefault()
        setFormErrors({
            title: title.trim() === "" ? "Please give your vote a title" : "",
            desc: desc.trim() === "" ? "Please give your vote a description" : "",
            options: findOptionsError()
        })
        setCreating(true)
    }

    useEffect(() => {
        if (
            formErrors.title === "" &&
            formErrors.desc === "" &&
            formErrors.options === "" &&
            creating === true
        ) {
            let optionCaptions = convertOptions()
            console.log("Creating vote with the following options:")
            console.log(optionCaptions)
            createPoll(title, desc, anonChecked, optionCaptions)
            .then(response => {
                console.log(`SUCCESS CREATING POLL: ${response}`)
                setFormErrors({
                    title: null,
                    desc: null,
                    options: null
                })
                setOptionMsg("")
                history.push(createPollLink(user.uid, title))
            })
            .catch(error => {
                console.log('ERROR CREATING POLL:')
                console.log(error)
            })
            setCreating(false)
        }
    }, [ creating ])

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
                        <FormError errorMsg={formErrors.title}/>
                        <label>Title:</label>
                        <input type="text" {...bindTitle}/>
                    </div>
                    <div className="desc" >
                        <FormError errorMsg={formErrors.desc}/>
                        <label>Description:</label>
                        <input type="text" {...bindDesc}/>
                    </div>
                    <div className="anonToggle" >
                    <label> Allow Anonymous Voters: </label>
                        <Switch checked={anonChecked} onChange={setAnonChecked}/>
                    </div>
                    <div className="createOptions">
                        <h3> Create Options </h3>
                        <p>{optionMsg}</p>
                        <div>
                            <FormError errorMsg={formErrors.options}/>
                            <label htmlFor="customOption"> New Option: </label>
                            <input className="createOptionsInput" type="text" {...bindCustomOption} id="customOption"></input>
                            <input className="createOptionsButton" type="submit" value="Add Option" onClick={e => {e.preventDefault(); addNewOption()}}></input>
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
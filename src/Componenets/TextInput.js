import React from 'react'


function TextInput(props){
    return(

        <div className={'TextInput'}>
            <h2 className={'Title'}> {props.title}:</h2>
            <h2 className={'Text'}>{props.text}</h2>
        </div>

    )
}

export default TextInput
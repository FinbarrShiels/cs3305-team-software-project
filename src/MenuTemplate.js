import React from 'react'
import './App.css';
import TextInput from "./Componenets/TextInput";
import Socials from "./Componenets/Socials";
import OptionalSetting from "./Componenets/OptionalSetting";
import Button from "./Componenets/Button";
import Heading from "./Componenets/Heading";

function MenuTemplate(){
    //any javaScript we want to implement with JSX just put in {}


    return (

        <div>
            <body className={'MenuTemplate'}>
                <Heading title={'Personal Settings'}/>

                <div className={'Input'}>
                    <div className={'text'}>

                    <div className={'names'}>
                        <TextInput title={'First Name'} text={"Old First Name"}/>
                        <TextInput title={'Last Name'} text={"Old Last Name"}/>
                    </div>
                        <TextInput title={'Email'} text={"Old Email"}/>
                        <TextInput title={'Occupation'} text={'Old Occupation'}/>
                    </div>
                    <div className={'flex'}>
                        <Socials />
                        <div className={'row'}>
                                <TextInput title={'Country'} text={'Old Country'}/>
                                <TextInput title={'City'} text={'Old City'}/>
                            <OptionalSetting text={"Show my Location"}/>
                        </div>
                    </div>
                    <Button text={'Confirm'} />
                </div>

            </body>
        </div>
    )
}

export default MenuTemplate;
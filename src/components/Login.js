import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import { FormControl, Input,Typography } from '@material-ui/core';


export default function Login(props) {

    const [state, setState]=useState({
        username: 'q',
        password: '3',
    })
    function handleUserNameChange(event) {
        const val = event.target.value
            setState(prev=>({
                ...prev,
                username: val
            }))

    }
    function handlePasswordChange(event) {
        const val = event.target.value
            setState(prev=>({
                ...prev,
                password: val
            }))
    }
    return (
        <div className='formControl'>
        <div className='login'>
        {props.failed && <Typography style={{marginBottom:30}} color='error' variant='body1'>Incorrect Username or Password</Typography>}
            <FormControl style={{marginBottom: 20}}>
                <Input onChange={handleUserNameChange} inputProps={{ style: {textAlign: 'center'} }} placeholder='Email address' type="email" name='email' id="email" required={true} />
            </FormControl>
            <FormControl style={{marginBottom: 20}}>
                <Input onChange={handlePasswordChange} inputProps={{ style: {textAlign: 'center'} }}  placeholder='Password' type="password" id="psswd" required={true} />
            </FormControl>
            <div className='myBtn'>
            <Button type="submit" color="primary" onClick={()=>props.handleSubmit(state.username,state.password)} 
            variant="contained">Submit</Button>
            </div>
            </div>
        </div >
    )
}
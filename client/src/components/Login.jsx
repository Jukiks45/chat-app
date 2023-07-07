import React, { useState} from 'react'
import { Link } from 'react-router-dom';
import './style/Login.css';
const Login = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    return (
        <div className='joinOuterContainer'>
            <div className='joinInnerContainer'>
                <h1 className='heading'>Selingkuhku</h1>
                <div><input placeholder='Name' className='joinInput' type="text" onChange={(e) => { setName(e.target.value) }} /></div>
                <div><input placeholder='Room' className='joinInput' type="text" onChange={(e) => { setRoom(e.target.value) }} /></div>
                <a onClick={e => (!name || !room) ? e.preventDefault() : null} href={`/chat?name=${name}&room=${room}`}>
                    <button className='button mt-20' type='submit'>Sign In</button>
                </a>
            </div>
        </div>
    )
}

export default Login;

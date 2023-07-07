import React, { useState } from 'react'
// import { Link } from 'react-router-dom';
import './style/Login.css';
const Login = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    return (
        <div className="containerjoin">
            <div className="form-container" id="login-form">
                <h1 className='h1join'>My Selingkuh</h1>
                <div className="formjoin">
                    <label className='labeljoin' for="username">Username</label>
                    <input className='inputjoin' type="text" id="username" onChange={(e) => { setName(e.target.value) }} required />
                    <label className='labeljoin' for="password">Room Chat</label>
                    <input className='inputjoin' type="text" id="password" onChange={(e) => { setRoom(e.target.value) }} required />
                    <a className='ajoin' onClick={e => (!name || !room) ? e.preventDefault() : null} href={`/chat?name=${name}&room=${room}`}>
                        <button className='buttonjoin' type="submit">Sign in</button>
                    </a>
                </div>
                <p className='pjoin'>Created By Jukiks45</p>
            </div>
        </div>
    )
}

export default Login;

import React from 'react'
import './style/input.css';
const Input = ({ message, sendMessage, setMessage }) => {
    return (
        <div className='from'>
            <input className='input' type="text" placeholder='ketikkan pesan anda' value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(event) => event.key === 'Enter' && sendMessage(event)} />
            <button className='sendButton' onClick={(event) => sendMessage(event)}>Send</button>
        </div>
    )
}

export default Input

import React from 'react'
//css 
import './style/infobar.css';
//icons
import closeIcon from './icons/closeIcon.png';
import onlineIcon from './icons/onlineIcon.png';
const InfoBar = ({room}) => {
    return (
        <div className='infoBar'>
            <div className='leftInnerContainer'>
                <img className='onlineIcon' src={onlineIcon} alt="online_image" />
                <h3>{room}</h3>
            </div>
            <div className='rightInnerContainer'>
                <a href='/'><img src={closeIcon} alt="cloese_image" /></a>
            </div>
        </div>
    )
}

export default InfoBar;
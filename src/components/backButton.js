import React from 'react';
import '../styles/index.css'
import arrow from '../media/arrow.png'

function backButton (props){
    function goBack(){
        props.prevProps.history.goBack();
    }
    const response = (
        <div onClick={goBack} className='back-btn'>
            <img width={"50%"} src={arrow} alt={"back btn"}/>
        </div>
    )
    return response;
}

export default backButton;
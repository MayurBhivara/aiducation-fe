import React, {useState} from 'react';
import '../styles/index.css'
import arrow from '../media/arrow.png'
import BackButton from "./backButton";
function header (props){
    const {label, prevProps} = props;
    function goBack (){
        props.history.goBack();
    }
    const response = (
        <div className='header-bar'>
            <BackButton prevProps= {prevProps}/>
            <div className='header-label'>{label}</div>
        </div>
    )
    return response;
}

export default header;
import React from 'react';
import '../styles/index.css'
import BackButton from "./backButton";
function header (props){
    const {label, prevProps} = props;

    const response = (
        <div className='header-bar'>
            <BackButton prevProps= {prevProps}/>
            <div className='header-label'>{label}</div>
        </div>
    )
    return response;
}

export default header;
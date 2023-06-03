import React from 'react';
import '../styles/index.css'
import Header from "../components/header"
import Camera from '../components/camera';
function uploadPage (props){
    return(
        <div>
            <Header label={"Upload Images"} prevProps = {props} />
            <Camera />
        </div>
    )
}

export default uploadPage;
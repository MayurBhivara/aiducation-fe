import React, {useState} from 'react';
import Button from '../components/button'
import '../styles/index.css'
import homepageImage from "../media/homepageimage.png"

function homepage (props){
    function sendToUpload (){
        props.history.push('/upload') 
    }
    const component = (
        <div className='homepage-container'>
            <div className='home-img'>
                <img src={homepageImage} />
            </div>
            <div className='home-title-container'>
                <div className='home-title-1'>TAKE MY</div>
                <div className='home-title-2'>TEST</div>
            </div>
            <div className='home-start-btn'>
                <Button label={"LET'S START"} exeFun={sendToUpload}/>
            </div>
        </div>
    )
    return (component)
}

function sendToUpload (){
    this.nextPath('/upload') 
}
export default homepage;
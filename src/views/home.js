// eslint-disable-next-line
import React from 'react';
import Button from '../components/button'
import '../styles/index.css'
import homepageImage from "../media/homepageimage.png"
import aidlogo from "../media/aidlogo.png"

function homepage (props){
    function sendToUpload (){
        props.history.push('/upload') 
    }
    const component = (
        <div className='homepage-container'>

            <div className='logo'>
                <img className='logo-img' src={aidlogo}  alt={"abc"}/>
            </div>
            <div className='home-img'>
                <img src={homepageImage}  alt={"abc"}/>
            </div>
            <div className='home-title-container'>
                <div className='home-title-1'>AI-ducation presents</div>
                <div className='home-title-2'>QUIZ GAME</div>
            </div>
            <div className='home-start-btn'>
                <Button label={"LET'S START"} exeFun={sendToUpload}/>
            </div>
        </div>
    )
    return (component)
}


export default homepage;
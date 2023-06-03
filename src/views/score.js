import React, { useState,useEffect } from 'react';
import '../styles/index.css'
import Header from "../components/header"
import Score from '../components/score';
import Loader from '../components/loader';
function scorePage (props){

    const [isLoading, setIsLoading] = useState(true)
    const [headerText, setHeaderText] = useState("Loading...")

    useEffect(() => {
        const timer = setTimeout(() => {
          setIsLoading(false);
          setHeaderText("Score");
        }, 3000);
        return () => clearTimeout(timer);
      }, []);

    return(
        <div className="container">

            <Header label={headerText} prevProps = {props} />
            {/* <Score/> */}

            {isLoading ?  <Loader/> :  <Score/>}
           
        </div>
    )
}

export default scorePage;
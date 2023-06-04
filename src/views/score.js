import React, { useState,useEffect } from 'react';
import '../styles/index.css'
import Header from "../components/header"
import Score from '../components/score';
import Loader from '../components/loader';
function scorePage (props){
  const {cards, questions, summaryText} = props.location.state
    const [isLoading, setIsLoading] = useState(true)
    const [headerText, setHeaderText] = useState("Loading...")

    useEffect(() => {
        const timer = setTimeout(() => {
          setIsLoading(false);
          setHeaderText("Score");
        }, 100);
        return () => clearTimeout(timer);
      }, []);

    return(
        <div className="container">

            <Header label={headerText} prevProps = {props} />
            {isLoading ?  <Loader/> :  <Score cards={cards} questions={questions} prevProps={props} summaryText={summaryText}/>}

        </div>
    )
}

export default scorePage;
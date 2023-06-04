import React, { useState, useEffect } from 'react'
import Button from '../components/button';
import shinyTrophy from './shining-trophy.gif'

// const cards = [
//   {
//     heading: "Quiz Score",
//     main: "80%"
//   },
//   {
//     heading: "Chapter Score",
//     main: "7.5"
//   }
// ]

const Score = (props) => {
  // const [cards, setCards] = useState([]);
  const cards = props.cards || []
  const questions = props.questions || {}
  const summaryText = props.summaryText || "";

  const showSummary = ()=>{
    props.prevProps.history.push({pathname:"/summary", state:questions})
  }
  // useEffect(() => {
  //   setCards(props.cards)
  // })
    return (
        <div className="score-container">
          <div className="top-half">
            <h2>Congratulations</h2>
            <img src={shinyTrophy} alt="Logo" />
          </div>
          <div className="bottom-half">
            {
              cards.map((cardVal) => (
                <div className="score__container--card--container"   >
                  <p className="card--container--heading">{cardVal.heading}</p>
                  <p className="card--container--main"   >{cardVal.main}</p>
                </div>
              ))
            }
            
          </div>
            <div className='pro-tip'>
              {summaryText.length>0? "Pro Tip: " + summaryText : ""}
            </div>
          <div className='home-start-btn'>
                <button onClick={(e)=>{e.preventDefault(), showSummary()}} className='default-btn'>View Report</button>
          </div>
        </div>
      );
}
export default Score
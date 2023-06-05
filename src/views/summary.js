import React from 'react';
import Header from "../components/header"
import tick from "../media/tick.png"
import cross from "../media/cross.png"
import '../styles/index.css'
function summaryPage (props){
    const questions = props.location.state;
    const getOptions = (options, qno)=>{
        const optionsArr = Object.keys(options).map(opt=>{
            const option = options[opt];
            const ansRight = questions[qno].selected === questions[qno].ans
            let classname = "qna-options";
            let mark = false
            if(ansRight && questions[qno].selected === opt){
                classname += " right-ans";
                mark = tick
            }else if(!ansRight && questions[qno].selected === opt){
                classname += " wrong-ans";
                mark = cross;
            }
            return (
                <div className={classname}>
                    <input className='qna-options-radio'  type="radio" value={qno+"."+opt} checked={questions[qno].selected === opt}/>
                    <span style={{marginLeft:10}}>{option} {mark? <img src={mark}/>:""}</span>
                </div>
            )
        })
        return optionsArr;
    }
    const getQuestions = ()=>{
        const ques = Object.keys(questions).map(q => {
            const quest = questions[q];
            const content = (
                <div >
                    <div className='qna-questions'>Q.{q+ ": "} {quest.ques}</div>
                    <div>
                        {getOptions(quest.options, q)}
                    </div>
                </div>
            )
            return content;
        });
        return ques;
    }

    return(
        <div className='summary-container'>
            <Header label={"Summary"} prevProps={props} />
            <div className='questions-summary'>
                {getQuestions()}
            </div>
            <button onClick={()=>{props.history.push("/")}} className='default-btn restart-btn' >Back To Home</button>
        </div>
    )
}

export default summaryPage;
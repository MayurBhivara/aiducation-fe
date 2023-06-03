import React, {useState} from 'react';
import Header from '../components/header';
import * as axios from 'axios';
const quiz = (props) => {
    const questionsData = props.location.state
    const textStr = questionsData.text;
    const [text, setText] = useState("");
    const [comparisionText, setCompText] = useState(textStr||"")
    delete questionsData["text"];
    const [questions, setquestions] = useState(questionsData || {});
    const [showErr, setShowErr] = useState(false)
    const [allAnsDone, setAllAnsDone] = useState(false)

    const calculateAns = ()=>{
        let rightAns= 0;
        Object.keys(questions).forEach(x=>{
            if(questions[x].selected === questions[x].ans) rightAns++;
        })
        const questionCount = Object.keys(questions).length;
        const score = Math.floor((rightAns*100)/questionCount) + "%";
        return score;
    }

    const checkAllAns = ()=>{
        if(!text.length){
            setAllAnsDone(false);
            return;
        };
        const quesNos = Object.keys(questions);
        for(let i =0; i<quesNos.length; i++){
            if(!questions[quesNos[i]].selected) {
                setAllAnsDone(false);
                return;
            }
        }
        setAllAnsDone(true)
    }
    const submitForm = ()=>{
        checkAllAns();
        if(!allAnsDone){
            setShowErr(true)
            return;
        }
        const score = calculateAns();
        const getScore = axios.post("https://mumbaihacks-be-2.sarjak-chawda.repl.co/v1/ml/rate-text", {text:comparisionText, userText: text}).then(res=>{
            const cards = [
                {
                  heading: "Quiz Score",
                  main: score
                },
                {
                  heading: "Chapter Score",
                  main: res.data.rating
                }
              ]
              props.history.push({pathname:"/score", state: cards});
        });
    }

    const selectAns = (option)=>{
        const data = {...questions};
        const [qno, opt] = option.split(".");
        data[qno].selected = opt;
        setquestions(data);
    }
    const getOptions = (options, qno)=>{
        const optionsArr = Object.keys(options).map(opt=>{
            const option = options[opt];
            return (
                <div className='qna-options'>
                    <input onClick={(e)=>{ selectAns(e.target.value)}} className='qna-options-radio'  type="radio" value={qno+"."+opt} checked={questions[qno].selected === opt}/>
                    <label>{option}</label>
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
                    <div className='qna-questions'>Q.{q+ " > "} {quest.ques}</div>
                    <div>
                        {getOptions(quest.options, q)}
                    </div>
                    {showErr && !quest.selected ? <div className='ans-prompt'>*Please provice an answer</div>: ""}
                </div>
            )
            return content;
        });
        return ques;
    }

    return (
        <div>
            <Header prevProps={props} label={"Quiz Questions"} />
            {/* <div className='difficulty-choice-container'>
                <div>
                    Choose your difficulty level
                </div>
                <div className='difficulty-form'>
                    <div className="radio">
                        <input onChange={()=>chooseDifficulty("easy")} type="radio" value="easy" checked={difficulty==="easy"} />
                        Easy
                    </div>
                    <div className="radio">
                        <input onChange={()=>chooseDifficulty("medium")} type="radio" value="medium" checked={difficulty==="medium"}/>
                        Medium
                    </div>
                    <div className="radio">
                        <input onChange={()=>chooseDifficulty("difficult")} type="radio" value="difficult" checked={difficulty==="difficult"}/>
                        Difficult
                    </div>
                </div>
            </div> */}

            <div className='qna-container'>
                {getQuestions()}
            </div>
            <div className='qna-container desc-container'>
                <div className='brief-question'>Q.{(Object.keys(questions).length + 1)+ " > "} {"What did you understand from the passage/lesson/chapter? Write in brief."}</div>
                <div className='text-area-container'>
                    <textarea onChange={(e)=>{e.preventDefault(); setText(e.target.value)}} className='text-area' name="postContent" rows={6} cols={40} />
                </div>
            </div>
            <div className='submit-btn'>
                <button onClick={(e)=>{e.preventDefault(); submitForm()}} className='qna-container default-btn'>Submit {">"}</button>
            </div>
        </div>
    )
}

export default quiz;
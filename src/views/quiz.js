import React, {useState, useEffect} from 'react';
import Header from '../components/header';
import Loader from '../components/loader';

const hardCodedData = {
    "1": {
        "ques": "Who lived in the same village as Mike?",
        "options": {
            "A": "Morris and Mike",
            "B": "Mike and Mark"
        },
        "ans": "A",
        "type": "mcq"
    },
    "2": {
        "ques": "What was Mike's occupation?",
        "options": {
            "A": "Farmer",
            "B": "Jeweler"
        },
        "ans": "B",
        "type": "mcq"
    },
    "3": {
        "ques": "What did Mike tell his sons to do?",
        "options": {
            "A": "Make a fire",
            "B": "Cut wood from tree"
        },
        "ans": "B",
        "type": "mcq"
    },
    "4": {
        "ques": "What did Mike's wife ask her husband?",
        "options": {
            "A": "Feed his family",
            "B": "What shall we eat?"
        },
        "ans": "B",
        "type": "mcq"
    },
    "5": {
        "ques": "What did Morris do after hearing Mike's story?",
        "options": {
            "A": "Leave the village",
            "B": "Pack some clothes"
        },
        "ans": "B",
        "type": "mcq"
    }
};

const quiz = (props) => {
    const questionsData = hardCodedData || props.location.state
    const textStr = questionsData.text;
    const [text, setText] = useState(textStr||"");
    delete questionsData["text"];
    const [questions, setquestions] = useState(questionsData || {});
    const [showErr, setShowErr] = useState(false)
    const [allAnsDone, setAllAnsDone] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [headerText, setHeaderText] = useState("Loading...")

    useEffect(() => {
        const timer = setTimeout(() => {
          setIsLoading(false);
          setHeaderText("Questions");
        }, 2000);
        return () => clearTimeout(timer);
      }, []);

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
        console.log("here")
        checkAllAns();
        if(!allAnsDone){
            setShowErr(true)
            return;
        }
        
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
                    <span style={{marginLeft:10}}>{option}</span>
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
                    {showErr && !quest.selected ? <div className='ans-prompt'>*Please provice an answer</div>: ""}
                </div>
            )
            return content;
        });
        return ques;
    }

    return (
        <div>
            <Header prevProps={props} label={headerText} />
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
            {
             isLoading ? <Loader/> 
             : <div>
                <div className='qna-container'>
                    {getQuestions()}
                </div>
                <div className='qna-container desc-container'>
                    <div className='brief-question'>Q.{(Object.keys(questions).length + 1)+ ": "} {"What did you understand from the passage/lesson/chapter? Write in brief."}</div>
                    <div className='text-area-container'>
                        <textarea onChange={(e)=>{e.preventDefault(); setText(e.target.value)}} className='text-area' name="postContent" rows={6} cols={40} />
                    </div>
                </div>
                <div className='submit-btn'>
                    <button onClick={(e)=>{e.preventDefault(); submitForm()}} className='qna-container default-btn'>Submit {">"}</button>
                </div>
             </div>   
            }
            
        </div>
    )
}

export default quiz;
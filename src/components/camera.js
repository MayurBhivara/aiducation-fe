// eslint-disable-next-line
import React, { useState } from 'react'
import Webcam from 'react-webcam'
const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: 'user',
}
const Profile = () => {
  const [picture, setPicture] = useState('');
  const [picsArr, setPicsArr] = useState([]);
  const [showCam , setShowCam] = useState(true);
  const [showButtons , setShowButtons] = useState(true);
  const webcamRef = React.useRef(null)
  const capture = React.useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot()
    
    setPicture(pictureSrc);
    setShowCam(false);
    setShowButtons(true);
  })

  const captureBtn = (
    <button
    onClick={(e) => {
      e.preventDefault()
      capture()
    }}
    className="default-btn capture-btn"
  >
    Capture
  </button>
  )

  const retakeBtn = (
    <button
    onClick={(e) => {
      e.preventDefault()
      setPicture("")
      setShowCam(true)
    }}
    className="review-btn"
  >
    X
  </button>
  )

  const addPicBtn = (
    <button 
    onClick={(e) => {
      e.preventDefault()
      addPic();
    }}
    className="review-btn"
  >
    ✓
  </button>
  )

  const addPic = ()=>{
    const arr = [...picsArr, picture];
    setShowButtons(false);
    setPicsArr(arr);
  }
  const adterClick = showButtons?(
      <div className='review-btn-container'>
          <div>
              {retakeBtn}
          </div>
          <div>
              {addPicBtn}
          </div>
      </div>
  ) : ""
    function getPictureGrid(){

        if(picsArr.length > 0){
            const picGrid = picsArr.map((pic, idx)=>{
                return (
                    <div >
                        <img className='grid-img' src={pic} key={idx} alt={"abc"}/>
                    </div>
                )
            })
            return picGrid;
        }
        return '';
    }
    function addImage (){
        setShowCam(true);
    }
    const imagegrid = picsArr.length > 0? (
        <div className="grid-bot">
            <div className='picture-grid-container'>
                <div className='picture-grid' >
                    {getPictureGrid()}
                </div>
                <div>
                    {picsArr.length < 5? <button className='add-icon' onClick={addImage}>
                        +
                    </button> : ""}
                </div>
            </div>
            <div>
                <button className='default-btn'>Done</button>
            </div>
        </div>
    ) : "";

  return (
    <div>
      <div>
        {(showCam  && picsArr.length < 5)? (
          <Webcam
            audio={false}
            height={400}
            ref={webcamRef}
            width={400}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
        ) : (
          <img src={picture} alt={"abc"} />
        )}
      </div>
      <div className='capture-btn-container'>
        {!showCam ? (
          adterClick
        ) : (
            captureBtn
        )}
      </div>
      {imagegrid}
    </div>
  )
}
export default Profile
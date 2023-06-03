import React, { useState } from 'react'
import Webcam from 'react-webcam'
const WebcamComponent = () => <Webcam />
const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: 'user',
}
const Profile = () => {
  const [picture, setPicture] = useState('');
  const [picsArr, setPicsArr] = useState([]);
  const [showCam , setShowCam] = useState(true);
  const webcamRef = React.useRef(null)
  const capture = React.useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot()
    
    setPicture(pictureSrc);
    setShowCam(false);
  })

  const captureBtn = (
    <button
    onClick={(e) => {
      e.preventDefault()
      capture()
    }}
    className="btn btn-danger"
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
    className="btn btn-primary"
  >
    Retake
  </button>
  )

  const addPicBtn = (
    <button
    onClick={(e) => {
      e.preventDefault()
      addPic();
    }}
    className="btn btn-primary"
  >
    Add pic
  </button>
  )

  const addPic = ()=>{
    const arr = [...picsArr, picture];
    console.log(arr)
    setPicsArr(arr);
  }
  const adterClick = (
      <div>
          <div>
              {retakeBtn}
          </div>
          <div>
              {addPicBtn}
          </div>
      </div>
  )
    function getPictureGrid(){

        if(picsArr.length > 0){
            const picGrid = picsArr.map(pic=>{
                return (
                    <div >
                        <img className='grid-img' src={pic} />
                    </div>
                )
            })
            return picGrid;
        }
        return '';
    }
    const imagegrid = picsArr.length > 0? (
        <div className='picture-grid'>
            {getPictureGrid()}
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
          <img src={picture} />
        )}
      </div>
      <div>
        {!showCam ? (
          adterClick
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault()
              capture()
            }}
            className="btn btn-danger"
          >
            Capture
          </button>
        )}
      </div>
      {imagegrid}
    </div>
  )
}
export default Profile
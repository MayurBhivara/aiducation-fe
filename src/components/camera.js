// eslint-disable-next-line
import React, { useState } from 'react'
import * as axios from 'axios'
import Webcam from 'react-webcam'
import Loader from '../components/loader';

const videoConstraints = {
    width: 450,
    height: 450,
    facingMode: 'user',
    imageSmoothing: false,
    torch: true
}
const Camera = (props) => {
    const [picture, setPicture] = useState('');
    const [picsArr, setPicsArr] = useState([]);
    const [showCam, setShowCam] = useState(true);
    const [showButtons, setShowButtons] = useState(true);
    const [isLoading, setIsLoading] = useState(false)
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

    const addPic = () => {
        const arr = [...picsArr, picture];
        setShowButtons(false);
        setPicsArr(arr);
    }
    const adterClick = showButtons ? (
        <div className='review-btn-container'>
            <div>
                {retakeBtn}
            </div>
            <div>
                {addPicBtn}
            </div>
        </div>
    ) : ""
    function getPictureGrid() {

        if (picsArr.length > 0) {
            const picGrid = picsArr.map((pic, idx) => {
                return (
                    <div >
                        <img className='grid-img' src={pic} key={idx} alt={"abc"} />
                    </div>
                )
            })
            return picGrid;
        }
        return '';
    }
    function addImage() {
        setShowCam(true);
    }
    const imagegrid = picsArr.length > 0 ? (
        <div className="grid-bot">
            <div className='picture-grid-container'>
                <div className='picture-grid' >
                    {getPictureGrid()}
                </div>
                <div>
                    {picsArr.length < 5 ? <button className='add-icon' onClick={addImage}>
                        +
                    </button> : ""}
                </div>
            </div>
            <div>
                <button onClick={(e) => { e.preventDefault(); handleSubmit() }} className='default-btn'>Done</button>
            </div>
        </div>
    ) : "";
    const facingMode = "environment";

    function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[arr.length - 1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }


    const handleSubmit = async () => {
        const data = new FormData();
        setIsLoading(true);
        for (var x = 0; x < picsArr.length; x++) {
            let compressedFile = picsArr[x];
            const file = dataURLtoFile(compressedFile, x + ".jpeg")
            data.append('file', file)
        }
        axios.post("https://mumbaihacks-be-2.sarjak-chawda.repl.co/v1/ml/upload-images", data)
            .then(res => {
                setIsLoading(false)
                props.prevProps.history.push({ pathname: "/quiz", state: res.data });
            }).catch(e => {
                setIsLoading(false)
                props.prevProps.history.push({ pathname: "/quiz", state: { msg: e.message } });
            })
    }

    return (
        isLoading? <Loader/> : <div>
            <div>
                {(showCam && picsArr.length < 5) ? (
                    <Webcam
                        audio={false}
                        height={400}
                        ref={webcamRef}
                        width={400}
                        screenshotFormat="image/jpeg"
                        videoConstraints={{ ...videoConstraints, facingMode }}
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
export default Camera
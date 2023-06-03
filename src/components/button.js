import React, {useState} from 'react';
import '../styles/index.css'
function button ( {exeFun, label, styleName="default-btn" }){
    return (<div className={styleName} onClick={exeFun}>{label}</div>)
}
export default button;
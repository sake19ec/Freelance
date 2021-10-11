import React, { useState } from 'react'


export default function MessageBox(props) {
    const [showMsg, setShowMsg] = useState(true)
    const theXButton = ()=>{
        setShowMsg(false)
    }
    return (
        showMsg&&
        <div className={props.variant} id={props.id}>
            {props.children}
            <button onClick={theXButton}>X</button>
        </div>
    )
}
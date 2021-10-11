import React from 'react'
import Profile from './Profile'

export default function Comment({name,text,id,followed}) {
    return (
        <div className="single-comment">
            <Profile name={name} id={id} followed={followed}/>
            <p>{text}</p>
        </div>
    )
}

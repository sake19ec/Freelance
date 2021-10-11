import React from 'react'
export default function BeforeFooter(props) {
    return (
        <div className={`before-footer-${props.title}`}>
            <h2>{props.title}</h2>
            <div>
            {props.children}
            </div>
            {<p className="more">{props.title!=="Category"&&"More >>"}</p>}
        </div>
    )
}

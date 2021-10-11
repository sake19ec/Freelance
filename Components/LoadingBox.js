import React, { useState } from 'react'

export default function LoadingBox() {
    const image = "/2B-transparent-half-border_1.png";
    return (
        <div class="loading-screen">
            <div class="loading-animation">
                <img src={image} alt="" class="logo"/>
                <div class="loading-bar"></div>
            </div>
        </div>
    )
}

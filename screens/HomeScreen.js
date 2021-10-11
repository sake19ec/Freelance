import React, { useEffect, useState } from 'react'
import VidsComponent from '../Components/VidsComponent'  
import { useDispatch, useSelector } from 'react-redux';
import { getVideos } from '../Actions/VideoActions';
import LoadingBox from '../Components/LoadingBox';

export default function HomeScreen() {
    const userLogin = useSelector(state => state.userLogin)
    const videos = useSelector(state => state.videos)
    let {loading,error,payload} = videos;
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getVideos(userLogin.id))
    },[])
    return (
        <>
        {loading?<LoadingBox/>:
        <div className="home-page">
          
            <VidsComponent videos={payload}/>
         </div>
        }
    </>
    )
}

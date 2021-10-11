import React, { useEffect, useState } from 'react'
import {Player,BigPlayButton} from 'video-react'
import Comment from './Comment'
import "../../node_modules/video-react/dist/video-react.css";
import { useDispatch, useSelector } from 'react-redux';
import { cancelLike, commentVideo, likeVideo, sharevideo, viewVideo } from '../Actions/VideoActions';
import Profile from './Profile';

export default function Video({vid,playVid,showVidElts=true}) {
    const dispatch = useDispatch()
    const Link = vid.video_link&&vid.video_link.replace("../front-end/public","")
    let toggleLike=vid.isLiked
    const userLogin = useSelector(state => state.userLogin)
    const [loading, setLoading] = useState(false)
    const like = ()=>{
        if(userLogin.id){
            toggleLike = !toggleLike
            if(toggleLike && !vid.isLiked){
                vid.isLiked = true
                vid.likes++;
                dispatch(likeVideo(userLogin.id,vid.id))
            }
            if(!toggleLike && vid.isLiked){
                vid.isLiked = false
                vid.likes--;
                dispatch(cancelLike(vid.id))
            }
        }
    }

    const share = ()=>{
        if(userLogin.id){
            vid.shares++;
            dispatch(sharevideo(userLogin.id,vid.id))
        }
    }
    const view = ()=>{
        if(userLogin.id){
            dispatch(viewVideo(userLogin.id,vid.id))
        }
    }
    const HandleLoad = () => {
        let elt = document.getElementById(vid.id+"");
        if(elt){
            elt = elt.querySelector(".video")
            if(elt.clientHeight>600){
                elt.style.width="34.2%";
            }
        }
    }
    const handleVideo = (player)=>{
        if(player!==null && player.actions!==null){
                if(playVid && player.video.video.currentTime===0){
                    setTimeout(()=>{
                        player.actions.play();
                    },200)
                }else if(!playVid){
                    player.actions.pause();
                }
  
            }
        
    }
    return (
        <div className="one-swipe" id={vid.id} onLoadedData={HandleLoad}>
            <Profile name={vid.name} id={vid.user_id} followed={vid.followed}/>
            <div className="video">
                <Player 
                    ref={(player) => {handleVideo(player)}}
                    poster={Link}
                    src={`https://13k13.com${Link}`}
                    fluid = {true}
                    onPlay ={view}
                    >
                    <BigPlayButton position="center"/>
                </Player> 
                {showVidElts&&(
                <div className="video-elements">
                    <p><i className={`fa fa-heart ${(vid.isLiked)&&"red-heart"}`} onClick={like}></i> {vid.likes} </p>
                    <p><i className="fa fa-comment" ></i> {vid.comments} </p>
                    <p><i className="fa fa-share" onClick={share}></i> {vid.shares} </p>
                    <p><i className="fa fa-eye"></i> {vid.views}</p>
                </div> 
                )}
            </div>
        </div>
    )
}

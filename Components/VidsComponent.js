import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css"
import Video from './Video';
import BeforeFooter from './BeforeFooter';
import { useDispatch, useSelector } from 'react-redux';
import { commentVideo } from '../Actions/VideoActions';
import Comment from './Comment'
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
export default function VidsComponent({videos=[{}]}) {
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const [showAddComment, setShowAddComment] = useState(false)
    const [commentText, setCommentText] = useState("")
    const [i, setI] = useState(0);
    let data = [];
    const comment = ()=>{
        if(userLogin.id&&commentText.length>0){
            videos.map(video=>{
                if(video.id===i){
                    video.AllComments.push({user_id:userLogin.id,video_id:video.id,text:commentText,name:userLogin.username})
                    video.comments++;
                    dispatch(commentVideo(userLogin.id,video.id,commentText))
                    setCommentText("")
                }
            })
        }
    }
    const handleKeyPress = (e)=>{
        if(userLogin.id){            
            if(e.key === "Enter"){
                comment()
            }
        }
    }
    const handleVideoComments = (id)=>{
        data = videos.map(video=>{
            if(video.id=== id){
                return (video.AllComments&&video.AllComments.length>0?(
                        video.AllComments.map(item=>(
                        <Comment name={item.name}id={item.user_id}  text={item.text} followed={item.followed}/>
                    ))
                ):(
                    <p className="comment-first">Be the first one to comment ! {videos.id}</p>
                  )
                )
            }
        }).filter(item=>item!==undefined);
        return data;
    }
    return (
        <div>
            <div className="login-now">
                <p>Login to show the world  your talents </p>
                </div>
        <div className="vids">
            <Swiper
                spaceBetween={20}
                slidesPerView="auto"
                navigation={true}
                className="swiper"
            >
            {
                videos.length>0&&videos.map(item=>(
                   <SwiperSlide>
                    {({ isActive }) => {
                        setTimeout(() => {
                            if(isActive){
                                setI(item.id);
                            }
                        }, 100);
                        return <Video vid={item} playVid={isActive}/>
                    }}
                     
                    </SwiperSlide> 
                ))
            }
             </Swiper>
             <div className="comments">
                <h1><i className="fa fa-comment fa-2x"></i></h1>
                <div className="all-comments">
                    {handleVideoComments(i)}
                </div>

                <div className="add-comment">
                    <div className="toggle-add-comment" onClick={()=>setShowAddComment(!showAddComment)}>
                        <i className={`fa fa-${showAddComment?'close':'plus'}`}></i>
                    </div>
                    {showAddComment&&(
                        <>
                        <input type="text" placeholder="add a comment here!" autoFocus value={commentText} onKeyPress={e=>handleKeyPress(e)} onChange={e=>setCommentText(e.target.value)}/>
                        <i className="fa fa-send" onClick={comment}></i>
                        </>
                    )}
                </div>

        </div>
            <div className="before-footer">
                 <BeforeFooter title="Trending">
              <table>
                <tr>
                    <td>
                        User
                    </td>
                    <td>
                        User
                    </td>
                    <td>
                        User
                    </td>
                    <td>
                        User
                    </td>
                    <td>
                        User
                    </td>
                </tr>
                <tr>
                    <td>
                        User
                    </td>
                    <td>
                        User
                    </td>
                    <td>
                        User
                    </td>
                    <td>
                        User
                    </td>
                    <td>
                        User
                    </td>
                </tr>
                <tr>
                    <td>
                        User
                    </td>
                    <td>
                        User
                    </td>
                    <td>
                        User
                    </td>
                    <td>
                        User
                    </td>
                    <td>
                        User
                    </td>
                </tr>
            </table>
            </BeforeFooter>
                 <BeforeFooter title="Category">
            <table>
            <tr>
                    <td>
                        Sports
                    </td>
                    <td>
                        Drama
                    </td>
                    <td>
                        Fantasy
                    </td>
                    <td>
                        Comedy
                    </td>
                    <td>
                        Science
                    </td>
                </tr>
                <tr>
                <td>
                        Sports
                    </td>
                    <td>
                        Drama
                    </td>
                    <td>
                        Fantasy
                    </td>
                    <td>
                        Comedy
                    </td>
                    <td>
                        Science
                    </td>
                </tr>
                <tr>
                <td>
                        Sports
                    </td>
                    <td>
                        Drama
                    </td>
                    <td>
                        Fantasy
                    </td>
                    <td>
                        Comedy
                    </td>
                    <td>
                        Science
                    </td>
                </tr>
            </table>
            </BeforeFooter>
                 <BeforeFooter title="Discover">
            <table>
            <tr>
                    <td>
                        User
                    </td>
                    <td>
                        User
                    </td>
                    <td>
                        User
                    </td>
                    <td>
                        User
                    </td>
                </tr>
                <tr>
                    <td>
                        User
                    </td>
                    <td>
                        User
                    </td>
                    <td>
                        User
                    </td>
                    <td>
                        User
                    </td>
                </tr>
                <tr>
                    <td>
                        User
                    </td>
                    <td>
                        User
                    </td>
                    <td>
                        User
                    </td>
                    <td>
                        User
                    </td>
                </tr>
            </table>
            </BeforeFooter>
            </div>

        </div></div>
    )
}

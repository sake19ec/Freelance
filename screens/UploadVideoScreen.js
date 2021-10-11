import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { upVideo, videoUpload } from '../Actions/VideoActions';
import {Link, Redirect} from 'react-router-dom'
import LoadingBox from '../Components/LoadingBox';
import {useDropzone} from 'react-dropzone';
import {CircularProgressbar,buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Video from '../Components/Video';
import Player from 'video-react/lib/components/Player';
import BigPlayButton from 'video-react/lib/components/BigPlayButton';



export default function UploadVideoScreen() {
    const userLogin = useSelector(state => state.userLogin)
    const videoUploaded = useSelector(state=>state.videoUploaded)
    const uploadVideo = useSelector(state => state.uploadVideo);
    const {uploaded,error,loading} = videoUploaded;
    const {percent,videoPath} = uploadVideo.payload||0; 
    const dispatch = useDispatch()
    const [title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [video, setVideo] = useState({});
    const [visibility, setVisibility] = useState("");
    const [droped, setDroped] = useState(false)
    const [fileTooLarge, setFileTooLarge] = useState(false)
    let dropzoneEffect;
    const onDrop = useCallback((acceptedFiles,rejectedFiles) => {
        if(rejectedFiles[0]){
            setFileTooLarge(true)
        }else{
            setVideo(acceptedFiles[0])
            setDroped(true)
            setFileTooLarge(false)
        }
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop,accept:".mp4, .MPEG-4, .mkv",maxSize:100000000})
    dropzoneEffect = isDragActive?"droped":'';
    localStorage.setItem("useInfo",JSON.stringify(userLogin))
    const conditionToPost = (video.name!==undefined&&videoPath!==undefined  &&title.length>0 && Description.length>0 && visibility.length>0 && userLogin.id&&userLogin.id.length>0)
    const uploadVid = (e)=>{
        e.preventDefault()
        if(conditionToPost){
            const formData = new FormData()
            formData.append("video",videoPath)
            formData.append("title",title)
            formData.append("description",Description)
            formData.append("visibility",visibility)
            formData.append("id",userLogin.id)
            dispatch(upVideo(formData));
            setTitle("");
            setDescription("");
            setDroped(false)
            setVideo({});
            setVisibility("")
            return  <Redirect to="/" />

        }

    }
    const manageVideo = e=>{
        setDroped(true)
        if(e.target.files[0]&&e.target.files[0].size>100000000){
            setFileTooLarge(true)
        }else{
            setVideo(e.target.files[0])
            setFileTooLarge(false)
            const formData = new FormData()
            formData.append("video",e.target.files[0])
            dispatch(videoUpload(formData))
        }
    }
    const HandleLoad = ()=>{
        let elt = document.getElementsByClassName("uploaded-video")[0];
        if(elt){
            if(elt.clientHeight>1000){
                elt.style.width="50%";
            }
        }
    }
    const abortUpload = ()=>{
        window.location.reload()
    }
    uploaded&&(window.location.replace("/"))
    return (
        loading ?<LoadingBox/>:
        <div className="upload">
            <div className="upload-fields">
                <div className="upload-video-title">
                    <h1>Upload a video</h1>
                    <span>This video will be uploaded to @{userLogin.username}</span>
                </div>
                <div className="upload-file-field">
                    {videoPath!==undefined?(
                        <div className="uploaded-video" onLoadedData={HandleLoad}>
                            <Player
                                src={videoPath.replace("../front-end/public/","")}
                                fluid = {true}
                                autoPlay={true}
                                >
                                <BigPlayButton position="center"/>
                            </Player> 
                        </div>
                    ):(
                    
                    <form  {...getRootProps({className: 'dropzone '+dropzoneEffect})}>
                    {percent?(
                        <>
                        <CircularProgressbar
                        value={percent}
                        styles={buildStyles({
                            strokeLinecap: "butt"
                        })}
                        strokeWidth={5}
                        />
                            <span onClick={abortUpload} className="abort-upload-button"><img src="https://sf16-scmcdn-sg.ibytedtos.com/goofy/tiktok/web/node/_next/static/images/close-54baafc270c3e8ba4db7a0f5dbc9f9d3.svg"/></span>
                        <p>{video.name}</p>
                        </>
                    ):(
                        <>
                        <img src="/upload-icon.svg" alt =""/>
                    {
                    fileTooLarge?(
                        <div>File Too Large</div>
                    ):(
                    droped?(
                            <div>
                                <ul>
                                    <li>
                                        Name: {video.name}
                                    </li>
                                    <li>
                                        Type : {video.type}
                                    </li>
                                    <li>
                                        Size : {(video.size/1024/1024).toFixed(2)} Mo
                                    </li>
                                </ul>
                            </div>
                        ):( <div>
                                <p>Select a video to upload</p>
                                <span>or drag and drop a file </span>
                                <ul>
                                    <li>MP4 or WebM</li>
                                    <li>720x1280 resolution or higher</li>
                                    <li>Up to 180 seconds</li>
                                </ul>
                                
                            </div>
                        ))
                        }
                      <input {...getInputProps({multiple:false})} onChange={e=>manageVideo(e)}required/>
                        </>
                    )}
                    </form>
                    )}
                </div>
                <form className="upload-elements">
                    <div>
                        <h3>Caption</h3>
                        <input className="title" type="text" placeholder="title" onChange={e=>setTitle(e.target.value)}required/>
                    </div>
                    <div>
                        <h3>Cover</h3>
                        <textarea className="description" placeholder="description" onChange={e=>setDescription(e.target.value)}required></textarea>
                    </div>
                    <div>
                        <h3>who can see this video</h3>
                        <div className="vidCateg" onChange={e=>setVisibility(e.target.value)}>  
                            <div>
                                <h4>Public</h4>
                                <input type="radio" name="visibility" value="Public"required/>
                            </div>
                            <div>
                                <h4>Friends</h4>
                                <input type="radio" name="visibility" value="Friends"required/>
                            </div>
                            <div>
                                <h4>Private</h4>
                                <input type="radio" name="visibility" value="Private"required/> 
                            </div>
                        </div>
                    </div>
                </form>
                <div className="upload-buttons">
                    <Link to="/">
                            <button className="cancel-post">Discard</button>
                    </Link>
                    <button className={conditionToPost?"confirm-post":"disactivated-confirm-post"} onClick={(e)=>uploadVid(e)} >Post</button>
                </div>
            </div>
        </div>
        )
}

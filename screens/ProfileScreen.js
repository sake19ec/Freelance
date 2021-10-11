import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import BigPlayButton from 'video-react/lib/components/BigPlayButton';
import Player from 'video-react/lib/components/Player';
import { updateProfile, userprofile } from '../Actions/UserActions';
import BeforeFooter from '../Components/BeforeFooter';
import LoadingBox from '../Components/LoadingBox'
import Profile from '../Components/Profile';

export default function ProfileScreen() {
    const userLogin = useSelector(state => state.userLogin)
    const {id} = userLogin;
    const userProfile = useSelector(state => state.userProfile)
    const {loading,error,payload} = userProfile;
    if(userProfile.payload===undefined){
        userProfile.payload={userData:[],userVideos:[],userLikedVideos:[],followers:[],following:[],userLikes:[]}
    }
    const {userData,userVideos,userLikedVideos,followers,following,userLikes,amIhisFollower} = userProfile.payload;
    const user_id = window.location.pathname.split("/")[2];
    //states
    const [modifyBio, setModifyBio] = useState(false);
    const [userImg, setUserImg] = useState()
    const [activated, setActivated] = useState(false)
    const [bio, setBio] = useState(userData[0]&&userData[0].bio)
    console.log(userImg,userData);
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(userprofile(user_id,id))
    },[user_id])
    useEffect(()=>{
        if(userData[0]){
            setUserImg(userData[0].picture)
            setBio(userData[0].bio)
        }
    },[userData[0]])
    const HandleLoad = (id) => {
        let elt = document.getElementById(id+"");
        if(elt){
            if(elt.querySelector(".video-react-poster").clientHeight<150){
                elt.style.minWidth="100%";
            }
        }
    }  
    const handleEditImg = ()=>{
        const elt = document.getElementById("modify-img-input");
        elt.click()        
    }
    const setNewImg = (e)=>{
        let newPic = new FormData();
        newPic.append("newPic",e.target.files[0]);
        newPic.append("oldPic",userData[0].picture);
        newPic.append("id",id);
        newPic.append("newBio",bio);
        dispatch(updateProfile(newPic))
    }
    const setNewBio = ()=>{
        setModifyBio(false)
        let newBio = new FormData();
        newBio.append("newBio",bio)
        newBio.append("id",id);
        newBio.append("oldPic",userData[0].picture)
        dispatch(updateProfile(newBio))
    }
    return (
        loading?(
            <LoadingBox/>
            ):(
        <div className="profile-screen">
            <div className="profile-screen-side-menu">                
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
            </div>
            {userData[0]&&(
                
            <div className="profile-screen-elements">
                <div className="profile-info">
                    <div className="personal-profile-info">
                        <img src={userData[0].picture}  alt={userData[0].name}/>
                        
                        {user_id===id&&
                        <i className="fa fa-edit" onClick={handleEditImg}>
                        <form  encType="multipart/form-data">
                            <input type="file" id="modify-img-input" accept=".png , .jpg , .jpeg" name="newPic" onChange={e=>setNewImg(e)}/>
                        </form>
                        </i>
                        }
                        <div className="info">
                            <Profile name={userData[0].name} followed = {amIhisFollower} id={userData[0].id}>
                                <h4>User@{userData[0].id}</h4>
                            </Profile>
                        </div>
                        {user_id!==userLogin.id&&(
                            <div className="personal-info-icon">
                                <div className="three-dots-icon">
                                    <svg width="24" height="24" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4 24C4 21.7909 5.79086 20 8 20C10.2091 20 12 21.7909 12 24C12 26.2091 10.2091 28 8 28C5.79086 28 4 26.2091 4 24ZM20 24C20 21.7909 21.7909 20 24 20C26.2091 20 28 21.7909 28 24C28 26.2091 26.2091 28 24 28C21.7909 28 20 26.2091 20 24ZM36 24C36 21.7909 37.7909 20 40 20C42.2091 20 44 21.7909 44 24C44 26.2091 42.2091 28 40 28C37.7909 28 36 26.2091 36 24Z"></path></svg>
                                </div>
                                    <div className="tooltip personal-profile-info-tooltip">
                                        <div className="personal-message-icon-wrapper">
                                            <div className="personal-profile-info-message-icon"></div>
                                            Send Message
                                        </div>
                                        <div>
                                            <svg width="16" height="16" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9 9.31286V27.0626C9.98685 26.7378 11.184 26.4042 12.5108 26.1585C16.1115 25.4917 21.0181 25.4123 25.1625 28.3726C28.0181 30.4123 31.6115 30.4917 34.7608 29.9085C36.306 29.6223 37.6602 29.1908 38.6289 28.8293C38.7603 28.7803 38.8841 28.7328 39 28.6872V10.9374C38.0131 11.2623 36.816 11.5959 35.4892 11.8416C31.8885 12.5084 26.9819 12.5878 22.8375 9.62751C19.9819 7.58781 16.3885 7.5084 13.2392 8.09161C11.694 8.37776 10.3398 8.80927 9.37105 9.17072C9.23971 9.21973 9.11586 9.2673 9 9.31286ZM40.1067 6.21064C40.7264 5.90123 41.4622 5.93453 42.0515 6.29874C42.6411 6.66315 43 7.30688 43 8.00004V30C43 30.7576 42.572 31.4501 41.8944 31.7889L41 30C41.8944 31.7889 41.8931 31.7895 41.8931 31.7895L41.8916 31.7903L41.8878 31.7922L41.8775 31.7973L41.846 31.8127C41.831 31.82 41.8128 31.8288 41.7915 31.839C41.7761 31.8464 41.7589 31.8545 41.7401 31.8634C41.651 31.9055 41.525 31.9637 41.3654 32.0343C41.0466 32.1753 40.5919 32.3663 40.0273 32.577C38.9023 32.9967 37.319 33.5027 35.4892 33.8416C31.8885 34.5084 26.9819 34.5878 22.8375 31.6275C19.9819 29.5878 16.3885 29.5084 13.2392 30.0916C11.694 30.3778 10.3398 30.8093 9.37105 31.1707C9.23971 31.2197 9.11586 31.2673 9 31.3129V44.0001C9 44.5524 8.55228 45.0001 8 45.0001H6C5.44772 45.0001 5 44.5524 5 44.0001V8.00004C5 7.24249 5.42801 6.54996 6.10558 6.21118L7 8.00004C6.10558 6.21118 6.10688 6.21053 6.10688 6.21053L6.10842 6.20976L6.11219 6.20789L6.12249 6.20279L6.15404 6.18734C6.17988 6.17477 6.21529 6.15773 6.25987 6.13667C6.34902 6.09457 6.47498 6.03636 6.63455 5.9658C6.95342 5.8248 7.4081 5.63378 7.9727 5.42311C9.09774 5.00332 10.681 4.49734 12.5108 4.15849C16.1115 3.49171 21.0181 3.4123 25.1625 6.37257C28.0181 8.41227 31.6115 8.49167 34.7608 7.90846C36.306 7.62231 37.6602 7.1908 38.6289 6.82935C39.1112 6.6494 39.4925 6.48886 39.7478 6.37595C39.8754 6.31956 39.9711 6.27523 40.0318 6.24653C40.0622 6.23219 40.0838 6.22177 40.0962 6.21572L40.1056 6.21118L40.1067 6.21064Z"></path></svg>
                                            Report
                                        </div>
                                    </div>
                            </div>

                        )}
                    </div>
                    <div className="followers">
                        <p><span>{following[0] &&following[0].following}</span> Following</p>
                        <p><span>{followers[0] &&followers[0].followers}</span> Followers</p>
                        <p><span>{userLikes[0] &&userLikes[0].total_likes}</span> Likes</p>
                    </div>
                    {modifyBio?
                    user_id===id&&(<div className="profile-bio"><textarea onChange={e=>setBio(e.target.value)} value={bio}></textarea><i className="fa fa-check" onClick={setNewBio}></i></div>)
                    :(<div className="profile-bio">{bio||"no bio yet"}{user_id===id&&<i className="fa fa-edit" onClick={()=>setModifyBio(true)}></i>}</div>)
                    }
                </div>
                <div className="profile-videos">
                    <div className="profile-videos-header">
                        <div className={`profile-videos-title ${activated?"disactivated":"activated"}`} onClick={()=>setActivated(false)}>Video</div>
                        <div className={`profile-liked-videos-title ${activated?"activated":"disactivated"}`} onClick={()=>setActivated(true)}><i className="fa fa-lock"></i> Liked </div>    
                        <div className="profile-video-bar">
                            <div className={`${activated?"under-likes":""}`}></div>
                        </div>
                    </div>
                    <div className="profile-all-videos" >
                        {activated?(
                            //show the likes videos
                            userLikedVideos===undefined||userLikedVideos.length===0?(
                                <div className="no-liked-videos">
                                    {userLogin.id === user_id?(
                                        <>
                                            <i><svg width="120" height="120" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M24.0003 7C20.1343 7 17.0003 10.134 17.0003 14C17.0003 17.866 20.1343 21 24.0003 21C27.8663 21 31.0003 17.866 31.0003 14C31.0003 10.134 27.8663 7 24.0003 7ZM13.0003 14C13.0003 7.92487 17.9252 3 24.0003 3C30.0755 3 35.0003 7.92487 35.0003 14C35.0003 20.0751 30.0755 25 24.0003 25C17.9252 25 13.0003 20.0751 13.0003 14ZM24.0003 33C18.0615 33 13.0493 36.9841 11.4972 42.4262C11.3457 42.9573 10.8217 43.3088 10.2804 43.1989L8.32038 42.8011C7.77914 42.6912 7.4266 42.1618 7.5683 41.628C9.49821 34.358 16.1215 29 24.0003 29C31.8792 29 38.5025 34.358 40.4324 41.628C40.5741 42.1618 40.2215 42.6912 39.6803 42.8011L37.7203 43.1989C37.179 43.3088 36.6549 42.9573 36.5035 42.4262C34.9514 36.9841 29.9391 33 24.0003 33Z"></path></svg></i>
                                            <p>No liked videos yet</p>
                                            <p>Videos you liked will appear here</p>
                                        </>
                                    ):(
                                        <>
                                            <i className="fa fa-lock"></i>
                                            <p>This user's liked videos are private</p>
                                            <p>Videos liked by {userData[0].name} are currently hidden</p>
                                        </>
                                    )}
                                </div>
                            ):(
                                userLikedVideos.map(item=>(
                                    <div  id={item.id}  onLoadedData={()=>HandleLoad(item.id)} >
                                        <Player      
                                        poster={item.video_link}
                                        src={item.video_link.replace("../front-end/public","")}
                                        fluid = {true}
                                        >
                                        <BigPlayButton position="center"/>
            
                                        <br></br>
                                        </Player>      
                                    </div>
            
                                ))
                            )
                            
                        ):(
                        userVideos.map(item=>(
                        <div  id={item.id} onLoadedData={()=>HandleLoad(item.id)}>
                            <Player      
                            poster={item.video_link}
                            src={item.video_link.replace("../front-end/public","")}
                            fluid = {true}
                            >
                            <BigPlayButton position="center"/>
                            <br></br>
                            </Player>      
                        </div>

                        )))
                        }
                    </div>
                </div>
            </div>
            )}
        </div>
            )
    )
}

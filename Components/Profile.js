import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { userFollow, userUnFollow } from '../Actions/UserActions';

export default function Profile(props) {
    const userLogin = useSelector(state => state.userLogin)
    const userFollowing = useSelector(state => state.userFollowing)
    const {name,id,followed} = props||{};
    if(userFollowing.payload.following===undefined){
        userFollowing.payload = {following:followed}
    }
    const dispatch = useDispatch()
    const follow = ()=>{
        if(userLogin.id){
            if(!userFollowing.payload.following){
                dispatch(userFollow(id,userLogin.id))
            }else{
                dispatch(userUnFollow(id,userLogin.id))
            }
        }
    }
    return (
        <div className="profile">
            <Link to={`/profile/${id}`}>
                <h5 className="name">{name}</h5>
            </Link>
            {props.children}
            {((userLogin.id)&&(id!==userLogin.id))&&<h5 onClick={follow} className={userFollowing.payload.following?"following":"follow"}>{userFollowing.payload.following?"following":"follow"}</h5>}
        </div>
    )
}

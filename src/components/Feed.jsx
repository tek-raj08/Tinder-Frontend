import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { addFeed } from '../utils/feedSlice';
import {useDispatch, useSelector} from "react-redux";
import UserCard from './UserCard';
import axios from "axios"

const Feed = () => {
  const feed = useSelector((store) => store.feed)
  // console.log(feed)
  const dispatch = useDispatch();

  const getFeed = async() => {
    if(feed) return
    try{
      const res = await axios.get(`${BASE_URL}/feed`, {withCredentials: true})
      dispatch(addFeed(res.data))

    }catch(err){
      console.error(err)
    }
  }

  useEffect(() => {
    getFeed()
  }, [])


  return (
    feed && <div className='flex justify-center my-10'>
      <UserCard user={feed.users[0]}/>
    </div>
  )
}

export default Feed

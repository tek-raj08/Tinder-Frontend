import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  // console.log(feed)
  const dispatch = useDispatch();

  const getFeed = async () => {
    
    try {
      const res = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
      // console.log("f feed: ", res.data)
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  

  if(!feed || !feed.users || feed.users.length === 0) return <h1 className="flex justify-center items-center mt-5 font-bold text-2xl h-screen">No feed found.</h1>

  return (
    
      <div className="flex justify-center my-10">
        <UserCard user={feed.users[0]} />
      </div>

    
  );
};

export default Feed;

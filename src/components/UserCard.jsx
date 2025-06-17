import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, about, age, gender, _id } = user;
  // console.log( "f userCard: ",typeof(_id))
  const dispatch = useDispatch();

  const handleSendRequest = async (status, id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(id));
    } catch (err) {
      console.error(err);
    }

    
  };
  if (!user)
    return (
      <h1 className="font-bold text-2xl flex justify-center items-center">
        No new users found.
      </h1>
    );

  return (
    <div className="card bg-base-300 w-86 shadow-sm">
      {photoUrl && (
        <figure>
          <img src={photoUrl} alt="My photo" />
        </figure>
      )}
      <div className="card-body">
        {firstName && lastName && (
          <h2 className="card-title">
            {firstName} {lastName}
          </h2>
        )}
        {gender && <p>Gender: {gender}</p>}
        {age && <p>Age: {age}</p>}
        {about && <p>About: {about}</p>}
        <div className="card-actions justify-end mt-3">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

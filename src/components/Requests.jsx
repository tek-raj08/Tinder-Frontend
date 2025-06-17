import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.request);
  const dispatch = useDispatch();

  const handleRequest = async(status, id) => {
    try{
        const res = await axios.post(`${BASE_URL}/request/review/${status}/${id}`, {}, {withCredentials: true}) 
        dispatch(removeRequest(id))

    }catch(err){
        console.error(err)
    }
  }

  const fetchRequest = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests`, {
        withCredentials: true,
      });
    //   console.log(res?.data?.connectionRequest);
      dispatch(addRequest(res?.data?.connectionRequest));
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
      fetchRequest();
    }, []);
    
      if (!requests)
        return (
          <h1 className="flex justify-center mt-7 font-bold text-2xl">
            No Request Found.
          </h1>
        );

        if (requests.length === 0)
        return (
          <h1 className="flex justify-center mt-7 font-bold text-2xl">
            No Request Found.
          </h1>
        );


  return (
    <div className="flex flex-col justify-center items-center my-10">
      <h1 className="font-bold text-2xl">Requests</h1>

      {requests.map((request) => {
        const { firstName, lastName, age, gender, photoUrl, about } =
          request.fromUserId;

        return (
          <div
            key={request._id}
            className="mt-6 bg-gray-500 rounded overflow-hidden"
          >
            {photoUrl && (
              <img
                src={photoUrl}
                alt={firstName}
                className="w-80 h-64 object-cover"
              />
            )}
            {firstName && lastName && (
              <h2 className="ps-1">{firstName + " " + lastName}</h2>
            )}
            {age && <p className="ps-1">Age: {age}</p>}
            {gender && <p className="ps-1">Gender: {gender}</p>}
            {about && <p className="ps-1">{about}</p>}

            <div className="flex float-end gap-1.5 py-3 pe-1">
            <button className="btn btn-primary" onClick={() => handleRequest("rejected", request._id)}>Reject</button>
            <button className="btn btn-secondary" onClick={() => handleRequest("accepted", request._id)}>Accept</button>
          </div>
          </div>

          
        );
      })}
    </div>
  );
};

export default Requests;

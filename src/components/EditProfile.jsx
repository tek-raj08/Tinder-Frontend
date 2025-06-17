import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const genderLists = ["Male", "Female", "Others"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${BASE_URL}/profile/edit`,
        { firstName, lastName, age, gender, about, photoUrl },
        { withCredentials: true }
      );

      // console.log("Post res", res?.data?.saveUser);

      dispatch(addUser(res?.data?.saveUser));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      console.error(err.message);
      alert(err.message || "Something went wrong.");
    }
  };

  return (
    <div>
      <div className="flex justify-center gap-10 mt-10">
        <div className="flex justify-center items-center">
          <div className="card w-96 bg-base-300 card-lg shadow-lg">
            <div className="card-body">
              <h2 className="card-title justify-center text-3xl my-5">
                Edit Profile
              </h2>
              <form className="w-full" onSubmit={handleSubmit}>
                <legend className="fieldset-legend ">First Name: </legend>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  className="input focus:outline-none border border-gray-200"
                  placeholder="Enter First Name"
                />
                <legend className="fieldset-legend ">Last Name: </legend>
                <div className="flex justify-between items-center border border-gray-200 rounded">
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"
                    className="input outline-none border-none focus:outline-none"
                    placeholder="Enter Last Name"
                  />
                </div>
                <legend className="fieldset-legend ">Age: </legend>
                <div className="flex justify-between items-center border border-gray-200 rounded">
                  <input
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    type="number"
                    className="input outline-none border-none focus:outline-none"
                    placeholder="Enter Age"
                  />
                </div>
                <legend className="fieldset-legend ">Gender: </legend>
                <div className="flex justify-between items-center border border-gray-200 rounded">
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="input outline-none border-none focus:outline-none"
                  >
                    <option value="">Select Gender</option>
                    {genderLists.map((gender, index) => (
                      <option key={index} value={gender}>{gender}</option>
                    ))}
                  </select>
                </div>
                <legend className="fieldset-legend ">About: </legend>
                <div className="flex justify-between items-center border border-gray-200 rounded">
                  <textarea
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    type="text"
                    className="input outline-none border-none focus:outline-none h-20 whitespace-pre-wrap overflow-x-hidden resize-y"
                    placeholder="About"
                    rows={14}
                  ></textarea>
                </div>

                <legend className="fieldset-legend ">Photo URL: </legend>
                <div className="flex justify-between items-center border border-gray-200 rounded">
                  <input
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    type="text"
                    className="input outline-none border-none focus:outline-none"
                    placeholder="Enter Photo URL"
                  />
                </div>

                <div className="justify-end card-actions mt-3.5">
                  <button className="btn btn-primary">Edit Profile</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div>
          <UserCard
            user={{ firstName, lastName, age, gender, about, photoUrl }}
          />
        </div>
      </div>

       {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile Update successfull 😊</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;

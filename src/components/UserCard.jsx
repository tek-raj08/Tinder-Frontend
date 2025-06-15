import React from "react";

const UserCard = ({user}) => {
    
    const {firstName, lastName, photoUrl, about, age, gender} = user
  return (
    <div className="card bg-base-300 w-86 shadow-sm">
      <figure>
        <img
          src={photoUrl}
          alt="My photo"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName} {lastName}</h2>
        {user.gender && <p>
          Gender: {gender}
        </p>}
        {user.age && <p>
          Age: {age}
        </p>}
        {user.about && <p>
          About: {about}
        </p>}
        <div className="card-actions justify-center mt-3">
            <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

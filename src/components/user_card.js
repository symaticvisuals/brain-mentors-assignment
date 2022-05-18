import React from 'react'

function UserCard({name, designation, image}) {
    const imageUsed = new Image(image);
  return (
    <div className="bg-slate-300 rounded-lg shadow-sm shadow-slate-400 h-full p-4">
      <img
        src={imageUsed}
        alt="user"
        className="w-full h-64 object-cover rounded-t-lg"
      />
      <h1 className="font-sans font-semibold text-xl">{name}</h1>
      <h2 className="font-sans">{designation}</h2>
    </div>
  );
}

export default UserCard
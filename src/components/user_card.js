import React from 'react'

function UserCard({name, designation, image}) {
    
  return (
    <div className="bg-slate-300 rounded-lg shadow-sm shadow-slate-400 h-full">
      <img
        src={image}
        alt="user"
        className="w-full h-[30vh] object-cover rounded-t-lg"
      />
      <div className='p-4'>
        <h1 className="font-sans font-semibold text-xl">{name}</h1>
        <h2 className="font-sans">{designation}</h2>
      </div>
    </div>
  );
}

export default UserCard
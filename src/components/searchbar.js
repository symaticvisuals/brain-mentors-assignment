import React, { useContext } from 'react'
import {BsSearch} from 'react-icons/bs'
import { UserContext } from '../pages/main_layout';
function SearchBar() {
    const {users,  setFilteredData} = useContext(UserContext);

    //search function for the application that returns the filtered data
    const search = (e) => {
        setFilteredData(users.filter(user => user.name.toLowerCase().includes(e.target.value.toLowerCase())));
    }
    
  return (
    <div className=" flex mt-10 items-center gap-5 border-2 rounded-md border-black px-4 py-2">
      <BsSearch />
      <input
        type={`text`}
        placeholder={`Search`}
        className="bg-transparent outline-none flex-1"
        onKeyUp={search}
      />
    </div>
  );
}

export default SearchBar
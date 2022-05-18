import React from "react";

import { useNavigate } from "react-router-dom";
import SearchBar from "../components/searchbar";
import UsersPage from "./users_page";

//creating a context to share the data between the components
// @ts-ignore
const UserContext = React.createContext();

function MainLayout() {
  const [users, setUsers] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState(users ? users : []);
  let navigate = useNavigate();
  return (
    <UserContext.Provider
      value={{ users, setUsers, filteredData, setFilteredData }}>
      <div className="m-auto max-w-screen-xl bg-slate-200 h-screen">
        {/* TopBar */}
        <div className="flex items-center justify-between pt-10">
          <div className="">
            <h1 className="text-5xl font-sans font-semibold">Users</h1>
            <h4>{`${filteredData.length} USERS`}</h4>
          </div>
          <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={
                () => { 
                   navigate("./users", { replace: false });
                }
            }>
              Add User
            </button>
          </div>
        </div>
        {/* SearchBar */}
        <SearchBar />
        {/* Users */}
        <UsersPage />
      </div>
    </UserContext.Provider>
  );
}

export {MainLayout, UserContext};

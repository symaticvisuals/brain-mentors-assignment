import React from "react";
import { db } from "../firebase/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import UserCard from "../components/user_card";
import { CgSpinner } from "react-icons/cg";
import { UserContext } from "./main_layout";
function UsersPage() {

  const usersCollectionRef = collection(db, "users");
  
  //state management for the users
  const { setUsers, filteredData, setFilteredData } = React.useContext(UserContext);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
     
      setLoading(false);
      const users = data.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setUsers(users);
      setFilteredData(users);
      
    };
    getUsers();
    //call the function to get the users every 10 seconds
    const interval = setInterval(() => getUsers(), 10000);
    return () => {
      //clear interval when the component is unmounted
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid grid-cols-4 sm:grid-cols-1 md:grid-cols-2  lg:grid-cols-3 items-center mt-10 gap-4 ">
      {/* Show Users  */}
      {filteredData?.map((user, key) => (
        <div key={key}>
          <UserCard {...user} />
        </div>
      ))}

      {/* No Users Found */}
      {filteredData?.length === 0 && !loading && (
        <div className="flex items-center justify-center">
          <h1 className="text-5xl font-sans font-semibold">No Users Found</h1>
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="animate-spin flex items-center justify-center w-full mt-20">
          <CgSpinner fontSize={30} />
        </div>
      ) : null}
    </div>
  );
}

export default UsersPage;

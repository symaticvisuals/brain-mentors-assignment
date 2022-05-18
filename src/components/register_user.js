import { addDoc, collection } from "firebase/firestore";
import React from "react";
import ImageUploading from "react-images-uploading";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase-config";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
function RegisterUser() {

  
  //state to store the new user object
  const [user, setUser] = React.useState({
    name: "",
    designation: "",
  });
  const usersCollectionRef = collection(db, "users");
  const input_style =
    "bg-transparent px-4 py-3 border-2 border-black rounded-lg focus:bg-white";
  //store image object
  const [image] = React.useState([]);
  const [imageUrl, setImageUrl] = React.useState("");
  const navigate = useNavigate();

  //store images in firebase storage
  const storeImage = async (image) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage();
      const fileName = image[0].file.name;
      const storageRef = ref(storage, "uploads/" + fileName);
      const uploadTask = uploadBytesResumable(storageRef, image[0].file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          // eslint-disable-next-line
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUrl(downloadURL);
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const createUser = async () => {
    //creating new user object
    if (user.name !== "" && user.designation !== "" && imageUrl !== "") {
      addDoc(usersCollectionRef, {
        name: user.name,
        designation: user.designation,
        image: imageUrl,
      });
      navigate("/", { replace: true });
    } else {
      alert("Please fill all the fields");
    }
  };

  //a function to store the image object on change
  const onFileChange = async (imageList) => {
    storeImage(imageList);
  };

  return (
    <div className="flex flex-col gap-4 max-w-screen-xl m-auto">
      <h1 className="font-sans text-4xl mt-10 font-semibold">Add User</h1>

      <input
        type="text"
        placeholder="Name"
        className={input_style}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Designation"
          className={input_style + " flex-1"}
          onChange={(e) => setUser({ ...user, designation: e.target.value })}
        />
        <ImageUploading
          value={image}
          onChange={onFileChange}
          maxNumber={1}
          dataURLKey="data_url">
          {({ onImageUpload, dragProps }) => (
            // write your building UI
            <div className="upload__image-wrapper">
              <button
                onClick={onImageUpload}
                {...dragProps}
                className=" border-black border-2 text-black font-bold py-3 px-4 rounded-lg hover:bg-white">
                Upload Image
              </button>
            </div>
          )}
        </ImageUploading>
      </div>

      <button
        onClick={createUser}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded">
        Register User
      </button>
    </div>
  );
}

export default RegisterUser;

import { addDoc, collection } from "firebase/firestore";
import React, { useEffect } from "react";
import ImageUploading from "react-images-uploading";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase-config";
import { storage } from "../firebase/firebase-config";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
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
  const [image, setImage] = React.useState([]);
  const [imageList, setImageList] = React.useState([]);
  const [imageURL, setImageURL] = React.useState(null);
  const imageListRef = ref(storage, "upload/");
  const uploadImage = async () => {
    if (image === null) return;
    const uploadTask = ref(storage, `upload/${image[0].file.name}`);
    uploadBytes(uploadTask, image[0]).then((snapshot) => {
      alert("Image Uploaded Successfully");
      getDownloadURL(snapshot.ref).then((url) => {
         if (user.name !== "" && user.designation !== "") {
      console.log("URL:" + url);
      addDoc(usersCollectionRef, {
        name: user.name,
        designation: user.designation,
        image: url,
      });
      navigate("/", { replace: true });
    }
      }
      );
    });
    
  };

  useEffect(() => {
    listAll(imageListRef)
      .then((res) => {
        console.log(res);
        setImageList(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const createUser = async () => {
    uploadImage();
   
  };
  //a function to store the image object on change
  const onFileChange = (imageList) => {
    setImage(imageList);
  };

  const navigate = useNavigate();

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
        onClick={uploadImage}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded">
        Register User
      </button>
    </div>
  );
}

export default RegisterUser;

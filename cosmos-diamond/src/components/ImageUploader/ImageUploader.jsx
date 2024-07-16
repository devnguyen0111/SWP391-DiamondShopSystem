import React, { useState } from "react";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { initializeApp } from "firebase/app";
import { app } from "./../../config/firebase";
import { Progress } from "antd";

// Initialize Firebase
const storage = getStorage(app);

const ImageUploader = ({imageURL, setImageURL}) => {
  
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadImageAndGetURL = async (file) => {
    if (!file) {
      console.error("No file selected.");
      return;
    }

    const storageRef = ref(storage, "/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error("Error uploading file:", error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setImageURL(downloadURL);
        console.log("Download URL:", downloadURL);
        setUploadProgress(0)
      }
    );
  };
  
  const handleDrop = async (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      await uploadImageAndGetURL(file);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    await uploadImageAndGetURL(file);
  };

  return (
    <div>
      <div
        id="dropZone"
        style={{
          width: "200px",
          height: "200px",
          border: "2px dashed #ccc",
          borderRadius: "5px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          textAlign: "center",
          color: "#ccc",
          cursor: 'pointer'
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => document.getElementById("fileInput").click()}
      >
        {imageURL ? (
          <img
            id="image"
            alt="Firebase Image"
            src={imageURL}
            style={{ width: "100%", height:'100%', objectFit:'cover'}}
          />
        ) : (
          <span>Drag & Drop your image here or click to select</span>
        )}
      </div>
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      {uploadProgress > 0 && <Progress percent={uploadProgress}/>}
    </div>
  );
};

export default ImageUploader;

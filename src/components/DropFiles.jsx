import React, { useRef, useState } from "react";
import styled from "styled-components";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

export default function DropFiles({uploadedFiles, setUploadedFiles}) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragActive(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload([...files]);
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    handleFileUpload([...files]);
  };

  const chooseFilesHandler = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = (files) => {
    const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "image/heic", "image/heif"];
    const validatedFiles = files.filter((file) =>
      allowedTypes.includes(file.type)
    );

    if (validatedFiles.length !== files.length) {
      setError("Only .png, .jpg, .jpeg, .heic and .heif files are allowed.");
      return;
    }
    setUploadedFiles(validatedFiles)
  };
  return (
    <StyledDropFiles>
      <div className="upload-files">
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`upload-box ${dragActive ? "drag-active" : ""}`}
        >
          <CloudUploadOutlinedIcon htmlColor="gray" fontSize="large" />
          <h5>Drop your file here to upload</h5>
          <p>Works with .JPG, .PNG, .JPEG, .HEIC and .HEIF</p>
          {uploadedFiles.length > 0 && (
            <div className="uploaded-files">
              {uploadedFiles.map((file, index) => (
                <p key={index} className="uploaded-file">
                  Uploaded File: {file.name}
                </p>
              ))}
            </div>
          )}
          <p className="error">{error}</p>
          <input
            type="file"
            id="file-upload"
            onChange={handleFileChange}
            ref={fileInputRef}
            accept=".png, .jpg, .jpeg, .heic, .heif"
            multiple={false}
          />
          <button onClick={chooseFilesHandler}>Choose File</button>
        </div>
      </div>
    </StyledDropFiles>
  );
}

const StyledDropFiles = styled.section`
  .upload-files {
    display: flex;
    justify-content: center;
    margin-bottom: 5%;

    .error {
      color: red;
      text-align: center;
    }

    .upload-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: minmax(95%, 400px);
      min-height: 260px;
      border: 2px dashed var(--secondary-color);
      padding: 16px;
      border-radius: 10px;
      text-align: center;
      background-color: #fcfcfc;
      transition: background-color 0.2s ease-in-out;
      transition: border 0.2s ease-in-out;
      p {
        margin: 8px 0;
        font-size: 14px;
      }
      .uploaded-file {
        color: green;
      }
    }

    .drag-active {
      background-color: #e5f2fe;
      border-color: var(--secondary-dark-color);
    }
    .uploaded-files {
      margin-top: 10px;
    }
    input[type="file"] {
      display: none;
    }
  }
`;

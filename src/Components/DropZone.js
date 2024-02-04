import React, { useState, useEffect, useRef } from "react";

const DropZone = ({ uploadedFilesHandler }) => {
  const fileInputRef = useRef();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [validFiles, setValidFiles] = useState([]);
  const [style, setStyle] = useState({});

  const dragOver = (e) => {
    e.preventDefault();
    setStyle({
      border: "2px  solid  #0279CC",
      borderStyle: "dashed",
    });
  };

  const dragEnter = (e) => {
    e.preventDefault();
  };

  const dragLeave = (e) => {
    e.preventDefault();
    setStyle({
      border: "none",
    });
  };

  const validateFile = (file) => {
    if (
      file.type.indexOf("ms-excel.sheet") > -1 ||
      file.name.indexOf(".xlsx") > -1 ||
      file.name.indexOf(".xlsm") > -1
    ) {
      return true;
    }
    return false;
  };

  const handleFiles = (files) => {
    if (validateFile(files)) {
      setSelectedFiles([files]);
    } else {
      files["invalid"] = true;
    }
  };

  const fileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFiles(files[0]);
    }
    setStyle({
      border: "none",
    });
  };

  const removeFile = (name) => {
    const validFileIndex = validFiles.findIndex((e) => e.name === name);
    validFiles.splice(validFileIndex, 1);
    setValidFiles([...validFiles]);
    const selectedFileIndex = selectedFiles.findIndex((e) => e.name === name);
    selectedFiles.splice(selectedFileIndex, 1);
    setSelectedFiles([...selectedFiles]);
  };

  const uploadFiles = (files) => {
    let fileToSend = [];
    for (let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
        fileToSend.push(files[i]);
      }
    }
    // uploadedFilesHandler(fileToSend);
  };

  const fileInputClicked = () => {
    fileInputRef.current.click();
  };

  const filesSelected = () => {
    if (fileInputRef.current.files.length) {
      handleFiles(fileInputRef.current.files[0]);
    }
  };

  useEffect(() => {
    let filteredArray = selectedFiles.reduce((file, current) => {
      const x = file.find((item) => item.name === current.name);
      if (!x) {
        return file.concat([current]);
      } else {
        return file;
      }
    }, []);
    setValidFiles([...filteredArray]);
    uploadFiles([...filteredArray]);
  }, [selectedFiles]);

  return (
    <div className="dropzoneContainer bg-white w-3/5 flex flex-col p-3 rounded-lg">
      <div
        className="drop-container h-36 border-dotted border-2 border-gray-300 flex flex-col justify-center"
        onDragOver={dragOver}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        onDrop={fileDrop}
        style={style}
      >
        <h6 className="text-center">
          Drop your excel sheet here or
          <span
            className="font-medium text-blue-500 cursor-pointer"
            onClick={fileInputClicked}
          > browse</span>
        </h6>
        <input
          ref={fileInputRef}
          className="file-input"
          type="file"
          onChange={filesSelected}
          style={{ display: "none" }}
        />
      </div>
      <button
        onClick={fileInputClicked}
        className={`mt-2 bg-customBlue rounded-lg w-full py-2 text-white font-medium `}
        disabled={false}
      >
        Upload
      </button>
    </div>
  );
};
export default DropZone;

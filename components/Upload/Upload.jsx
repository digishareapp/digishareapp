import React, { useState, useEffect, useCallback } from "react";
import { FaRegEdit } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import axios from "axios";

//INTERNAL IMPORT
import { shortenAddress } from "../../utils/utils";

const Upload = ({
  CREATE_FILE,
  setLoader,
  notifySuccess,
  notifyError,
  setOpenComponent,
}) => {
  const [fileURL, setFileURL] = useState("");
  const [userDetails, setUserDetails] = useState();
  const [file, setFile] = useState({
    _fileName: "",
    _description: "",
    _category: "",
    _isPublic: "",
  });

  useEffect(() => {
    const userLoginData = JSON.parse(localStorage.getItem("currentUser"));
    setUserDetails(userLoginData);
  }, []);

  const handleFormFieldChange = (fileName, e) => {
    setFile({ ...file, [fileName]: e.target.value });
  };

  const uploadToInfura = async (file) => {
    if (file) {
      try {
        notifySuccess("Wait uploading...");
        setLoader(true);
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          maxBodyLength: "Infinity",
          headers: {
            pinata_api_key: `1ecaf484dc922f17f0d3`,
            pinata_secret_api_key: `
            af3e6b440fea0a9c8a9a2bbf4847e8873d97ddc4823b5535c1731e854e3e73b1`,
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

        console.log(ImgHash);

        setFileURL(ImgHash);
        notifySuccess("Image Uploade Successfully");
        setLoader(false);
      } catch (error) {
        console.log("Unable to upload image to Pinata", error);
        notifyError("nable to upload image to Pinata, Check API Keys");
        setLoader(false);
      }
    }
  };

  const onDrop = useCallback(async (acceptedFile) => {
    await uploadToInfura(acceptedFile[0]);
  }, []);

  const {
    getInputProps,
    getRootProps,
    isDragAccept,
    isDragActive,
    isDragReject,
  } = useDropzone({ onDrop, maxSize: 500000000000 });

  const CALLING_CREATE = async (file, userDetails, fileURL) => {
    await CREATE_FILE(file, userDetails, fileURL);
  };
  return (
    <div class="content-page">
      <div class="container-fluid">
        <div class="row">
          <div class="col-xl-3 col-lg-4">
            <div class="card">
              <div class="card-header d-flex justify-content-between">
                <div class="header-title">
                  <h4 class="card-title">Upload File</h4>
                </div>
              </div>
              <div class="card-body">
                <form>
                  <div class="form-group text-center">
                    <div class="d-flex justify-content-center">
                      <div class="crm-profile-img-edit position-relative">
                        <img
                          class="crm-profile-pic rounded-circle avatar-100"
                          src="upload.jpg"
                          alt="profile-pic"
                        />
                        <div class="crm-p-image bg-primary" {...getRootProps()}>
                          <i class="  ">
                            <FaRegEdit />
                          </i>
                          <input
                            {...getInputProps()}
                            class="file-upload"
                            type="file"
                            accept="image/*"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label>Category:</label>
                    <select
                      onChange={(e) => handleFormFieldChange("_category", e)}
                      class="form-control"
                      id="selectuserrole"
                    >
                      <option>Select</option>
                      <option>Image</option>
                      <option>Audio</option>
                      <option>Video</option>
                      <option>PDF</option>
                    </select>
                  </div>
                  {/* <div class="form-group">
                    <label for="furl">Notic</label>
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Alias consequatur inventore laudantium exercitationem
                      tempore amet error itaque!
                    </p>
                  </div> */}
                </form>
              </div>
            </div>
          </div>
          <div class="col-xl-9 col-lg-8">
            <div class="card">
              <div class="card-header d-flex justify-content-between">
                <div class="header-title">
                  <h4 class="card-title">Update All Details</h4>
                </div>
              </div>
              <div class="card-body">
                <div class="new-user-info">
                  {/* //VIDEO */}

                  {file._category == "Video" ? (
                    <video
                      className="video-width-new"
                      controls
                      src={fileURL}
                    ></video>
                  ) : file._category == "Image" ? (
                    <div className="image-width-new">
                      <img
                        className="image-width-new-img"
                        src={fileURL}
                        alt=""
                      />
                    </div>
                  ) : file._category == "Audio" ? (
                    <audio controls className="image-width-new">
                      <source src={fileURL} type="audio/ogg" />
                      <source src={fileURL} type="audio/mpeg" />
                      Your browser dose not support the audio tag
                    </audio>
                  ) : file._category == "PDF" ? (
                    <object className="pdf-file" data={fileURL}></object>
                  ) : (
                    ""
                  )}

                  <div>
                    <div class="row">
                      <div class="form-group col-md-6">
                        <label for="Creator">Creator</label>
                        <input
                          type="text"
                          class="form-control"
                          id="Creator"
                          disabled
                          placeholder={userDetails?.username}
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="lname">Address</label>
                        <input
                          type="text"
                          class="form-control"
                          id="lname"
                          placeholder={shortenAddress(userDetails?.address)}
                        />
                      </div>
                      <div class="form-group col-md-12">
                        <label for="cname">Title</label>
                        <input
                          onChange={(e) =>
                            handleFormFieldChange("_fileName", e)
                          }
                          type="text"
                          class="form-control"
                          id="cname"
                          placeholder="File title"
                        />
                      </div>
                      <div class="form-group col-md-12">
                        <label for="cname">Description</label>
                        <textarea
                          onChange={(e) =>
                            handleFormFieldChange("_description", e)
                          }
                          class="form-control"
                          name=""
                          rows="3"
                        ></textarea>
                      </div>
                      <div class="form-group col-sm-12">
                        <label>Visibility</label>
                        <select
                          onChange={(e) =>
                            handleFormFieldChange("_isPublic", e)
                          }
                          class="form-control"
                          id="selectcountry"
                        >
                          <option>Select Visibility</option>
                          <option>True</option>
                          <option>False</option>
                        </select>
                      </div>
                    </div>

                    {userDetails?.credit == 0 ? (
                      <button
                        onClick={() => setOpenComponent("Price")}
                        class="btn btn-primary"
                      >
                        Buy Cradit
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          CALLING_CREATE(file, userDetails, fileURL)
                        }
                        class="btn btn-primary"
                      >
                        Add Document
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;

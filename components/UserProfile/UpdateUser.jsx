import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";

const Updateuser = ({
  RESET_PASSWORD,
  notifySuccess,
  notifyError,
  setLoader,
}) => {
  const [upadtePass, setUpadtePass] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [fileURL, setFileURL] = useState("");
  const [resetPassword, setResetPassword] = useState({
    username: "",
    password: "",
    passwordComfirm: "",
  });
  //
  const [form, setForm] = useState({
    role: "",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    firstName: "",
    lastName: "",
    address: "",
    companyName: "",
    country: "",
    mobile: "",
    email: "",
    pinCode: "",
    city: "",
  });

  useEffect(() => {
    loadUserDetails();
  }, []);

  const loadUserDetails = async () => {
    try {
      const userProfile = JSON.parse(localStorage.getItem("Profile"));

      const data = await axios.get(userProfile?.ipfs);

      setUserInfo(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  //RESET
  const handleResetField = (fileName, e) => {
    setResetPassword({ ...resetPassword, [fileName]: e.target.value });
  };

  const handleFormFieldChange = (fileName, e) => {
    setForm({ ...form, [fileName]: e.target.value });
  };
  //REPLACE
  const uploadToInfura = async (file) => {
    if (file) {
      setLoader(true);
      notifySuccess("Wait uploading data, don't close window");
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          maxBodyLength: "Infinity",
          headers: {
            pinata_api_key: `d8076ed2db9e5815e976`,
            pinata_secret_api_key: `
            d503db64dac0fde8267be6481224acd6642c2cf478452c0a6d88f92352fde85b`,
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
        console.log(response);
        setFileURL(ImgHash);
        setLoader(false);
        notifySuccess("Successfully uploaded file");
      } catch (error) {
        console.log("Unable to upload image to Pinata", error);
        setLoader(false);
        notifyError("Failed to upload, Check your API Key");
      }
    }
  };

  const uploadMetadata = async (form, fileURL) => {
    setLoader(true);
    notifySuccess("Wait uploading data, don't close window");
    const {
      role,
      facebook,
      twitter,
      instagram,
      linkedin,
      firstName,
      lastName,
      address,
      companyName,
      country,
      mobile,
      email,
      pinCode,
      city,
    } = form;

    const data = JSON.stringify({
      role: role,
      facebook: facebook,
      twitter: twitter,
      instagram: instagram,
      linkedin: linkedin,
      firstName: firstName,
      lastName: lastName,
      address: address,
      companyName: companyName,
      country: country,
      mobile: mobile,
      email: email,
      pinCode: pinCode,
      city: city,
      image: fileURL,
    });

    try {
      const response = await axios({
        method: "POST",
        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data: data,
        headers: {
          pinata_api_key: `ff11b33f0cf7fdc8de05`,
          pinata_secret_api_key: `
          6a24a79a5fcae86e19589fd551ae1484eeed8c6f89abe7361870b5fbbf4b6de8`,
          "Content-Type": "application/json",
        },
      });

      const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

      if (url) {
        const userProfile = JSON.parse(localStorage.getItem("currentUser"));
        const profile = {
          email: userProfile.email,
          name: userProfile.name,
          username: userProfile.username,
          address: userProfile.address,
          password: userProfile.password,
          isRegistered: userProfile.isRegistered,
          ipfs: url,
        };
        localStorage.setItem("Profile", JSON.stringify(profile));
        console.log(url);
        setLoader(false);
        notifySuccess("Successfully uploaded file");
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
      notifyError("Failed to upload, Check your API Key");
    }
  };

  const onDrop = useCallback(async (acceptedFile) => {
    await uploadToInfura(acceptedFile[0]);
  }, []);

  const { getInputProps, getRootProps } = useDropzone({
    onDrop,
    maxSize: 500000000000,
  });

  //UPDATE PASSWORD
  const UPDATE_RESET_PASSWORD = async (resetPassword) => {
    if (resetPassword.password == resetPassword.passwordComfirm) {
      await RESET_PASSWORD(resetPassword);
    }
  };
  return (
    <div class="content-page">
      <div class="container-fluid">
        <div class="row">
          <div class="col-xl-3 col-lg-4">
            <div class="card">
              <div class="card-header d-flex justify-content-between">
                <div class="header-title">
                  <h4 class="card-title">Add New User</h4>
                </div>
              </div>
              <div class="card-body">
                <div>
                  <div class="form-group text-center">
                    <div class="d-flex justify-content-center">
                      <div class="crm-profile-img-edit position-relative">
                        {userInfo?.image ? (
                          <img
                            class="crm-profile-pic rounded-circle avatar-100"
                            src={userInfo?.image}
                            alt="profile-pic"
                          />
                        ) : (
                          <img
                            class="crm-profile-pic rounded-circle avatar-100"
                            src={fileURL || "../assets/images/user/11.png"}
                            alt="profile-pic"
                          />
                        )}

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
                    <label>User Role:</label>
                    <select
                      onChange={(e) => handleFormFieldChange("role", e)}
                      class="form-control"
                      id="selectuserrole"
                    >
                      {userInfo?.role ? (
                        <option>{userInfo?.role}</option>
                      ) : (
                        <option>Select</option>
                      )}

                      <option>Web Designer</option>
                      <option>Web Developer</option>
                      <option>Tester</option>
                      <option>Php Developer</option>
                      <option>Ios Developer </option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="furl">Facebook Url:</label>
                    <input
                      onChange={(e) => handleFormFieldChange("facebook", e)}
                      type="text"
                      class="form-control"
                      id="furl"
                      placeholder={
                        userInfo?.facebook
                          ? `${userInfo?.facebook}`
                          : " facebook url"
                      }
                    />
                  </div>
                  <div class="form-group">
                    <label for="turl">Twitter Url:</label>
                    <input
                      onChange={(e) => handleFormFieldChange("twitter", e)}
                      type="text"
                      class="form-control"
                      id="turl"
                      placeholder={
                        userInfo?.twitter
                          ? `${userInfo?.twitter}`
                          : " Twitter Url"
                      }
                    />
                  </div>
                  <div class="form-group">
                    <label for="instaurl">Instagram Url:</label>
                    <input
                      onChange={(e) => handleFormFieldChange("instagram", e)}
                      type="text"
                      class="form-control"
                      id="instaurl"
                      placeholder={
                        userInfo?.instagram
                          ? `${userInfo?.instagram}`
                          : " Instagram Url"
                      }
                    />
                  </div>
                  <div class="form-group">
                    <label for="lurl">Linkedin Url:</label>
                    <input
                      onChange={(e) => handleFormFieldChange("linkedin", e)}
                      type="text"
                      class="form-control"
                      id="lurl"
                      placeholder="Linkedin Url"
                      placeholder={
                        userInfo?.linkedin
                          ? `${userInfo?.linkedin}`
                          : " Linkedin Url"
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-9 col-lg-8">
            <div class="card">
              <div class="card-header d-flex justify-content-between">
                <div class="header-title">
                  <h4 class="card-title">New User Information</h4>
                </div>
              </div>
              <div class="card-body">
                <div class="new-user-info">
                  <div>
                    <div class="row">
                      <div class="form-group col-md-6">
                        <label for="fname">First Name:</label>
                        <input
                          onChange={(e) =>
                            handleFormFieldChange("firstName", e)
                          }
                          type="text"
                          class="form-control"
                          id="fname"
                          placeholder={
                            userInfo?.linkedin
                              ? `${userInfo?.firstName}`
                              : " First Name"
                          }
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="lname">Last Name:</label>
                        <input
                          onChange={(e) => handleFormFieldChange("lastName", e)}
                          type="text"
                          class="form-control"
                          id="lname"
                          placeholder={
                            userInfo?.lastName
                              ? `${userInfo?.lastName}`
                              : " Last Name"
                          }
                        />
                      </div>
                      <div class="form-group col-md-12">
                        <label for="cname">Address:</label>
                        <input
                          onChange={(e) => handleFormFieldChange("address", e)}
                          type="text"
                          class="form-control"
                          id="cname"
                          placeholder={
                            userInfo?.address
                              ? `${userInfo?.address}`
                              : " Address"
                          }
                        />
                      </div>
                      <div class="form-group col-md-12">
                        <label for="cname">Company Name:</label>
                        <input
                          onChange={(e) =>
                            handleFormFieldChange("companyName", e)
                          }
                          type="text"
                          class="form-control"
                          id="cname"
                          placeholder={
                            userInfo?.companyName
                              ? `${userInfo?.companyName}`
                              : " Company Name"
                          }
                        />
                      </div>
                      <div class="form-group col-sm-12">
                        <label>Country:</label>
                        <input
                          onChange={(e) => handleFormFieldChange("country", e)}
                          type="text"
                          class="form-control"
                          id="cname"
                          placeholder={
                            userInfo?.country
                              ? `${userInfo?.country}`
                              : " Country"
                          }
                        />
                      </div>
                      <div class="form-group col-sm-12">
                        <label>Mobile Number:</label>
                        <input
                          onChange={(e) => handleFormFieldChange("mobile", e)}
                          type="text"
                          class="form-control"
                          id="cname"
                          placeholder={
                            userInfo?.mobile
                              ? `${userInfo?.mobile}`
                              : " Mobile Number"
                          }
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="email">Email:</label>
                        <input
                          onChange={(e) => handleFormFieldChange("email", e)}
                          type="email"
                          class="form-control"
                          id="email"
                          placeholder={
                            userInfo?.email ? `${userInfo?.email}` : " Email"
                          }
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="pno">Pin Code:</label>
                        <input
                          onChange={(e) => handleFormFieldChange("pinCode", e)}
                          type="text"
                          class="form-control"
                          id="pno"
                          placeholder={
                            userInfo?.pinCode
                              ? `${userInfo?.pinCode}`
                              : " Pin Code"
                          }
                        />
                      </div>
                      <div class="form-group col-md-12">
                        <label for="city">Town/City:</label>
                        <input
                          onChange={(e) => handleFormFieldChange("city", e)}
                          type="text"
                          class="form-control"
                          id="city"
                          placeholder={
                            userInfo?.city ? `${userInfo?.city}` : " Town/City"
                          }
                        />
                      </div>
                    </div>
                    <hr />
                    <button
                      onClick={() => uploadMetadata(form, fileURL)}
                      class="btn btn-primary"
                    >
                      Update Info
                    </button>
                    <button
                      onClick={() =>
                        upadtePass ? setUpadtePass(false) : setUpadtePass(true)
                      }
                      class="btn btn-primary ml-4"
                    >
                      Password {upadtePass ? "Close" : "Open"}
                    </button>
                    {upadtePass && (
                      <>
                        <hr />
                        <h5 class="mb-3">Security</h5>
                        <div class="row">
                          <div class="form-group col-md-12">
                            <label for="uname">User Name:</label>
                            <input
                              type="text"
                              class="form-control"
                              id="uname"
                              onChange={(e) => handleResetField("username", e)}
                              placeholder="User Name"
                            />
                          </div>
                          <div class="form-group col-md-6">
                            <label for="pass">Password:</label>
                            <input
                              type="password"
                              class="form-control"
                              id="pass"
                              onChange={(e) => handleResetField("password", e)}
                              placeholder="Password"
                            />
                          </div>
                          <div class="form-group col-md-6">
                            <label for="rpass">Repeat Password:</label>
                            <input
                              type="password"
                              class="form-control"
                              id="rpass"
                              onChange={(e) =>
                                handleResetField("passwordComfirm", e)
                              }
                              placeholder="Repeat Password "
                            />
                          </div>
                        </div>

                        <button
                          onClick={() => UPDATE_RESET_PASSWORD(resetPassword)}
                          class="btn btn-primary"
                        >
                          Update Password
                        </button>
                      </>
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

export default Updateuser;

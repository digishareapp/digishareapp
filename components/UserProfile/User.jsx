import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  TiSocialLinkedin,
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialInstagram,
} from "react-icons/ti";
import {
  FaLocationDot,
  FaMobileScreenButton,
  FaMapLocation,
  FaMagnifyingGlassLocation,
} from "react-icons/fa6";
import { FaFileAlt } from "react-icons/fa";

import { MdOutlineAlternateEmail } from "react-icons/md";
import { RiShoppingCart2Fill } from "react-icons/ri";

//INTERNAL IMPORT
import { shortenAddress } from "../../utils/utils";

const User = ({
  currentUser,
  getAllPublicFiles,
  setOpenComponent,
  getAllUserFiles,
}) => {
  const [userInfo, setUserInfo] = useState();

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

  const Image = [];
  const Audio = [];
  const Video = [];
  const PDF = [];

  if (getAllPublicFiles?.length) {
    getAllPublicFiles?.map((el) => {
      if (el.category == "Image") {
        Image.push(el);
      } else if (el.category == "Audio") {
        Audio.push(el);
      } else if (el.category == "PDF") {
        PDF.push(el);
      } else {
        Video.push(el);
      }
    });
  }
  return (
    <div class="content-page">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-12">
            <div class="card car-transparent">
              <div class="card-body p-0">
                <div class="profile-image position-relative">
                  <img
                    src="cloudbox.png"
                    class="img-fluid rounded w-100"
                    alt=""
                  />
                </div>
                <div class="profile-overly">
                  <h4>
                    {userInfo?.firstName || "Update"} {userInfo?.lastName}
                  </h4>
                  <span>{shortenAddress(currentUser?.address)}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6">
            <div class="card card-block card-stretch card-height">
              <div class="card-body">
                <h4 class="mb-3">Hey, {currentUser?.username}</h4>
                <p class="mb-0">
                  By Using our web3 dapp, your aggreing with the terms and
                  contidions of our policy.
                </p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6">
            <div class="card card-block card-stretch card-height">
              <div class="card-body text-center">
                <svg
                  width="36"
                  height="48"
                  viewBox="0 0 36 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.10495 33.9964C8.29026 33.1817 8.71495 33.4114 6.74995 32.8855C5.85838 32.6464 5.07463 32.1871 4.36588 31.6367L0.112441 42.0655C-0.299122 43.0752 0.469629 44.1721 1.559 44.1308L6.4987 43.9424L9.8962 47.5311C10.6462 48.3224 11.9624 48.0758 12.374 47.0661L17.2537 35.1017C16.2375 35.668 15.1096 35.9999 13.9434 35.9999C12.1153 35.9999 10.3978 35.2883 9.10495 33.9964V33.9964ZM35.8875 42.0655L31.634 31.6367C30.9253 32.188 30.1415 32.6464 29.25 32.8855C27.2746 33.4142 27.7078 33.1836 26.895 33.9964C25.6021 35.2883 23.8837 35.9999 22.0556 35.9999C20.8893 35.9999 19.7615 35.6671 18.7453 35.1017L23.625 47.0661C24.0365 48.0758 25.3537 48.3224 26.1028 47.5311L29.5012 43.9424L34.4409 44.1308C35.5303 44.1721 36.299 43.0742 35.8875 42.0655V42.0655ZM24.6562 31.8749C26.0887 30.4171 26.2528 30.5427 28.2928 29.9867C29.595 29.6314 30.6131 28.5955 30.9618 27.2699C31.6631 24.6074 31.4812 24.9289 33.3946 22.9808C34.3481 22.0105 34.7203 20.5958 34.3715 19.2702C33.6712 16.6096 33.6703 16.9808 34.3715 14.3174C34.7203 12.9917 34.3481 11.5771 33.3946 10.6067C31.4812 8.65862 31.6631 8.97925 30.9618 6.31768C30.6131 4.99206 29.595 3.95612 28.2928 3.60081C25.679 2.88737 25.994 3.07393 24.0787 1.12487C23.1253 0.154558 21.735 -0.225129 20.4328 0.130183C17.82 0.842683 18.1846 0.843621 15.5671 0.130183C14.2649 -0.225129 12.8746 0.153621 11.9212 1.12487C10.0078 3.073 10.3228 2.88737 7.70807 3.60081C6.40588 3.95612 5.38776 4.99206 5.03901 6.31768C4.33869 8.97925 4.51963 8.65862 2.60619 10.6067C1.65275 11.5771 1.27963 12.9917 1.62932 14.3174C2.32963 16.9761 2.33057 16.6049 1.62932 19.2692C1.28057 20.5949 1.65275 22.0096 2.60619 22.9808C4.51963 24.9289 4.33776 24.6074 5.03901 27.2699C5.38776 28.5955 6.40588 29.6314 7.70807 29.9867C9.8062 30.5586 9.96276 30.4686 11.3437 31.8749C12.584 33.1377 14.5162 33.3636 16.0068 32.4205C16.6029 32.0421 17.2944 31.8411 18.0004 31.8411C18.7065 31.8411 19.3979 32.0421 19.994 32.4205C21.4837 33.3636 23.4159 33.1377 24.6562 31.8749ZM9.15557 16.4961C9.15557 11.5246 13.1156 7.49425 18 7.49425C22.8843 7.49425 26.8443 11.5246 26.8443 16.4961C26.8443 21.4677 22.8843 25.498 18 25.498C13.1156 25.498 9.15557 21.4677 9.15557 16.4961V16.4961Z"
                    fill="#8f93f6"
                  />
                </svg>
                <h3 class="mb-2 mt-3 text-primary">
                  {currentUser?.credit} Left
                </h3>
                <h4>{currentUser?.membership}</h4>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6">
            <div class="card card-block card-stretch card-height">
              <div class="card-body text-center">
                <h1 className="text-success">
                  <FaFileAlt />
                </h1>
                <h3 class="mb-2 mt-3 text-success">
                  {getAllUserFiles?.length}
                </h3>
                <h4>Your Files</h4>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6">
            <div class="card card-block card-stretch card-height">
              <div class="card-body text-center">
                <h1 className="text-warning">
                  <RiShoppingCart2Fill />
                </h1>
                <h3 class="mb-2 mt-3 text-warning">
                  {getAllPublicFiles?.length}
                </h3>
                <h4>Marketplace</h4>
              </div>
            </div>
          </div>
          <div class="col-lg-7 col-md-6">
            <div class="row">
              <div class="col-md-12 col-lg-6">
                <div class="card card-block card-stretch card-height">
                  <div class="card-header">
                    <div class="header-title">
                      <h4 class="card-title">Document Types</h4>
                    </div>
                  </div>
                  <div class="card-body">
                    <ul class="list-inline p-0 mb-0">
                      <li>
                        <div class="d-flex align-items-center justify-content-between mb-3">
                          <h6>Image</h6>
                          <div class="iq-progress-bar-linear d-inline-block mt-1 w-50">
                            <div class="iq-progress-bar iq-bg-primary">
                              <span
                                class="bg-primary"
                                data-percent="70"
                                style={{
                                  transition: "width 2s ease 0s",
                                  width: `${Image?.length}%`,
                                }}
                              ></span>
                            </div>
                          </div>
                          <div class="percentage float-right text-primary font-weight-bold">
                            {Image?.length}%
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="d-flex align-items-center justify-content-between mb-3">
                          <h6>Video</h6>
                          <div class="iq-progress-bar-linear d-inline-block mt-1 w-50">
                            <div class="iq-progress-bar iq-bg-success">
                              <span
                                class="bg-success"
                                data-percent="50"
                                style={{
                                  transition: "width 2s ease 0s",
                                  width: `${Video?.length}%`,
                                }}
                              ></span>
                            </div>
                          </div>
                          <div class="percentage float-right text-success font-weight-bold">
                            {Video?.length}%
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="d-flex align-items-center justify-content-between mb-3">
                          <h6>Audio</h6>
                          <div class="iq-progress-bar-linear d-inline-block mt-1 w-50">
                            <div class="iq-progress-bar iq-bg-info">
                              <span
                                class="bg-info"
                                data-percent="65"
                                style={{
                                  transition: "width 2s ease 0s",
                                  width: `${Audio?.length}%`,
                                }}
                              ></span>
                            </div>
                          </div>
                          <div class="percentage float-right text-info font-weight-bold">
                            {Audio?.length}%
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="d-flex align-items-center justify-content-between mb-3">
                          <h6>PDF</h6>
                          <div class="iq-progress-bar-linear d-inline-block mt-1 w-50">
                            <div class="iq-progress-bar iq-bg-info">
                              <span
                                class="bg-info"
                                data-percent="65"
                                style={{
                                  transition: "width 2s ease 0s",
                                  width: `${PDF?.length}%`,
                                }}
                              ></span>
                            </div>
                          </div>
                          <div class="percentage float-right text-info font-weight-bold">
                            {PDF?.length}%
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-md-12 col-lg-6">
                <div class="card card-block card-stretch card-height">
                  <div class="card-header">
                    <div class="header-title">
                      <h4 class="card-title">Social</h4>
                    </div>
                  </div>
                  <div class="card-body">
                    <ul class="list-inline p-0 m-0">
                      <li class="mb-3 d-flex">
                        <span>
                          <i class="lab  text-primary font-size-20 mr-3">
                            <TiSocialFacebook />
                          </i>
                        </span>
                        <p class="mb-0 font-size-16 line-height">
                          {userInfo?.facebook.slice(0, 25) || "Update"}
                        </p>
                      </li>
                      <li class="mb-3 d-flex">
                        <span>
                          <i class="lab  text-info font-size-20 mr-3">
                            <TiSocialInstagram />
                          </i>
                        </span>
                        <p class="mb-0 font-size-16 line-height">
                          {userInfo?.instagram.slice(0, 25) || "Update"}
                        </p>
                      </li>
                      <li class="mb-3 d-flex">
                        <span>
                          <i class="lab  text-danger font-size-20 mr-3">
                            <TiSocialLinkedin />
                          </i>
                        </span>
                        <p class="mb-0 font-size-16 line-height">
                          {userInfo?.linkedin.slice(0, 25) || "Update"}
                        </p>
                      </li>
                      <li class="d-flex">
                        <span>
                          <i class="lab text-primary font-size-20 mr-3">
                            <TiSocialTwitter />
                          </i>
                        </span>
                        <p class="mb-0 font-size-16 line-height">
                          {userInfo?.twitter.slice(0, 25) || "Update"}
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="col-lg-12">
                <div class="card card-block card-stretch card-height">
                  <div class="card-header">
                    <div class="header-title">
                      <h4 class="card-title">Recent Upload Files</h4>
                    </div>
                  </div>
                  <div class="card-body">
                    <ul class="list-inline mb-0 p-0">
                      {getAllUserFiles
                        ?.map((item, index) => (
                          <li
                            key={index + 1}
                            class="d-flex align-items-center mb-3"
                          >
                            <span
                              class={`${
                                index / 2 == 0 ? "bg-danger" : "bg-primary"
                              } rounded-small iq-card-icon-small mr-3`}
                            >
                              {index + 1}
                            </span>
                            <p class="mb-0 font-size-16">
                              {item?.description.slice(0, 55)}..
                            </p>
                          </li>
                        ))
                        .slice(0, 7)}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-5 col-md-6">
            <div class="card card-block card-stretch card-height">
              <div class="card-header">
                <div class="header-title">
                  <h4 class="card-title">Uniswap Exchnage </h4>
                </div>
              </div>
              <div class="card-body">
                <iframe
                  src="https://app.uniswap.org/#/swap?exactField=input&exactAmount=10&inputCurrency=0x6b175474e89094c44da98b954eedeac495271d0f"
                  height="660px"
                  width="100%"
                  style={{
                    border: "0",
                    margin: " 0 auto",
                    marginBottom: ".5rem",
                    display: "block",
                    borderRadius: "10px",
                    maxWidth: "960px",
                    minWidth: "300px",
                  }}
                />
                {/* <ul class="list-inline p-0 m-0">
                  {getAllPublicFiles
                    ?.map((item, index) => (
                      <li
                        key={index}
                        onClick={() => setOpenComponent("Marketplace")}
                        class="d-flex align-items-center mb-3"
                      >
                        <div class="profile-icon  iq-icon-box rounded-small bg-light  text-center">
                          <RiShoppingCart2Fill />
                        </div>
                        <div class="pl-3">
                          <h5>{item?.fileName.slice(0, 15)}</h5>
                          <p class="mb-0">
                            {item?.description.slice(0, 75)}...
                          </p>
                        </div>
                      </li>
                    ))
                    .slice(0, 5)}
                </ul> */}
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6">
            <div class="card card-block card-stretch card-height">
              <div class="card-header">
                <div class="header-title">
                  <h4 class="card-title">Crypto Tokens</h4>
                </div>
              </div>
              <div class="card-body">
                <ul class="list-inline p-0 mb-0 skill-details">
                  <li>
                    <div class="d-flex align-items-center justify-content-between mb-4 row">
                      <div class="col-xl-4 col-lg-5">
                        <p class="mb-0 font-size-16">@BTC</p>
                      </div>
                      <div class="col-xl-8 col-lg-7">
                        <div class="iq-progress-bar bg-primary-light mt-2">
                          <span
                            class="bg-primary iq-progress progress-1"
                            data-percent="85"
                          >
                            <span class="progress-text-one bg-primary">
                              85%
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="d-flex align-items-center justify-content-between mb-4 row">
                      <div class="col-xl-4 col-lg-5">
                        <p class="mb-0 font-size-16">@IPHONE</p>
                      </div>
                      <div class="col-xl-8 col-lg-7">
                        <div class="iq-progress-bar bg-warning-light mt-2">
                          <span
                            class="bg-warning iq-progress progress-1"
                            data-percent="65"
                          >
                            <span class="progress-text-one bg-warning">
                              65%
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="d-flex align-items-center justify-content-between mb-4 row">
                      <div class="col-xl-4 col-lg-5">
                        <p class="mb-0 font-size-16">@USDT</p>
                      </div>
                      <div class="col-xl-8 col-lg-7">
                        <div class="iq-progress-bar bg-success-light mt-2">
                          <span
                            class="bg-success iq-progress progress-1"
                            data-percent="55"
                          >
                            <span class="progress-text-one bg-success">
                              55%
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="d-flex align-items-center justify-content-between row">
                      <div class="col-xl-4 col-lg-5">
                        <p class="mb-0 font-size-16">@SHO</p>
                      </div>
                      <div class="col-xl-8 col-lg-7">
                        <div class="iq-progress-bar bg-info-light mt-2">
                          <span
                            class="bg-info iq-progress progress-1"
                            data-percent="60"
                          >
                            <span class="progress-text-one bg-info">60%</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6">
            <div class="card card-block card-stretch card-height">
              <div class="card-header">
                <div class="header-title">
                  <h4 class="card-title">Dapp Access</h4>
                </div>
              </div>
              <div class="card-body">
                <ul class="list-inline p-0 m-0">
                  <li class="mb-3">
                    <div class="d-flex align-items-center">
                      <div class="badge badge-light iq-number">1</div>
                      <div class="ml-3">
                        <p class="mb-0 font-size-16">
                          {userInfo?.role || "Update"}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li class="mb-3">
                    <div class="d-flex align-items-center">
                      <div class="badge badge-light iq-number">2</div>
                      <div class="ml-3">
                        <p class="mb-0 font-size-16">
                          {shortenAddress(currentUser?.address) || "Update"}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li class="mb-3">
                    <div class="d-flex align-items-center">
                      <div class="badge badge-light iq-number">3</div>
                      <div class="ml-3">
                        <p class="mb-0 font-size-16">
                          {currentUser?.username || "Update"}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li class="">
                    <div class="d-flex align-items-center">
                      <div class="badge badge-light iq-number">4</div>
                      <div class="ml-3">
                        <p class="mb-0 font-size-16">
                          {currentUser?.email || "Update"}
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="card card-block card-stretch card-height">
              <div class="card-header">
                <div class="header-title">
                  <h4 class="card-title">Contact Information</h4>
                </div>
              </div>
              <div class="card-body">
                <ul class="list-inline p-0 m-0 iq-contact-rest">
                  <li class="mb-3 d-flex">
                    <span>
                      <i class="fas  mr-3 font-size-20">
                        <FaMapLocation />
                      </i>
                    </span>
                    <p class="mb-0 font-size-16 line-height">
                      {userInfo?.address || "Update"}
                    </p>
                  </li>
                  <li class="mb-3 d-flex">
                    <span>
                      <i class="fas  mr-3 font-size-20">
                        <FaMobileScreenButton />
                      </i>
                    </span>
                    <p class="mb-0 font-size-16 line-height">
                      {userInfo?.mobile || "Update"}
                    </p>
                  </li>
                  <li class="mb-3 d-flex">
                    <span>
                      <i class="fas  mr-3 font-size-20">
                        <MdOutlineAlternateEmail />
                      </i>
                    </span>
                    <p class="mb-0 font-size-16 line-height">
                      {userInfo?.email || "Update"}
                    </p>
                  </li>
                  <li class="mb-3 d-flex">
                    <a href="javascript:void(0);" class="d-flex">
                      <i class="fas  mr-3 font-size-20">
                        <FaLocationDot />
                      </i>
                      <p class="mb-0 font-size-16 line-height">
                        {userInfo?.country || "Update"}
                      </p>
                    </a>
                  </li>
                  <li class="d-flex">
                    <span>
                      <i class="fas  mr-3 font-size-20">
                        <FaMagnifyingGlassLocation />
                      </i>
                    </span>
                    <p class="mb-0 font-size-16 line-height">
                      {userInfo?.city || "Update"}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;

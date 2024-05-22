import React from "react";
import { LuMenu } from "react-icons/lu";
import { IoSearchOutline } from "react-icons/io5";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { TbDeviceMobileQuestion } from "react-icons/tb";
import { MdTipsAndUpdates, MdOutlinePolicy } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { RiFeedbackFill } from "react-icons/ri";
import { FaKeyboard } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";

import {
  FaFileImage,
  FaFilePdf,
  FaFileAudio,
  FaFileVideo,
  FaFileLines,
  FaRegStar,
  FaRegUser,
  FaUserPlus,
  FaUsers,
  FaLock,
  FaCloud,
} from "react-icons/fa6";
import { FaRegQuestionCircle } from "react-icons/fa";
import { shortenAddress } from "../../utils/utils";

const Header = ({ currentUser, setOpenComponent }) => {
  return (
    <div class="iq-top-navbar">
      <div class="iq-navbar-custom">
        <nav class="navbar navbar-expand-lg navbar-light p-0">
          <div class="iq-navbar-logo d-flex align-items-center justify-content-between">
            <i class=" wrapper-menu">
              <LuMenu />
            </i>
            <a href="index.html" class="header-logo">
              <img
                src="../assets/images/logo-log.png"
                class="img-fluid  darkmode-logo"
                alt="logo"
              />
            </a>
          </div>
          <div class="iq-search-bar device-search">
            <form>
              <div class="input-prepend input-append">
                <div class="btn-group">
                  <label
                    class="dropdown-toggle searchbox"
                    data-toggle="dropdown"
                  >
                    <input
                      class="dropdown-toggle search-query text search-input"
                      type="text"
                      placeholder="Type here to search..."
                    />
                    <span class="search-replace"></span>
                    <a class="search-link" href="#">
                      <i class="">
                        <IoSearchOutline />
                      </i>
                    </a>
                    <span class="caret"></span>
                  </label>
                  <ul class="dropdown-menu">
                    <li>
                      <a onClick={() => setOpenComponent("MyPDF")}>
                        <div class="item">
                          <i class="far  bg-info">
                            <FaFileLines />
                          </i>
                          PDFs
                        </div>
                      </a>
                    </li>
                    <li>
                      <a onClick={() => setOpenComponent("MyImage")}>
                        <div class="item">
                          <i class="far  bg-primary">
                            <FaFileImage />
                          </i>
                          Image
                        </div>
                      </a>
                    </li>
                    <li>
                      <a onClick={() => setOpenComponent("MyAudio")}>
                        <div class="item">
                          <i class="far  bg-success">
                            <FaFileLines />
                          </i>
                          Audio
                        </div>
                      </a>
                    </li>
                    <li>
                      <a onClick={() => setOpenComponent("MyVideo")}>
                        <div class="item">
                          <i class="far  bg-danger">
                            <FaFileLines />
                          </i>
                          Video
                        </div>
                      </a>
                    </li>
                    <li>
                      <a onClick={() => setOpenComponent("Marketplace")}>
                        <div class="item">
                          <i class="far  bg-warning">
                            <FaFileImage />
                          </i>
                          Marketplace
                        </div>
                      </a>
                    </li>
                    <li>
                      <a onClick={() => setOpenComponent("Price")}>
                        <div class="item">
                          <i class="far  bg-info">
                            <FaFileVideo />
                          </i>
                          Price
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </form>
          </div>

          <div class="d-flex align-items-center">
            <div class="change-mode">
              <div class="custom-control custom-switch custom-switch-icon custom-control-inline">
                <div class="custom-switch-inner">
                  <p class="mb-0"></p>
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="dark-mode"
                    data-active="true"
                  />
                  <label
                    class="custom-control-label"
                    for="dark-mode"
                    data-mode="toggle"
                  >
                    <span class="switch-icon-left">
                      <i class="">
                        <MdDarkMode />
                      </i>
                    </span>
                    <span class="switch-icon-right">
                      <i class="">
                        <MdOutlineDarkMode />
                      </i>
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-label="Toggle navigation"
            >
              <i class="">
                <LuMenu />
              </i>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav ml-auto navbar-list align-items-center">
                <li class="nav-item nav-icon search-content">
                  <a
                    href="#"
                    class="search-toggle rounded"
                    id="dropdownSearch"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i class="">
                      <IoSearchOutline />
                    </i>
                  </a>
                  <div
                    class="iq-search-bar iq-sub-dropdown dropdown-menu"
                    aria-labelledby="dropdownSearch"
                  >
                    <form action="#" class="searchbox p-2">
                      <div class="form-group mb-0 position-relative">
                        <input
                          type="text"
                          class="text search-input font-size-12"
                          placeholder="type here to search..."
                        />
                        <a href="#" class="search-link">
                          <i class="las ">
                            <IoSearchOutline />
                          </i>
                        </a>
                      </div>
                    </form>
                  </div>
                </li>
                <li class="nav-item nav-icon dropdown">
                  <a
                    href="#"
                    class="search-toggle dropdown-toggle"
                    id="dropdownMenuButton01"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i class="">
                      <FaRegQuestionCircle />
                    </i>
                  </a>
                  <div
                    class="iq-sub-dropdown dropdown-menu"
                    aria-labelledby="dropdownMenuButton01"
                  >
                    <div class="card shadow-none m-0">
                      <div class="card-body p-0">
                        <div class="p-3"></div>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="nav-item nav-icon dropdown">
                  <a
                    href="#"
                    class="search-toggle dropdown-toggle"
                    id="dropdownMenuButton02"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i class="">
                      <CiSettings />
                    </i>
                  </a>
                  <div
                    class="iq-sub-dropdown dropdown-menu"
                    aria-labelledby="dropdownMenuButton02"
                  >
                    <div class="card shadow-none m-0">
                      <div class="card-body p-0">
                        <div class="p-3">
                          <a href="#" class="iq-sub-card pt-0">
                            <i>
                              <CiSettings />
                            </i>{" "}
                            Settings
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="nav-item nav-icon dropdown caption-content">
                  <a
                    href="#"
                    class="search-toggle dropdown-toggle"
                    id="dropdownMenuButton03"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <div class="caption bg-primary line-height">P</div>
                  </a>
                  <div
                    class="iq-sub-dropdown dropdown-menu"
                    aria-labelledby="dropdownMenuButton03"
                  >
                    <div class="card mb-0">
                      <div class="card-header d-flex justify-content-between align-items-center mb-0">
                        <div class="header-title">
                          <h4 class="card-title mb-0">Profile</h4>
                        </div>
                        <div class="close-data text-right badge badge-primary cursor-pointer">
                          <i>
                            <IoIosClose />
                          </i>
                        </div>
                      </div>
                      <div class="card-body">
                        <div class="profile-header">
                          <div class="cover-container text-center">
                            <div class="rounded-circle profile-icon bg-primary mx-auto d-block">
                              P<a href=""> </a>
                            </div>
                            <div class="profile-detail mt-3">
                              <h5>
                                <a>{currentUser?.name}</a>
                              </h5>
                              <p>{shortenAddress(currentUser?.address)}</p>
                            </div>
                            <a
                              onClick={() => (
                                localStorage.removeItem("currentUser"),
                                window.location.reload()
                              )}
                              class="btn btn-primary text-white"
                            >
                              Sign Out
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;

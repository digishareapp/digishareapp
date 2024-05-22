import React, { useEffect } from "react";
import {
  IoIosArrowDown,
  IoIosArrowRoundForward,
  IoMdTime,
} from "react-icons/io";
import {
  MdAddToPhotos,
  MdDeleteSweep,
  MdOutlineAttachMoney,
  MdVerifiedUser,
  MdLogin,
  MdDateRange,
  MdOutlineTipsAndUpdates,
} from "react-icons/md";
import { FaClipboardList } from "react-icons/fa6";
import { RiFileCopyFill } from "react-icons/ri";
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
import { FaBox, FaShareSquare } from "react-icons/fa";

//INTERNAL IMPORT
import { shortenAddress } from "../../utils/utils";

const Home = ({
  getAllUserFiles,
  getAllPublicFiles,
  currentUser,
  setOpenComponent,
  setselectedPDF,
  LOAD_INITIAL_DATA,
}) => {
  const Image = [];
  const Audio = [];
  const Video = [];
  const PDF = [];

  if (getAllUserFiles?.length) {
    getAllUserFiles?.map((el) => {
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

  useEffect(() => {
    LOAD_INITIAL_DATA();
  }, []);

  return (
    <div class="content-page">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-12">
            <div class="card-transparent card-block card-stretch card-height mb-3">
              <div class="d-flex justify-content-between">
                <div class="select-dropdown input-prepend input-append">
                  <div class="btn-group">
                    <div data-toggle="dropdown">
                      <div
                        class="dropdown-toggle search-query"
                        onclick="myFunction()"
                      >
                        My Drive
                        <i class="las  ml-3">
                          <IoIosArrowDown />
                        </i>
                      </div>
                      <span class="search-replace"></span>
                      <span class="caret"></span>
                    </div>
                    <ul class="dropdown-menu">
                      <li onClick={() => setOpenComponent("Upload")}>
                        <div class="item">
                          <i class=" pr-3">
                            <MdAddToPhotos />
                          </i>
                          New Folder
                        </div>
                      </li>
                      <li onClick={() => setOpenComponent("Upload")}>
                        <div class="item">
                          <i class=" pr-3">
                            <MdAddToPhotos />
                          </i>
                          Upload Files
                        </div>
                      </li>
                      <li onClick={() => setOpenComponent("Upload")}>
                        <div class="item">
                          <i class=" pr-3">
                            <MdAddToPhotos />
                          </i>
                          Upload Folders
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* <div class="dashboard1-dropdown d-flex align-items-center">
                  <div class="dashboard1-info">
                    <a
                      href="#calander"
                      class="collapsed"
                      data-toggle="collapse"
                      aria-expanded="false"
                    >
                      <i class="las  ">
                        <IoIosArrowDown />
                      </i>
                    </a>
                    <ul
                      id="calander"
                      class="iq-dropdown collapse list-inline m-0 p-0 mt-2"
                    >
                      <li class="mb-2">
                        <a
                          href="#"
                          data-toggle="tooltip"
                          data-placement="right"
                          title="Calander"
                        >
                          <i class="las  iq-arrow-left">
                            <MdDateRange />
                          </i>
                        </a>
                      </li>
                      <li class="mb-2">
                        <a
                          href="#"
                          data-toggle="tooltip"
                          data-placement="right"
                          title="Keep"
                        >
                          <i class="las  iq-arrow-left">
                            <MdOutlineTipsAndUpdates />
                          </i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          data-toggle="tooltip"
                          data-placement="right"
                          title="Tasks"
                        >
                          <i class="las iq-arrow-left">
                            <FaClipboardList />
                          </i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <div class="col-lg-8">
            <div
              class="card card-block card-stretch card-height iq-welcome"
              style={{
                background:
                  "url(../assets/images/layouts/mydrive/background.png) noRepeat scroll right center",
                backgroundColor: "#ffffff",
                backgroundSize: "contain",
              }}
            >
              <div class="card-body property2-content">
                <div class="d-flex flex-wrap align-items-center">
                  <div class="col-lg-6 col-sm-6 p-0">
                    <h3 class="mb-3">Welcome {currentUser?.username}</h3>
                    <p class="mb-5">
                      You have uploaded {getAllUserFiles?.length} private and
                      publice files, We are looking for your feedback to our
                      dapp
                    </p>
                    <a>
                      View Files
                      <i class="las  ml-2">
                        <IoIosArrowRoundForward />
                      </i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="card card-block card-stretch card-height">
              <div class="card-header d-flex justify-content-between">
                <div class="header-title">
                  <h4 class="card-title">Quick Access</h4>
                </div>
              </div>
              <div class="card-body">
                <ul class="list-inline p-0 mb-0 row align-items-center">
                  <li class="col-lg-6 col-sm-6 mb-3 mb-sm-0">
                    <div
                      onClick={() => setOpenComponent("Upload")}
                      style={{ cursor: "pointer" }}
                      class="p-2 text-center border rounded"
                    >
                      <div>
                        <img
                          src="../assets/images/layouts/mydrive/folder-1.png"
                          class="img-fluid mb-1"
                          alt="image1"
                        />
                      </div>
                      <p class="mb-0">Upload</p>
                    </div>
                  </li>
                  <li class="col-lg-6 col-sm-6">
                    <div
                      onClick={() => setOpenComponent("User")}
                      style={{ cursor: "pointer" }}
                      class="p-2 text-center border rounded"
                    >
                      <div>
                        <img
                          src="../assets/images/layouts/mydrive/folder-2.png"
                          class="img-fluid mb-1"
                          alt="image2"
                        />
                      </div>
                      <p class="mb-0">Profile</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {PDF.length ? (
            <div class="col-lg-12">
              <div class="card card-block card-stretch card-transparent">
                <div class="card-header d-flex justify-content-between pb-0">
                  <div class="header-title">
                    <h4 class="card-title">Documents</h4>
                  </div>
                  <div class="card-header-toolbar d-flex align-items-center">
                    <a
                      onClick={() => setOpenComponent("MyPDF")}
                      class="view-more"
                    >
                      View All
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {PDF?.map((file, index) => (
            <div key={index} class="col-lg-3 col-md-6 col-sm-6">
              <div
                onClick={() => setselectedPDF(file?.fileHash)}
                class="card card-block card-stretch card-height"
              >
                <div class="card-body image-thumb">
                  <a data-toggle="modal" data-target="#exampleModal">
                    <div class="mb-4 text-center p-3 rounded iq-thumb">
                      <div class="iq-image-overlay"></div>
                      <img
                        src="../assets/images/layouts/page-1/pdf.png"
                        class="img-fluid"
                        alt="image1"
                      />
                    </div>
                    <div className="new_card_flex">
                      <h6>{file.fileName.slice(0, 18)}..</h6>{" "}
                      <span
                        onClick={() =>
                          navigator.clipboard.writeText(file?.fileHash)
                        }
                        style={{ cursor: "pointer" }}
                      >
                        <FaShareSquare />
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          ))}

          <div class="col-lg-12">
            <div class="card card-block card-stretch card-transparent">
              <div class="card-header d-flex justify-content-between pb-0">
                <div class="header-title">
                  <h4 class="card-title">Category Types</h4>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-sm-6 col-lg-3">
            <div class="card card-block card-stretch card-height">
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <a onClick={() => setOpenComponent("MyImage")} class="folder">
                    <div class="icon-small bg-danger rounded mb-4">
                      <i class="">
                        <RiFileCopyFill />
                      </i>
                    </div>
                  </a>
                </div>
                <a class="folder">
                  <h5 class="mb-2">Images</h5>
                  <p class="mb-2">
                    <i class="lar  text-danger mr-2 font-size-20">
                      <IoMdTime />
                    </i>
                    {Image?.map((file, index) => (
                      <span>
                        {new Date(file?.createdAt * 1000).toLocaleDateString()}{" "}
                      </span>
                    )).slice(0, 1)}
                  </p>
                  <p class="mb-0">
                    <i class="las  text-danger mr-2 font-size-20">
                      <FaFileLines />
                    </i>
                    {Image.length} Files
                  </p>
                </a>
              </div>
            </div>
          </div>

          <div class="col-md-6 col-sm-6 col-lg-3">
            <div class="card card-block card-stretch card-height">
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <a onClick={() => setOpenComponent("MyPDF")} class="folder">
                    <div class="icon-small bg-primary rounded mb-4">
                      <i class="">
                        <RiFileCopyFill />
                      </i>
                    </div>
                  </a>
                </div>
                <a href="./page-android.html" class="folder">
                  <h5 class="mb-2">PDF</h5>
                  <p class="mb-2">
                    <i class="lar  text-primary mr-2 font-size-20">
                      <IoMdTime />
                    </i>
                    {PDF?.map((file, index) => (
                      <span>
                        {new Date(file?.createdAt * 1000).toLocaleDateString()}{" "}
                      </span>
                    )).slice(0, 1)}
                  </p>
                  <p class="mb-0">
                    <i class="las  text-primary mr-2 font-size-20">
                      <FaFileLines />
                    </i>
                    {PDF.length} Files
                  </p>
                </a>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-sm-6 col-lg-3">
            <div class="card card-block card-stretch card-height">
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <a onClick={() => setOpenComponent("MyAudio")} class="folder">
                    <div class="icon-small bg-info rounded mb-4">
                      <i class="">
                        <RiFileCopyFill />
                      </i>
                    </div>
                  </a>
                </div>
                <a class="folder">
                  <h5 class="mb-2">Video</h5>
                  <p class="mb-2">
                    <i class="lar  text-info mr-2 font-size-20">
                      <IoMdTime />
                    </i>
                    {Video?.map((file, index) => (
                      <span>
                        {new Date(file?.createdAt * 1000).toLocaleDateString()}{" "}
                      </span>
                    )).slice(0, 1)}
                  </p>
                  <p class="mb-0">
                    <i class="las  text-info mr-2 font-size-20">
                      <FaFileLines />
                    </i>
                    {Video.length} Files
                  </p>
                </a>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-sm-6 col-lg-3">
            <div class="card card-block card-stretch card-height">
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <a onClick={() => setOpenComponent("MyVideo")} class="folder">
                    <div class="icon-small bg-success rounded mb-4">
                      <i class="">
                        <RiFileCopyFill />
                      </i>
                    </div>
                  </a>
                </div>
                <a class="folder">
                  <h5 class="mb-2">Audio</h5>
                  <p class="mb-2">
                    <i class="las  text-success mr-2 font-size-20">
                      <IoMdTime />
                    </i>
                    {Audio?.map((file, index) => (
                      <span>
                        {new Date(file?.createdAt * 1000).toLocaleDateString()}{" "}
                      </span>
                    )).slice(0, 1)}
                  </p>
                  <p class="mb-0">
                    <i class="las  text-success mr-2 font-size-20">
                      <FaFileLines />
                    </i>
                    {Audio.length} Files
                  </p>
                </a>
              </div>
            </div>
          </div>
          <div class="col-lg-8 col-xl-8">
            <div class="card card-block card-stretch card-height files-table">
              <div class="card-header d-flex justify-content-between">
                <div class="header-title">
                  <h4 class="card-title">Files</h4>
                </div>
                <div class="card-header-toolbar d-flex align-items-center">
                  <a
                    onClick={() => setOpenComponent("Recent")}
                    class="view-more"
                  >
                    View All
                  </a>
                </div>
              </div>
              <div class="card-body pt-0">
                <div class="table-responsive">
                  <table class="table mb-0 table-borderless tbl-server-info">
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Description</th>
                        <th scope="col">Owner</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getAllUserFiles
                        ?.reverse()
                        .map((file, inex) => (
                          <tr>
                            <td>
                              <div class="d-flex align-items-center">
                                <div class="icon-small bg-danger rounded mr-3">
                                  <i>
                                    <FaFileLines />
                                  </i>
                                </div>
                                <div
                                  data-toggle="modal"
                                  data-target="#exampleModal"
                                  style={{ cursor: "pointer" }}
                                >
                                  {file.fileName.slice(0, 18)}..
                                </div>
                              </div>
                            </td>
                            <td>{file.category}</td>
                            <td
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                navigator.clipboard.writeText(file.description)
                              }
                            >
                              {file.description.slice(0, 20)}..
                            </td>
                            <td
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                navigator.clipboard.writeText(file.owner)
                              }
                            >
                              {shortenAddress(file.owner)}
                            </td>
                          </tr>
                        ))
                        .slice(0, 3)}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="card card-block card-stretch card-height plan-bg">
              <div class="card-body">
                <h4 class="mb-3 text-white">Unlock Your plan</h4>
                <p>
                  Expanded Storage, Access To
                  <br />
                  More Features On Digishare
                </p>
                <div class="row align-items-center justify-content-between">
                  <div class="col-6 go-white">
                    <a href="#" class="btn d-inline-block mt-5">
                      Go Premium
                    </a>
                  </div>
                  <div class="col-6">
                    <img
                      src="../assets/images/layouts/mydrive/lock-bg.png"
                      class="img-fluid"
                      alt="image1"
                    />
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

export default Home;

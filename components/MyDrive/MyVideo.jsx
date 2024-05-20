import React, { useEffect } from "react";
import {
  IoIosArrowDown,
  IoIosArrowRoundForward,
  IoMdTime,
  IoIosArrowBack,
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
import { FaClipboardList, FaPlay } from "react-icons/fa6";

import { CiBoxList } from "react-icons/ci";
import { FaBox, FaShareSquare } from "react-icons/fa";
//INTERNAL IMPORT
import Error from "../Error/Error";

const MyVideo = ({ getAllUserFiles, LOAD_INITIAL_DATA }) => {
  const Video = [];

  if (getAllUserFiles?.length) {
    getAllUserFiles?.map((el) => {
      if (el.category == "Video") {
        Video.push(el);
      }
    });
  }

  return (
    <div class="content-page">
      <div class="container-fluid">
        {Video?.length == 0 ? (
          <Error />
        ) : (
          <>
            <div class="row">
              <div class="col-lg-12">
                <div class="d-flex align-items-center justify-content-between welcome-content mb-3">
                  <div class="navbar-breadcrumb">
                    <nav aria-label="breadcrumb">
                      <ul class="breadcrumb mb-0">
                        <li class="breadcrumb-item">
                          <a>My Drive</a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">
                          Alexa Workshop
                        </li>
                      </ul>
                    </nav>
                  </div>
                  <div class="d-flex align-items-center">
                    <div class="list-grid-toggle mr-4">
                      <span class="icon icon-grid i-grid">
                        <i class=" font-size-20">
                          <FaBox />
                        </i>
                      </span>
                      <span class="icon icon-grid i-list">
                        <i class=" font-size-20">
                          <CiBoxList />
                        </i>
                      </span>
                      <span class="label label-list">List</span>
                    </div>
                    <div class="dashboard1-dropdown d-flex align-items-center">
                      <div class="dashboard1-info rounded">
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="icon icon-grid i-grid">
              <div class="row">
                <div class="col-lg-12">
                  <div class="card card-block card-stretch card-transparent">
                    <div class="card-header d-flex justify-content-between pb-0">
                      <div class="header-title">
                        <h4 class="card-title">Video Files</h4>
                      </div>
                    </div>
                  </div>
                </div>
                {Video.map((file, index) => (
                  <div key={index + 1} class="col-lg-5 col-md-6 col-sm-6">
                    <div class="card card-block card-stretch card-height">
                      <div class="card-body image-thumb">
                        <div class="mb-4 text-center  rounded iq-thumb">
                          <video
                            className="video-width-new"
                            controls
                            src={file.fileHash}
                          ></video>
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
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyVideo;

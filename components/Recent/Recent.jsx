import React from "react";
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

//INTERNAL IMPORT
import { shortenAddress } from "../../utils/utils";

const Recent = ({ getAllPublicFiles }) => {
  const recentUploads = getAllPublicFiles?.reverse();
  return (
    <div class="content-page">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-12">
            <div class="card card-block card-stretch card-transparent">
              <div class="card-header d-flex justify-content-between pb-0">
                <div class="header-title">
                  <h4 class="card-title">Files</h4>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-12">
            <div class="card card-block card-stretch card-height">
              <div class="card-body">
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
                      {getAllPublicFiles?.reverse().map((file, index) => (
                        <tr key={index + 2}>
                          <td>
                            <div class="d-flex align-items-center">
                              <div class="icon-small bg-danger rounded mr-3">
                                <i class="ri-file-excel-line"></i>
                              </div>
                              <div style={{ cursor: "pointer" }}>
                                {file.fileName.slice(0, 38)}..
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
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recent;

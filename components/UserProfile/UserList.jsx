import React, { useEffect, useState } from "react";

//INTERNAL IMPORT
import { shortenAddress } from "../../utils/utils";

const UserList = ({ allDappUsers }) => {
  const downloadCSV = (allDappUsers) => {
    const csvData = convertArrayOfObjectsToCSV(allDappUsers);
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Convert array of objects to CSV format
  const convertArrayOfObjectsToCSV = (array) => {
    const header = Object.keys(array[0]).join(",") + "\n";
    const csv = array.map((item) => {
      return Object.values(item).join(",") + "\n";
    });
    return header + csv.join("");
  };

  return (
    <div class="content-page">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-12">
            <div class="card">
              <div class="card-header d-flex justify-content-between">
                <div class="header-title">
                  <h4 class="card-title">User List</h4>
                </div>
              </div>
              <div class="card-body">
                <div class="row justify-content-between">
                  <div class="col-sm-6 col-md-6">
                    <div
                      id="user_list_datatable_info"
                      class="dataTables_filter"
                    >
                      <form class="mr-3 position-relative">
                        <div class="form-group mb-0">
                          <input
                            type="search"
                            class="form-control"
                            id="exampleInputSearch"
                            placeholder="Search"
                            aria-controls="user-list-table"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                  <div class="col-sm-6 col-md-6">
                    <div class="user-list-files d-flex">
                      <a
                        onClick={() => downloadCSV(allDappUsers)}
                        class="bg-primary"
                      >
                        Print
                      </a>
                      <a
                        onClick={() => downloadCSV(allDappUsers)}
                        class="bg-primary"
                      >
                        Excel
                      </a>
                      <a
                        onClick={() => downloadCSV(allDappUsers)}
                        class="bg-primary"
                      >
                        Pdf
                      </a>
                    </div>
                  </div>
                </div>
                <div class="table-responsive">
                  <table
                    id="user-list-table"
                    class="table table-striped table-bordered mt-4 "
                    role="grid"
                    aria-describedby="user-list-page-info"
                  >
                    <thead>
                      <tr>
                        <th scope="col">Profile</th>
                        <th scope="col">Name</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">isRegistered</th>
                        <th scope="col">registerAt</th>
                        <th scope="col">Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allDappUsers.map((user, index) => (
                        <tr key={index + 2}>
                          <td class="text-center">
                            <img
                              class="rounded img-fluid avatar-40"
                              src="../assets/images/user/01.jpg"
                              alt="profile"
                            />
                          </td>
                          <td>{user?.fullname}</td>
                          <td>{user?.username}</td>
                          <td>{user?.email}</td>
                          <td>{user?.isRegistered ? "True" : "False"}</td>
                          <td>
                            <span class="badge iq-bg-primary">
                              {user?.registerAt}
                            </span>
                          </td>
                          <td>{shortenAddress(user?.address)}</td>
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

export default UserList;

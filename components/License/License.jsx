import React from "react";

const License = ({ currentUser, generateCertificated }) => {
  console.log(currentUser);
  console.log(generateCertificated);
  return (
    <div class="certificate-container">
      <div class="certificate">
        <div class="water-mark-overlay"></div>
        <div class="certificate-header">
          <img src="../assets/images/logoo.png" class="logo" alt="" />
        </div>
        <div class="certificate-body">
          <p class="certificate-title">
            <strong>Digishare Digital Assects License</strong>
          </p>
          <h1 style={{ color: "#000000" }}>Copyright Certificate </h1>
          <p class="student-name">{currentUser?.name}</p>
          <div class="certificate-content">
            <p class="topic-title">{generateCertificated?.fileName}</p>
            <div class="text-center">
              <p class="topic-description text-muted">
                {generateCertificated?.description}
              </p>
              <p>FILE HASH: {generateCertificated?.fileHash}</p>
            </div>
          </div>
          <div class="certificate-footer text-muted">
            <div class="row">
              <div class="col-md-6">
                <p>CopyRight Owner: {currentUser?.address}</p>
              </div>
              <div class="col-md-6">
                <div class="row">
                  <div class="col-md-6">
                    <p>ID: {generateCertificated?.ID} </p>
                  </div>
                  <div class="col-md-6">
                    <p>Category: {generateCertificated?.category}</p>
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

export default License;

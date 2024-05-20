import React from "react";

const Error = () => {
  return (
    <div class="container">
      <div class="row no-gutters height-self-center">
        <div class="col-sm-12 text-center align-self-center">
          <div class="iq-error position-relative">
            <img
              src="../assets/images/error/404.png"
              class="img-fluid iq-error-img"
              alt=""
            />
            <h2 class="mb-0 mt-4">Oops! There is no files.</h2>
            <p>Kindly create your first file now!</p>
            <a class="btn btn-primary d-inline-flex align-items-center mt-3"></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;

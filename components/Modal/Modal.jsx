import React from "react";

const Modal = ({ selectedPDF, setselectedPDF }) => {
  return (
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Title</h4>
            <div>
              <a
                onClick={() => setselectedPDF("")}
                class="btn"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </a>
            </div>
          </div>
          <div class="modal-body">
            <div>
              <object
                className="pdf-file"
                // data="https://gateway.pinata.cloud/ipfs/QmQn2tE99qbfoJTLnLWJscryWHwsB8zZrTCkUpkfJGL3GA"
                data={selectedPDF}
              ></object>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

import React from "react";

//INTERNAL IMPORT
import { Twitter, Discord, Instagram } from "./SVG/index";

const BuyCard = ({ selectedFileBuy, setSelectedFileBuy, BUY_RIGHT }) => {
  return (
    <div class="BuyCard_card">
      <div class="BuyCard_image">
        {selectedFileBuy.category == "Video" ? (
          <video
            className="video-width-new"
            controls
            src={selectedFileBuy.fileHash}
          ></video>
        ) : selectedFileBuy.category == "Image" ? (
          <div className="image-width-new">
            <img
              className="image-width-new-img"
              src={selectedFileBuy.fileHash}
              alt=""
            />
          </div>
        ) : selectedFileBuy.category == "Audio" ? (
          <audio
            controls
            className="image-width-new"
            style={{ marginBlock: "4rem" }}
          >
            <source src={selectedFileBuy.fileHash} type="audio/ogg" />
            <source src={selectedFileBuy.fileHash} type="audio/mpeg" />
            Your browser dose not support the audio tag
          </audio>
        ) : selectedFileBuy.category == "PDF" ? (
          <img
            style={{ width: "100%", height: "100%" }}
            src="../assets/images/layouts/page-1/pdf.png"
            alt=""
          />
        ) : (
          ""
        )}
      </div>
      <div class="BuyCard_content">
        <p class="BuyCard_text-1">{selectedFileBuy?.fileName.slice(0, 26)}</p>

        <div class="BuyCard_text-2">
          <span>only 0.001 ETH</span>
          <span>Get Exclusive Right to use file</span>
        </div>

        <a
          class="BuyCard_action"
          onClick={() => (BUY_RIGHT(selectedFileBuy), setSelectedFileBuy(""))}
        >
          Buy Rights
        </a>

        <p class="BuyCard_date">
          Get Exclusive rights to use Assets{" "}
          <strong
            style={{ cursor: "pointer" }}
            onClick={() => setSelectedFileBuy("")}
          >
            CLOSE
          </strong>
        </p>
      </div>
    </div>
  );
};

export default BuyCard;

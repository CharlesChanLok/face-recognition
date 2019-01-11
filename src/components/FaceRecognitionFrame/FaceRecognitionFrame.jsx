import React from "react";

import "tachyons";
import "./FaceRecognitionFrame.css";

const FaceRecognitionFrame = (props) => {
  const { imageUrl, faceBoundingBoxes } = props;
  return (
    <div className="center">
      <div className="absolute mt2">
        <img
          id="imageFrame"
          className="FaceRecognitionFrame_image_size"
          src={imageUrl}
          alt="Recognized face"
        />
        {faceBoundingBoxes.map((faceBoundingBox) => {
          return (
            <div
              key={faceBoundingBox.topRow + faceBoundingBox.leftCol}
              className="bounding_box"
              style={{
                top: faceBoundingBox.topRow,
                right: faceBoundingBox.rightCol,
                bottom: faceBoundingBox.bottomRow,
                left: faceBoundingBox.leftCol
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FaceRecognitionFrame;
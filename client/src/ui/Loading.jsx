import React from "react";
import loadingIcon from "../assets/loading.json";
import Lottie from "lottie-react";

function Loading() {
  return (
    <div className="w-1/6 m-auto">
      <Lottie animationData={loadingIcon} loop />
    </div>
  );
}

export default Loading;

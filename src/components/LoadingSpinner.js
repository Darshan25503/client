// Spinner.js
import React from "react";
import Spinner from "react-spinner";

const LoadingSpinner = () => {
  return (
    <div style={{ textAlign: "center", paddingTop: "20px" }}>
      <Spinner />
    </div>
  );
};

export default LoadingSpinner;

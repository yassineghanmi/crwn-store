import React from "react";
import "./Loader.scss";
import { PropagateLoader } from "react-spinners";
const Loader = () => {
  return (
    <div className="SpinnerContainer">
      <PropagateLoader color="#444545" />
    </div>
  );
};

export default Loader;

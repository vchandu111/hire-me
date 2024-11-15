import React from "react";
import { DNA, Hourglass } from "react-loader-spinner";

const Loader = ({ visible = true, height = 120, width = 120 }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-white z-50"
      style={{ height: "100vh", width: "100vw" }}
    >
      <Hourglass
        visible={visible}
        height={height}
        width={width}
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
};

export default Loader;

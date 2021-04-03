import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div className="row justify-content-center mt-5">
      <Spinner animation="grow" role="status" variant="info">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loader;

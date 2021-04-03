import React from "react";
import { Alert, Col } from "react-bootstrap";

const Message = ({ variant, children }) => {
  return (
    <div className="row justify-content-center mt-5">
      <Col md={6} className="text-center">
        <Alert variant={variant}>{children}</Alert>
      </Col>
    </div>
  );
};

export default Message;

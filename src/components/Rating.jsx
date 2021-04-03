import React from "react";

const Rating = ({ value }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= value) {
      stars.push(<i className="fas fa-star text-warning" key={i}></i>);
    } else if (i === Math.ceil(value) && !Number.isInteger(value)) {
      stars.push(<i className="fas fa-star-half-alt text-warning" key={i}></i>);
    } else {
      stars.push(<i className="far fa-star text-warning" key={i}></i>);
    }
  }
  return <span>{stars}</span>;
};

export default Rating;

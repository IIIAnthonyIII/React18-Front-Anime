import React, { useEffect, useState } from "react";
import "./Error.css";

const Error = ({navigHandled}) => {
  const [width, setWidth] = useState(navigHandled);
  useEffect(() => {
    setWidth(navigHandled);
  }, [navigHandled]);
  return (
    <div style={{width: width+'vw', transition: '0.5s'}}>
      <section className="error-container">
        <span>
          <span>4</span>
        </span>
        <span>0</span>
        <span>
          <span>4</span>
        </span>
      </section>
    </div>
  );
};

export default Error;

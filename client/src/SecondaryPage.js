import React from "react";
import { Link } from "react-router-dom";

const SecondaryPage = () => {
  return (
    <div>
      <h2>I am a secondary page</h2>
      <Link to="/">Home</Link>
    </div>
  );
};

export default SecondaryPage;

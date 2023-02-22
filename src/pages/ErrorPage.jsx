import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <img
        src="http://localhost:3000/error-page.jpg"
        alt=""
        style={{ height: 600 }}
      />
      <Link to="/users">
        <Button type="primary" size="large">
          Back to Homepage
        </Button>
      </Link>
    </div>
  );
};

export default ErrorPage;

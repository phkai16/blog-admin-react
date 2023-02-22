import React from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

const BreadcrumbLink = ({ routeList }) => {
  console.log(routeList);
  return (
    <Breadcrumb
      style={{
        margin: "16px 0",
      }}
    >
      <Breadcrumb.Item>
        <Link to="/">Home</Link>
      </Breadcrumb.Item>

      {routeList.map((route, index) => (
        <Breadcrumb.Item key={index}>{route.title}</Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default BreadcrumbLink;

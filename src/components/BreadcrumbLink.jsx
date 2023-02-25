import React from "react";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";
const breadcrumbNameMap = {
  "/users": "User List",
  "/users/add": "Add User",
  "/categories": "Category List",
  "/categories/add": "Add Category",
  "/articles": "Article List",
  "/articles/add": "Add Article",
  "/profile": "Your Profile",
};
const BreadcrumbLink = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    if (pathSnippets.length === index + 1) {
      return (
        <Breadcrumb.Item key={url}>{breadcrumbNameMap[url]}</Breadcrumb.Item>
      );
    }
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/users">Home</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);
  return <Breadcrumb className="my-4">{breadcrumbItems}</Breadcrumb>;
};

export default BreadcrumbLink;

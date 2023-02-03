import React from "react";
import BreadcrumbLink from "../components/BreadcrumbLink";
import ContentLayout from "../components/ContentLayout";
import UserTable from "../components/UserTable";

const UserList = () => {
  return (
    <>
      <BreadcrumbLink />
      <ContentLayout>
        <UserTable />
      </ContentLayout>
    </>
  );
};

export default UserList;

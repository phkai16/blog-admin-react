import React from "react";
import BreadcrumbLink from "../components/BreadcrumbLink";
import CategoryTable from "../components/CategoryTable";
import ContentLayout from "../components/ContentLayout";

const CategoryList = () => {
  return (
    <>
      <BreadcrumbLink />
      <ContentLayout>
        <CategoryTable />
      </ContentLayout>
    </>
  );
};

export default CategoryList;

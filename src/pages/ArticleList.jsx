import React from "react";
import ArticleTable from "../components/article/ArticleTable";
import BreadcrumbLink from "../components/BreadcrumbLink";
import ContentLayout from "../components/ContentLayout";

const ArticleList = () => {
  return (
    <>
      <BreadcrumbLink />
      <ContentLayout>
        <ArticleTable />
      </ContentLayout>
    </>
  );
};

export default ArticleList;

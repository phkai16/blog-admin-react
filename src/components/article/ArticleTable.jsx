import React, { useState } from "react";
import { Space, Table, Tag, Button } from "antd";
import ArticleModal from "./ArticleModal";
import { useParams } from "react-router-dom";
import {
  useDeleteArticleMutation,
  useGetAllArticlesQuery,
} from "../../service/api.article";

const ArticleTable = () => {
  const [open, setOpen] = useState(false);
  const [articleId, setArticleId] = useState(null);
  const { data, isLoading } = useGetAllArticlesQuery();
  const [
    deleteArticle,
    { isError, isSuccess, isLoading: deleteArticleLoading },
  ] = useDeleteArticleMutation();

  const showModal = (id) => {
    setArticleId(id);
    setOpen(true);
  };

  const handleDelete = (id) => {
    deleteArticle(id);
  };
  const columns = [
    {
      title: "Thumbnail",
      dataIndex: "thumbnailImg",
      key: "thumbnailImg",
      render: (url) => (
        <img
          src={url}
          style={{ height: "200px", width: "400px", objectFit: "cover" }}
          alt=""
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (_, text) => {
        <span>{text}</span>;
      },
    },
    {
      title: "Categories",
      key: "categories",
      dataIndex: "categories",
      render: (_, { categories }) => (
        <>
          {categories.map((category) => {
            let color = category.length > 5 ? "geekblue" : "green";
            if (category === "music") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={category}>
                {category.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "_id",
      render: (id) => (
        <Space size="middle">
          <Button
            type="primary"
            ghost
            onClick={() => {
              showModal(id);
            }}
          >
            Edit
          </Button>
          <Button
            danger
            loading={deleteArticleLoading}
            onClick={() => handleDelete(id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <ArticleModal
        open={open}
        setOpen={setOpen}
        articleId={articleId}
        setArticleId={setArticleId}
      />
      <Table
        columns={columns}
        dataSource={data}
        bordered={true}
        loading={isLoading}
        rowKey={(record) => record._id}
      />
    </>
  );
};

export default ArticleTable;

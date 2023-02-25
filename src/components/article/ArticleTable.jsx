import React, { useState } from "react";
import { Space, Table, Tag, Button, Input } from "antd";
import ArticleModal from "./ArticleModal";
import {
  useDeleteArticleMutation,
  useGetAllArticlesQuery,
} from "../../service/api.article";
const { Search } = Input;

const ArticleTable = () => {
  const [open, setOpen] = useState(false);
  const [articleId, setArticleId] = useState(null);
  const [filterInput, setFilterInput] = useState("");

  const { data, isLoading } = useGetAllArticlesQuery();
  const [deleteArticle, { isLoading: deleteArticleLoading }] =
    useDeleteArticleMutation();

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
      render: (text) => {
        return <p>{text.slice(0, 300) + "..."}</p>;
      },
    },
    {
      title: "Categories",
      key: "categories",
      dataIndex: "categories",
      render: (_, { categories }) => (
        <>
          {categories?.map((category) => {
            let color = category.length > 5 ? "geekblue" : "green";
            if (category === "music") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={category} className="capitalize">
                {category}
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

  const filterData = () => {
    if (filterInput.trim() === "") {
      return data;
    }
    return data.filter(
      (i) =>
        i.username.toLowerCase().includes(filterInput.toLowerCase().trim()) ||
        i.title.toLowerCase().includes(filterInput.toLowerCase().trim())
    );
  };
  return (
    <>
      <ArticleModal
        open={open}
        setOpen={setOpen}
        articleId={articleId}
        setArticleId={setArticleId}
      />
      <Space className="flex items-end justify-end mb-5">
        <Search
          placeholder="Search text..."
          size="large"
          style={{ minWidth: 350 }}
          onSearch={setFilterInput}
          enterButton
          allowClear
        />
      </Space>
      <Table
        columns={columns}
        dataSource={filterData()}
        bordered={true}
        loading={isLoading}
        rowKey={(record) => record._id}
        pagination={{ pageSize: 10 }}
      />
    </>
  );
};

export default ArticleTable;

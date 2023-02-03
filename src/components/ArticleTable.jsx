import React, { useState } from "react";
import { Space, Table, Tag, Button } from "antd";
import ArticleModal from "./ArticleModal";

const data = [
  {
    key: "1",
    username: "John Brown",
    title: "Lorem Ipsum",
    thumbnailImg:
      "https://images.unsplash.com/photo-1674903745215-0267b9c6baeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDF8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    categories: ["music"],
  },
  {
    key: "2",
    username: "Jim Green",
    title: "Simply Dummy",
    thumbnailImg:
      "https://images.unsplash.com/photo-1674674614404-604aad76d8a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDI2fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    categories: ["movie"],
  },
  {
    key: "3",
    username: "Joe Black",
    title: "Typesetting Industry",
    thumbnailImg:
      "https://images.unsplash.com/photo-1674489450945-af9b6cf9a515?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDM1fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    categories: ["sport", "movie"],
  },
];

const ArticleTable = () => {
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
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
      render: (text) => <span>{text}</span>,
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
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            ghost
            onClick={showModal}
            setOpen={setOpen}
            open={open}
          >
            Edit
          </Button>
          <Button danger>Delete</Button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <ArticleModal open={open} setOpen={setOpen} />
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default ArticleTable;

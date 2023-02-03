import React, { useState } from "react";
import { Space, Table, Button } from "antd";
import CategoryModal from "./CategoryModal";

const data = [
  {
    key: "1",
    id: "1",
    name: "Music",
  },
  {
    key: "2",
    id: "2",
    name: "Movie",
  },
  {
    key: "3",
    id: "3",
    name: "Sport",
  },
];

const CategoryTable = () => {
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
      <CategoryModal open={open} setOpen={setOpen} />
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default CategoryTable;

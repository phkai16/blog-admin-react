import React, { useState } from "react";
import { Space, Table, Tag, Button, Input } from "antd";
import UserModal from "./UserModal";
import { useGetAllUsersQuery } from "../service/user.service";
const { Search } = Input;
const onSearch = (value) => {
  console.log(value);
};

const UserTable = () => {
  const [userId, setUserId] = useState(null);
  const { data, isLoading, isFetching } = useGetAllUsersQuery();
  console.log("userTable", userId);
  // Antd
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (url) => (
        <img
          src={
            url
              ? url
              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
          style={{ height: "100px", width: "100px", objectFit: "cover" }}
          alt=""
        />
      ),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      key: "isAdmin",
      dataIndex: "isAdmin",
      render: (isAdmin) => (
        <Tag color={isAdmin ? "green" : "geekblue"}>
          {isAdmin ? "Admin" : "Client"}
        </Tag>
      ),
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "action",
      render: (_id) => (
        <Space size="middle" key={_id}>
          <Button
            type="primary"
            ghost
            onClick={() => {
              setUserId(_id);
              showModal();
            }}
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
      <UserModal open={open} setOpen={setOpen} userId={userId} />
      <Space direction="vertical" className="flex items-end mb-5">
        <Search
          placeholder="input search text"
          size="large"
          style={{ maxWidth: 500 }}
          onSearch={onSearch}
          enterButton
        />
      </Space>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default UserTable;

import React, { useState } from "react";
import { Space, Table, Tag, Button, Input } from "antd";
import UserModal from "./UserModal";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../../service/api.user";

const { Search } = Input;
const onSearch = (value) => {
  console.log(value);
};

const UserTable = () => {
  const [userId, setUserId] = useState(null);
  const { data, isLoading } = useGetAllUsersQuery();
  const [open, setOpen] = useState(false);
  const [
    deleteUser,
    { isError, isSuccess: deleteUserSuccess, isLoading: deleteUserLoading },
  ] = useDeleteUserMutation();

  const showModal = (id) => {
    setUserId(id);
    setOpen(true);
  };

  const handleDelete = (id) => {
    console.log(id);
    deleteUser(id);
  };

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (url) => (
        <img
          src={
            url ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
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
      render: (id) => (
        <Space size="middle" key={id}>
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
            loading={deleteUserLoading}
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
      <UserModal
        open={open}
        setOpen={setOpen}
        userId={userId}
        setUserId={setUserId}
      />
      <Space direction="vertical" className="flex items-end mb-5">
        <Search
          placeholder="Search text..."
          size="large"
          style={{ minWidth: 500 }}
          onSearch={onSearch}
          enterButton
        />
      </Space>
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

export default UserTable;

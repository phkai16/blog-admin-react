import React, { useState } from "react";
import { Space, Table, Button } from "antd";
import CategoryModal from "./CategoryModal";
import {
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
} from "../../service/api.category";

const CategoryTable = () => {
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const { data, isLoading } = useGetAllCategoriesQuery();
  const [
    deleteCategory,
    { isError, isSuccess, isLoading: deleteCategoryLoading },
  ] = useDeleteCategoryMutation();

  const showModal = (id) => {
    setCategoryId(id);
    setOpen(true);
  };

  const handleDelete = (id) => {
    console.log(id);
    deleteCategory(id);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (_, item) => {
        return <span>{data.indexOf(item) + 1}</span>;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <span className="capitalize">{text}</span>,
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
            loading={deleteCategoryLoading}
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
      <CategoryModal
        open={open}
        setOpen={setOpen}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
      />
      <Table
        columns={columns}
        dataSource={data}
        bordered={true}
        rowKey={(record) => record._id}
        loading={isLoading}
        pagination={{ pageSize: 10 }}
      />
    </>
  );
};

export default CategoryTable;

import React, { useState } from "react";
import { Space, Table, Button, Input } from "antd";
import CategoryModal from "./CategoryModal";
import {
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
} from "../../service/api.category";
const { Search } = Input;

const CategoryTable = () => {
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [filterInput, setFilterInput] = useState("");
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

  const filterData = () => {
    if (filterInput.trim() === "") {
      return data;
    }
    return data.filter((i) =>
      i.name.toLowerCase().includes(filterInput.toLowerCase().trim())
    );
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
        rowKey={(record) => record._id}
        loading={isLoading}
        pagination={{ pageSize: 10 }}
      />
    </>
  );
};

export default CategoryTable;

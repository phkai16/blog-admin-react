import React, { useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";
import { useState } from "react";
import ListSkeleton from "../ListSkeleton";
import {
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from "../../service/api.category";
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const CategoryModal = ({ setOpen, open, categoryId, setCategoryId }) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { data, isSuccess, isError, isLoading } = useGetCategoryQuery(
    categoryId,
    { skip: !categoryId }
  );
  const [
    updateCategory,
    {
      isSuccess: updateCategorySuccess,
      isError: updateCategoryError,
      isLoading: updateCategoryLoading,
    },
  ] = useUpdateCategoryMutation();
  // Antd
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    });
  };
  const handleCancel = () => {
    form.resetFields();
    setCategoryId(null);
    setOpen(false);
  };

  useEffect(() => {
    if (isSuccess) {
      form.setFieldsValue({
        name: data.name,
      });
    }
  }, [isSuccess, isLoading, categoryId]);
  console.log(data);
  const onFinish = (values) => {
    console.log("Success", {
      ...values,
      id: categoryId,
    });
    updateCategory({
      ...values,
      id: categoryId,
    });
    handleCancel();
  };

  return (
    <>
      <Modal
        title="Category Details"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {isLoading && <ListSkeleton itemQuantity={1} className="pt-8" />}
        {!isLoading && (
          <Form
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 16,
            }}
            className="pt-8 pb-4"
          >
            <Form.Item
              label="Category name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input category name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 6,
                span: 16,
              }}
            >
              <Button
                type="primary"
                style={{ minWidth: 100 }}
                ghost
                htmlType="submit"
                loading={updateCategoryLoading}
              >
                Update
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default CategoryModal;

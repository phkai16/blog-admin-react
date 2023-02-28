import React, { useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";
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
  const { data, isSuccess, isLoading } = useGetCategoryQuery(categoryId, {
    skip: !categoryId,
  });
  const [
    updateCategory,
    {
      isSuccess: updateCategorySuccess,
      isError: updateCategoryError,
      isLoading: updateCategoryLoading,
    },
  ] = useUpdateCategoryMutation();

  const handleCancel = () => {
    form.resetFields();
    setCategoryId(null);
    setOpen(false);
  };

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

  useEffect(() => {
    if (isSuccess) {
      form.setFieldsValue({
        name: data.name,
      });
    }
  }, [isSuccess, isLoading, categoryId]);

  return (
    <>
      <Modal
        title="Category Details"
        open={open}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,

          <Button
            type="primary"
            style={{ minWidth: 100 }}
            ghost
            htmlType="submit"
            loading={updateCategoryLoading}
            onClick={() => form.submit()}
          >
            Save changes
          </Button>,
        ]}
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
          </Form>
        )}
      </Modal>
    </>
  );
};

export default CategoryModal;

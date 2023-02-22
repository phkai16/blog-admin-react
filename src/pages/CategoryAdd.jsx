import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import BreadcrumbLink from "../components/BreadcrumbLink";
import ContentLayout from "../components/ContentLayout";
import { useAddCategoryMutation } from "../service/api.category";
import { useNavigate } from "react-router-dom";
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const CategoryAdd = () => {
  const [addCategory, { isError, isLoading, isSuccess }] =
    useAddCategoryMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate("/categories");
    }
  }, [isSuccess]);

  const onFinish = (values) => {
    addCategory(values);
  };

  return (
    <>
      <BreadcrumbLink
        routeList={[{ title: "Category List" }, { title: "Add" }]}
      />
      <ContentLayout>
        <Form
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
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
              loading={isLoading}
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </ContentLayout>
    </>
  );
};

export default CategoryAdd;

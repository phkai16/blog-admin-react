import React from "react";
import { Button, Form, Input } from "antd";
import BreadcrumbLink from "../components/BreadcrumbLink";
import ContentLayout from "../components/ContentLayout";
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const CategoryAdd = () => {
  return (
    <>
      <BreadcrumbLink />
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
            name="username"
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
            <Button type="primary" ghost htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </ContentLayout>
    </>
  );
};

export default CategoryAdd;

import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload } from "antd";
import BreadcrumbLink from "../components/BreadcrumbLink";
import ContentLayout from "../components/ContentLayout";
const { TextArea } = Input;

const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const ArticleAdd = () => {
  return (
    <>
      <BreadcrumbLink />
      <ContentLayout>
        <Form
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 16,
          }}
          layout="horizontal"
          style={{
            maxWidth: 600,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="Thumbnail:" valuePropName="fileList">
            <Upload action="/upload.do" listType="picture-card">
              <div>
                <PlusOutlined />
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload
                </div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input your article's title!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description:"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input your article's description!",
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
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

export default ArticleAdd;

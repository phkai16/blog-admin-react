import React, { useEffect, useState } from "react";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Upload } from "antd";
import BreadcrumbLink from "../components/BreadcrumbLink";
import ContentLayout from "../components/ContentLayout";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAddUserMutation } from "../service/api.user";

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const UserAdd = () => {
  const [loading, setLoading] = useState(false);
  const [addUser, { isError, isLoading, isSuccess }] = useAddUserMutation();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  useEffect(() => {
    if (isSuccess) {
      navigate("/users");
    }
  }, [isSuccess]);
  const handleUpload = (image) => {
    // console.log(image);
    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);
    // for (const value of formData.values()) {
    //   console.log(value);
    // }

    return fetch("http://localhost:5000/api/upload/cloud?image", {
      method: "POST",
      body: formData,
    }).then((res) => {
      setLoading(false);
      return res.json();
    });

    // .finally(() => {
    //   setUploading(false);
    // });
  };
  const props = {
    onRemove: () => {
      setFile(null);
    },
    beforeUpload: async (file) => {
      const uploadedFile = await handleUpload(file);
      if (file) {
        toast.success("Success Upload Avatar!");
        // console.log(file);
        setFile(uploadedFile);
      } else {
        toast.error("Something went wrong...");
      }
      return false;
    },
    file,
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const onFinish = (values) => {
    addUser({
      ...values,
      avatar: file,
    });
  };

  return (
    <>
      {/* <BreadcrumbLink link="users/add" title="User Add" /> */}
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
          <Form.Item label="Avatar:" name="avatar" valuePropName="file">
            <Upload {...props} maxCount={1} listType="picture-card">
              {uploadButton}
            </Upload>
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
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Is Admin:" name="isAdmin" valuePropName="checked">
            <Checkbox></Checkbox>
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
              disabled={loading}
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </ContentLayout>
    </>
  );
};

export default UserAdd;

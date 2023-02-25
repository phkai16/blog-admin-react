import React, { useEffect, useState } from "react";
import { Modal, Checkbox, Form, Input, Upload, Image, Button } from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import moment from "moment";
import toast from "react-hot-toast";
import { useGetUserQuery, useUpdateUserMutation } from "../../service/api.user";
import ListSkeleton from "../ListSkeleton";
import { BASE_URL } from "../../utils/globalVariable";
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const UserModal = ({ setOpen, open, userId, setUserId }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [form] = Form.useForm();
  const { data, isSuccess, isLoading } = useGetUserQuery(userId, {
    skip: !userId,
  });
  const [
    updateUser,
    {
      isSuccess: updateUserSuccess,

      isLoading: updateUserLoading,
    },
  ] = useUpdateUserMutation();

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    });
  };

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
    setUserId(null);
  };

  // upload
  const handleUpload = (image) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);
    return fetch(`${BASE_URL}/api/upload/cloud?image`, {
      method: "POST",
      body: formData,
    }).then((res) => {
      setLoading(false);
      return res.json();
    });
  };
  const props = {
    onRemove: () => {
      setFile(null);
    },
    beforeUpload: async (file) => {
      const uploadedFile = await handleUpload(file);
      if (file) {
        toast.success("Success Upload Avatar!");
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

  useEffect(() => {
    if (isSuccess) {
      form.setFieldsValue({
        username: data.username,
        email: data.email,
        profilePic:
          data.avatar ||
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        isAdmin: data.isAdmin,
        created: moment(data.createdAt).format("MMM Do YY").toString(),
        updated: moment(data.updatedAt).format("MMM Do YY").toString(),
      });
    }
  }, [isSuccess, isLoading, userId, updateUserSuccess]);

  const onFinish = (values) => {
    updateUser({
      ...values,
      avatar: file !== null ? file : data.avatar,
      id: userId,
    })
      .unwrap()

      .then((res) => {
        handleCancel();
        toast.success("User updated!");
      })
      .catch((err) => toast.error("Something went wrong..."));
  };

  return (
    <>
      <Modal
        title="User Details"
        open={open}
        onOk={handleOk}
        okText="OK"
        confirmLoading={confirmLoading}
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
            loading={updateUserLoading}
            disabled={loading}
            onClick={() => form.submit()}
          >
            Save changes
          </Button>,
        ]}
      >
        {!isLoading && (
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
            className="pt-12"
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <div className="flex ml-6 gap-2">
              <Form.Item name="profilePic" valuePropName="src">
                <Image
                  width={100}
                  height={100}
                  style={{ objectFit: "cover" }}
                />
              </Form.Item>
              <Form.Item name="avatar" valuePropName="file">
                <Upload {...props} maxCount={1} listType="picture-card">
                  {uploadButton}
                </Upload>
              </Form.Item>
            </div>
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
            <Form.Item label="Created At:" name="created">
              <Input disabled={true} />
            </Form.Item>
            <Form.Item label="Update At:" name="updated">
              <Input disabled={true} />
            </Form.Item>

            <Form.Item label="Is Admin:" name="isAdmin" valuePropName="checked">
              <Checkbox></Checkbox>
            </Form.Item>
            {/* <Form.Item
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
                loading={updateUserLoading}
                disabled={loading}
              >
                Update
              </Button>
            </Form.Item> */}
          </Form>
        )}
        {isLoading && <ListSkeleton itemQuantity={1} className="pt-12" />}
      </Modal>
    </>
  );
};

export default UserModal;

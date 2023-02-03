import React, { useEffect } from "react";
import { Modal, Checkbox, Form, Input, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { DatePicker, Space } from "antd";
import { Image } from "antd";
import { useGetUserQuery } from "../service/user.service";
// Antd
const onChange = (date, dateString) => {
  console.log(date, dateString);
};

const UserModal = ({ setOpen, open, userId }) => {
  const [form] = Form.useForm();
  const { data, isSuccess, isError, isLoading, isFetching } = useGetUserQuery(
    userId,
    { skip: !userId }
  );
  console.log("userModal", userId);
  // const { data, isSucess, isError } = useGetUserQuery(userId);

  console.log("userModal", data);
  useEffect(() => {
    if (isSuccess) {
      form.setFieldsValue({
        username: data.username,
        email: data.email,
        avatar: data.avatar,
        isAdmin: data.isAdmin,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      });
    }
  }, [isSuccess, isLoading]);

  // Antd
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  return (
    <>
      <Modal
        title="User Details"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
        <Form
          form={form}
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
        >
          <div className="flex ml-6 gap-5">
            <Form.Item name="avatar">
              <Image
                width={100}
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              />
            </Form.Item>
            <Form.Item valuePropName="fileList">
              <Upload action="" listType="picture-card">
                <div>
                  <PlusOutlined />
                  <div>Upload:</div>
                </div>
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

          <Form.Item label="Created" name="created">
            <Space direction="vertical">
              <DatePicker onChange={onChange} />
            </Space>
          </Form.Item>
          <Form.Item label="Updated" name="updated">
            <Space direction="vertical">
              <DatePicker onChange={onChange} />
            </Space>
          </Form.Item>

          <Form.Item label="Is Admin:" name="isAdmin" valuePropName="checked">
            <Checkbox></Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserModal;

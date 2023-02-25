import React, { useEffect, useState } from "react";
import { Checkbox, Form, Input, Upload, Image, Button } from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import moment from "moment";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import ListSkeleton from "../components/ListSkeleton";
import BreadcrumbLink from "../components/BreadcrumbLink";
import ContentLayout from "../components/ContentLayout";
import { useUpdateUserMutation } from "../service/api.user";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/globalVariable";
import { updateProfile } from "../redux/user.slice";
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [form] = Form.useForm();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log("profile", user.id);

  const [updateUser, { isSuccess, isLoading }] = useUpdateUserMutation();

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

  // submit
  const onFinish = (values) => {
    console.log({
      ...values,
      avatar: file !== null ? file : user.avatar,
      id: user.id,
    });
    updateUser({
      ...values,
      avatar: file !== null ? file : user.avatar,
      id: user.id,
    })
      .unwrap()
      .then((res) => {
        dispatch(updateProfile(res));
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to update");
      });
  };

  useEffect(() => {
    form.setFieldsValue({
      username: user.username,
      email: user.email,
      profilePic:
        user.avatar ||
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      isAdmin: user.isAdmin,
      created: moment(user.createdAt).format("MMM Do YY").toString(),
      updated: moment(user.updatedAt).format("MMM Do YY").toString(),
    });
  }, [JSON.stringify(user)]);
  // useEffect(() => {
  //   if (isSuccess) {
  //     // navigate(0);
  //   }
  // }, [isSuccess]);

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
          className="pt-12"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <div className="flex gap-20">
            <div className="flex flex-col ml-6 gap-2">
              <Form.Item name="profilePic" valuePropName="src">
                <Image
                  width={200}
                  height={200}
                  style={{ objectFit: "cover" }}
                />
              </Form.Item>
              <Form.Item name="avatar" valuePropName="file">
                <Upload {...props} maxCount={1} listType="picture-card">
                  {uploadButton}
                </Upload>
              </Form.Item>
            </div>
            <div className="w-1/3">
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
              <Form.Item
                label="Is Admin:"
                name="isAdmin"
                valuePropName="checked"
              >
                <Checkbox></Checkbox>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  style={{ minWidth: 100 }}
                  ghost
                  htmlType="submit"
                  loading={isLoading}
                  disabled={loading}
                >
                  Update
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </ContentLayout>
    </>
  );
};

export default Profile;

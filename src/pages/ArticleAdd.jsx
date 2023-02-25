import React, { useEffect, useState } from "react";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload } from "antd";
import BreadcrumbLink from "../components/BreadcrumbLink";
import ContentLayout from "../components/ContentLayout";
import { useNavigate } from "react-router-dom";
import { useAddArticleMutation } from "../service/api.article";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useGetAllCategoriesQuery } from "../service/api.category";
import { useGetAllUsersQuery } from "../service/api.user";
import { BASE_URL } from "../utils/globalVariable";

const { TextArea } = Input;
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const ArticleAdd = () => {
  const [loading, setLoading] = useState(false);
  const { data: categoryList, isLoading: getAllCategoriesLoading } =
    useGetAllCategoriesQuery();
  const { data: userList, isLoading: getAllUsersLoading } =
    useGetAllUsersQuery();
  const [addArticle, { isLoading, isSuccess }] = useAddArticleMutation();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  // categories
  const CATEGORIES = categoryList || [];
  const handleChangeCategory = (categories) => {
    console.log(`selected ${categories}`);
  };
  // username
  const USERS = userList || [];

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
        toast.success("Success Upload Thumbnail Image!");
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
    addArticle({
      ...values,
      thumbnailImg: file,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/articles");
    }
  }, [isSuccess]);
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
          <Form.Item
            label="Thumbnail:"
            name="thumbnailImg"
            valuePropName="file"
          >
            <Upload {...props} maxCount={1} listType="picture-card">
              {uploadButton}
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
          <Form.Item label="Username" name="username">
            <Select
              showSearch
              loading={getAllUsersLoading}
              style={{
                width: 200,
              }}
              placeholder="Search to Author"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={USERS.map((item) => ({
                value: item.username,
                label: item.username,
              }))}
              defaultValue={{
                value: USERS[0]?.username,
                label: USERS[0]?.username,
              }}
            />
          </Form.Item>

          <Form.Item label="Categories" name="categories">
            <Select
              loading={getAllCategoriesLoading}
              mode="multiple"
              placeholder="Inserted are removed"
              defaultValue={CATEGORIES?.slice(0, 2)?.map((item) => ({
                value: item.name,
                label: item.name,
              }))}
              onChange={handleChangeCategory()}
              style={{
                width: "100%",
              }}
              options={CATEGORIES?.map((item) => ({
                value: item.name,
                label: item.name,
              }))}
            />
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

export default ArticleAdd;

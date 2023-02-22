import React, { useEffect, useState } from "react";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload } from "antd";
import BreadcrumbLink from "../components/BreadcrumbLink";
import ContentLayout from "../components/ContentLayout";
import { useNavigate } from "react-router-dom";
import { useAddArticleMutation } from "../service/api.article";
import toast from "react-hot-toast";
import { Select, Space } from "antd";
import { useGetAllCategoriesQuery } from "../service/api.category";

const { TextArea } = Input;
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const ArticleAdd = () => {
  const [loading, setLoading] = useState(false);
  const { data, isLoading: getAllCategoriesLoading } =
    useGetAllCategoriesQuery();
  const [addArticle, { isError, isLoading, isSuccess }] =
    useAddArticleMutation();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  let options = [];
  useEffect(() => {
    if (isSuccess) {
      navigate("/articles");
    }
  }, [isSuccess]);
  // categories
  // const options = [];
  // for (let i = 10; i < 36; i++) {
  //   options.push({
  //     label: i.toString(36) + i,
  //     value: i.toString(36) + i,
  //   });
  // }
  console.log(data);

  const CATEGORIES = [
    {
      _id: "63d8c9613ba58146173ebfef",
      name: "music",
      createdAt: "2023-01-31T07:55:13.918Z",
      updatedAt: "2023-02-16T04:51:11.125Z",
      __v: 0,
    },
    {
      _id: "63e214c013124543c307f2ef",
      name: "movie",
      createdAt: "2023-02-07T09:07:12.601Z",
      updatedAt: "2023-02-07T09:07:12.601Z",
      __v: 0,
    },
    {
      _id: "63e214c713124543c307f2f1",
      name: "sport",
      createdAt: "2023-02-07T09:07:19.725Z",
      updatedAt: "2023-02-07T09:07:19.725Z",
      __v: 0,
    },
    {
      _id: "63edf10191061e954325b1da",
      name: "animal",
      createdAt: "2023-02-16T09:01:53.115Z",
      updatedAt: "2023-02-16T09:01:53.115Z",
      __v: 0,
    },
  ];
  const handleChange = (categories) => {
    console.log(`selected ${categories}`);
  };
  // upload
  const handleUpload = (image) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);
    return fetch("http://localhost:5000/api/upload/cloud?image", {
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
    addArticle({
      ...values,
      thumbnailImg: file,
    });
  };
  return (
    <>
      {/* <BreadcrumbLink link="articles/add" title="Articles Add" /> */}
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
          <Form.Item label="Categories" name="categories">
            <Select
              mode="multiple"
              placeholder="Inserted are removed"
              defaultValue={"music"}
              onChange={handleChange()}
              style={{
                width: "100%",
              }}
              options={CATEGORIES.map((item) => ({
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

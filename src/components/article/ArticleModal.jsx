import React, { useEffect } from "react";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { Form, Input, Upload, Modal, Image, Button, Select } from "antd";
import { useState } from "react";
import {
  useGetArticleQuery,
  useUpdateArticleMutation,
} from "../../service/api.article";
import moment from "moment";
import toast from "react-hot-toast";
import { useGetAllCategoriesQuery } from "../../service/api.category";
import { useGetAllUsersQuery } from "../../service/api.user";
import { BASE_URL } from "../../utils/globalVariable";

const { TextArea } = Input;
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const ArticleModal = ({ setOpen, open, articleId, setArticleId }) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const { data: categoryList, isLoading: getAllCategoriesLoading } =
    useGetAllCategoriesQuery();
  const { data: userList, isLoading: getAllUsersLoading } =
    useGetAllUsersQuery();
  const { data, isSuccess, isLoading } = useGetArticleQuery(articleId, {
    skip: !articleId,
  });
  const [updateArticle, { isLoading: updateArticleLoading }] =
    useUpdateArticleMutation();
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    });
  };
  const handleCancel = () => {
    form.resetFields();
    setArticleId(null);
    setOpen(false);
  };
  // categories
  const CATEGORIES = categoryList;
  const handleChangeCategory = (categories) => {
    console.log(`selected ${categories}`);
  };
  // users
  const USERS = userList;
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
    updateArticle({
      ...values,
      thumbnailImg: file !== null ? file : data.thumbnailImg,
      id: articleId,
    });
    handleCancel();
  };

  useEffect(() => {
    if (isSuccess) {
      form.setFieldsValue({
        title: data.title,
        description: data.description,
        articlePic:
          data.thumbnailImg ||
          "https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png",
        username: data.username,
        created: moment(data.createdAt).format("MMM Do YY").toString(),
        updated: moment(data.updatedAt).format("MMM Do YY").toString(),
        categories: data.categories?.map((item) => ({
          value: item,
          label: item,
        })),
      });
    }
  }, [isSuccess, isLoading, articleId]);

  return (
    <>
      <Modal
        title="Article Details"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={700}
      >
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 16,
          }}
          layout="horizontal"
          className="w-100 my-10"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <div className="flex ml-6 gap-5">
            <Form.Item name="articlePic" valuePropName="src">
              <Image width={200} height={100} style={{ objectFit: "cover" }} />
            </Form.Item>
            <Form.Item name="thumbnailImg" valuePropName="file">
              <Upload {...props} maxCount={1} listType="picture-card">
                {uploadButton}
              </Upload>
            </Form.Item>
          </div>
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
          <Form.Item label="Categories" name="categories">
            <Select
              loading={getAllCategoriesLoading}
              mode="multiple"
              placeholder="Inserted are removed"
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
              options={USERS?.map((item) => ({
                value: item.username,
                label: item.username,
              }))}
            />
          </Form.Item>
          <Form.Item label="Created At:" name="created">
            <Input disabled={true} />
          </Form.Item>
          <Form.Item label="Update At:" name="updated">
            <Input disabled={true} />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 4,
              span: 16,
            }}
          >
            <Button
              type="primary"
              style={{ minWidth: 120 }}
              ghost
              htmlType="submit"
              loading={updateArticleLoading}
              disabled={loading}
            >
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ArticleModal;

import React, { useEffect } from "react";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { Form, Input, Upload, Modal, Image, Button } from "antd";
import { useState } from "react";
import {
  useGetArticleQuery,
  useUpdateArticleMutation,
} from "../../service/api.article";
import moment from "moment";
import toast from "react-hot-toast";
import { useUpdateCategoryMutation } from "../../service/api.category";

const { TextArea } = Input;
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const ArticleModal = ({ setOpen, open, articleId, setArticleId }) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const { data, isSuccess, isError, isLoading } = useGetArticleQuery(
    articleId,
    { skip: !articleId }
  );
  const [
    updateArticle,
    {
      isSuccess: updateArticleSuccess,
      isError: updateArticleError,
      isLoading: updateArticleLoading,
    },
  ] = useUpdateArticleMutation();
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
      });
    }
  }, [isSuccess, isLoading, articleId]);
  console.log(data);
  const onFinish = (values) => {
    console.log("Success", {
      ...values,
      thumbnailImg: file !== null ? file : data.thumbnailImg,
      id: articleId,
    });
    updateArticle({
      ...values,
      thumbnailImg: file !== null ? file : data.thumbnailImg,
      id: articleId,
    });
    handleCancel();
  };
  return (
    <>
      <Modal
        title="Article Details"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 16,
          }}
          layout="horizontal"
          className="w-100"
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
          <Form.Item label="Created At:" name="created">
            <Input disabled={true} />
          </Form.Item>
          <Form.Item label="Update At:" name="updated">
            <Input disabled={true} />
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

import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../service/api.user";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import Cookies from "universal-cookie";
const Login = () => {
  const { token, isAuthenticated } = useSelector((state) => state.user);
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = (values) => {
    login(values)
      .unwrap()
      .then((res) => {
        cookies.set("token", res.accessToken, {
          path: "/",
          expires: new Date(Date.now() + 259200),
        });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to login");
      });
  };

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/users");
    }
  }, [isAuthenticated]);
  return (
    <>
      <div className="relative w-screen h-screen">
        <div
          className="absolute top-0 left-0 w-full h-full bg-primary"
          style={{ clipPath: "polygon(0% 0%, 100% 0, 100% 20%, 0 80%)" }}
        ></div>
        <div className="absolute top-0 left-0 right-0 w-full h-full flex justify-center items-center">
          <div
            className="flex flex-col justify-center items-center h-96 bg-white rounded-lg px-40 py-60 shadow-lg"
            style={{
              width: "500px",
            }}
          >
            <img src="/logo.png" alt="" className="h-32" />
            <h1 className="mb-10 text-center font-semibold text-primary w-60">
              Bloggie Admin
            </h1>
            <Form
              name="basic"
              style={{
                width: 350,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input
                  size="large"
                  prefix={<UserOutlined className="site-form-item-icon mr-4" />}
                  placeholder="Username"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Password"
                  prefix={<LockOutlined className="site-form-item-icon mr-4" />}
                />
              </Form.Item>

              <Form.Item
                style={{
                  width: 350,
                }}
              >
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  size="large"
                  loading={isLoading}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

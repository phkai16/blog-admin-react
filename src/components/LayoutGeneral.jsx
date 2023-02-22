import React, { useEffect } from "react";
import {
  LaptopOutlined,
  ProfileOutlined,
  UserOutlined,
  FolderOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useVerifyMutation } from "../service/api.user";
// import { setCredentials, clearCredentials } from "../redux/user.slice";
import { useCookies } from "react-cookie";
import { setCredentials, clearCredentials } from "../redux/user.slice";

const { Header, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    label,
    key,
    icon,
    children,
  };
}

const items1 = [
  getItem("User", "1"),
  getItem("Category", "3"),
  getItem("Article", "5"),
];

const keyLink = {
  1: "/users",
  2: "/users/add",
  3: "/categories",
  4: "/categories/add",
  5: "/articles",
  6: "/articles/add",
};
const LayoutGeneral = () => {
  // const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [verify] = useVerifyMutation();
  const navigate = useNavigate();
  const [cookies, removeCookie, setCookie] = useCookies(["token"]);
  const token = useSelector((state) => state.user.token);

  const handleLogout = () => {
    removeCookie("token");
    dispatch(clearCredentials());
    // navigate("/login");
  };

  const handleNavigate = (number) => {
    keyLink[number] && navigate(`${keyLink[number]}`);
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      verify()
        .unwrap()
        .then((data) => {
          setCookie("token", data.accessToken, {
            path: "/",
            expires: new Date(Date.now() + 259200),
          });
          dispatch(
            setCredentials({
              token: data.accessToken,
            })
          );
        })
        .catch((rejected) => {
          console.error(rejected);
          handleLogout();
        });
    }
  }, []);

  const items2 = [
    getItem("User", "sub1", <UserOutlined />, [
      getItem("List", "1"),
      getItem("Add", "2"),
    ]),

    getItem("Category", "sub2", <FolderOutlined />, [
      getItem("List", "3"),
      getItem("Add", "4"),
    ]),

    getItem("Article", "sub3", <LaptopOutlined />, [
      getItem("List", "5"),
      getItem("Add", "6"),
    ]),
    getItem("Profile", "7", <ProfileOutlined />),
    getItem(
      <span onClick={() => handleLogout()}>Log out</span>,
      "8",
      <LogoutOutlined />
    ),
  ];
  return (
    <Layout className="max-w-screen min-h-screen">
      <Header className="header flex justify-between items-center">
        <Link to="/users">
          <div className="text-white text-2xl font-semibold">Blog Admin</div>
        </Link>
        <Menu
          theme="dark"
          mode="horizontal"
          items={items1}
          onClick={(e) => handleNavigate(e.key)}
        />
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{
              height: "100%",
              borderRight: 0,
            }}
            items={items2}
            onClick={(e) => handleNavigate(e.key)}
          />
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Outlet />
        </Layout>
      </Layout>
      <Toaster />
    </Layout>
  );
};

export default LayoutGeneral;

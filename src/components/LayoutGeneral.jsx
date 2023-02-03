import React from "react";
import {
  LaptopOutlined,
  ProfileOutlined,
  UserOutlined,
  FolderOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
  getItem("Log out", "8", <LogoutOutlined />),
];

const LayoutGeneral = () => {
  const navigate = useNavigate();
  const keyLink = {
    1: "/users",
    2: "/users/add",
    3: "/categories",
    4: "/categories/add",
    5: "/articles",
    6: "/articles/add",
  };
  const handleNavigate = (number) => {
    keyLink && navigate(`${keyLink[number]}`);
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="max-w-screen min-h-screen">
      <Header className="header flex justify-between items-center">
        <div className="text-white text-2xl font-semibold">Blog Admin</div>
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
    </Layout>
  );
};

export default LayoutGeneral;

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
import { clearCredentials, setCredentials } from "../redux/user.slice";
import Cookies from "universal-cookie";

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
  7: "/profile",
};
const LayoutGeneral = () => {
  const dispatch = useDispatch();
  const [verify] = useVerifyMutation();
  const navigate = useNavigate();
  const cookies = new Cookies();

  const { token, isAuthenticated } = useSelector((state) => state.user);
  const user = useSelector((state) => state.user);
  console.log(user);

  const handleLogout = () => {
    cookies.remove("token");
    dispatch(clearCredentials());
    // dispatch(clearUserInfo());
  };

  const handleNavigate = (number) => {
    keyLink[number] && navigate(`${keyLink[number]}`);
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (token) {
      verify()
        .unwrap()
        .then((data) => {
          cookies.set("token", data.accessToken, {
            path: "/",
            expires: new Date(Date.now() + 259200),
          });
          console.log("layout", data);
        })
        .catch((rejected) => {
          console.error(rejected);
          handleLogout();
        });
    } else {
      const cookieToken = cookies.get("token");
      if (cookieToken) {
        dispatch(setCredentials({ accessToken: cookieToken }));
      } else {
        handleLogout();
      }
    }
  }, [token]);

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
      <Header
        className="header flex justify-between items-center"
        style={{ paddingInline: "24px", height: "80px" }}
      >
        <Link to="/users">
          <div className="flex items-center justify-center">
            <img src="/logo.png" alt="" className="h-8" />
            <h2 className="text-white text-xl font-semibold] mb-0">
              Bloggie Admin
            </h2>
          </div>
        </Link>

        <div className="flex items-center">
          <Link to="/profile">
            {user.avatar && (
              <img
                class="w-10 h-10 rounded-full"
                src={user.avatar}
                alt="Rounded avatar"
              ></img>
            )}
            {!user.avatar && (
              <div class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <svg
                  class="absolute w-12 h-12 text-gray-400 -left-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            )}
          </Link>
          <p className="text-white ml-2 mb-0 capitalize">
            Welcome, {user.username}
          </p>
        </div>
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

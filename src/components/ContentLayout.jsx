import React from "react";
import { Layout, theme } from "antd";

const { Content } = Layout;
const ContentLayout = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Content
      style={{
        padding: 24,
        margin: 0,
        minHeight: 280,
        background: colorBgContainer,
      }}
    >
      {children}
    </Content>
  );
};

export default ContentLayout;

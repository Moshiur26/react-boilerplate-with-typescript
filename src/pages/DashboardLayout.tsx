import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import DashboardHeader from "@/layouts/DashboardHeader";
import DashboardSidebar from "@/layouts/DashboardSidebar";

const { Header, Sider, Content } = Layout;

const MIN_SIZE = 80;
const MAX_SIZE = 260;
const MIN_WIDTH = `calc(100% - ${MIN_SIZE}px)`;
const MAX_WIDTH = `calc(100% - ${MAX_SIZE}px)`;

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  console.log("collapsed", collapsed);
  const onHandleCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };
  return (
    <Layout className="min-h-screen" hasSider>
      <Sider
        width={MAX_SIZE}
        collapsible
        collapsed={collapsed}
        onCollapse={onHandleCollapse}
        className=" dashborad-sidebar"
      >
        <DashboardSidebar collapsed={collapsed} />
      </Sider>
      <Layout
        style={{ marginLeft: collapsed ? `${MIN_SIZE}px` : `${MAX_SIZE}px` }}
      >
        <Header
          className="bg-white shadow z-10 fixed top-0"
          style={{
            width: collapsed ? MIN_WIDTH : MAX_WIDTH,
          }}
        >
          <DashboardHeader />
        </Header>
        <Content className="mt-20 mx-4">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;

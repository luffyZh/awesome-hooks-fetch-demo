import React, { ReactNode } from 'react';
import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined, PullRequestOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

type Props = {
  children?: ReactNode
  title?: string
}

const CustomLayout = ({ children, title }: Props) => (
  <Layout style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0 }}>
    <Sider
      theme="light"
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={broken => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      style={{ width: 260, minWidth: 260 }}
    >
      <style jsx>{`
        .logo {
          height: 64px;
          background: #1890ff;
        }
      `}</style>
      <div className="logo"></div>
      <Menu mode="inline" defaultSelectedKeys={['home']}>
        <Menu.Item key="home" icon={<UserOutlined />}>
          Home
        </Menu.Item>
        <Menu.Item key="basic_list" icon={<VideoCameraOutlined />}>
          Basic List
        </Menu.Item>
        <Menu.Item key="abort_list" icon={<PullRequestOutlined />}>
          Abort List
        </Menu.Item>
        <Menu.Item key="page_list" icon={<UploadOutlined />}>
          Page List
        </Menu.Item>
        <Menu.Item key="load_more" icon={<UserOutlined />}>
          Load More
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout>
      <Header style={{ paddingLeft: 20, background: '#fff', color: '#222' }}>
        <h2>{title}</h2>
      </Header>
      <Content style={{ margin: '24px 16px 0', overflow: 'auto' }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Use Fetch Data</Footer>
    </Layout>
  </Layout>
)

export default CustomLayout;

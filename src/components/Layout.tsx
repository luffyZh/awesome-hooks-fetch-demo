import React, { ReactNode } from 'react';
import Router, { useRouter } from 'next/router';
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
          display: flex;
          justify-content: center;
          align-items: center;
          height: 64px;
          background: #1890ff;
        }

        .logo a {
          color: #fff;
          font-size: 18px;
          font-weight: 600;
        }
      `}</style>
      <div className="logo"><a href="https://github.com/luffyZh" target="_blank">Go to luffyZh</a></div>
      <Menu
        mode="inline"
        defaultSelectedKeys={[useRouter().pathname || '/']}
        onClick={(e: any) => {
          Router.push(e.key);
        }}
      >
        <Menu.Item key="/" icon={<UserOutlined />}>
          Home
        </Menu.Item>
        <Menu.Item key="/basic" icon={<VideoCameraOutlined />}>
          Basic List
        </Menu.Item>
        <Menu.Item key="/abort" icon={<PullRequestOutlined />}>
          Abort List
        </Menu.Item>
        <Menu.Item key="/page" icon={<UploadOutlined />}>
          Page List
        </Menu.Item>
        <Menu.Item key="/load-more" icon={<UserOutlined />}>
          Load More
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout>
      <Header style={{ paddingLeft: 20, background: '#fff', color: '#222' }}>
        <h2>{title}</h2>
      </Header>
      <Content style={{ margin: '24px 16px 0', overflow: 'auto', background: '#fff' }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>🌞 Use Fetch Data 🪐</Footer>
    </Layout>
  </Layout>
)

export default CustomLayout;

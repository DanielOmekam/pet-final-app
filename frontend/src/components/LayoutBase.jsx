import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

function LayoutBase() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ color: '#fff', fontSize: '1.5rem', marginRight: '2rem' }}>
          Pet Review MVP
        </div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']}>
          <Menu.Item key="home" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="login" icon={<UserOutlined />}>
            <Link to="/login">Login</Link>
          </Menu.Item>
          <Menu.Item key="register">
            <Link to="/register">Register</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '1rem' }}>
        <Outlet />
      </Content>
      <Footer style={{ textAlign: 'center' }}>Pet Review MVP ©2025</Footer>
    </Layout>
  );
}

export default LayoutBase;

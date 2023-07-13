import React from "react";
import { Layout, Col, Row, Menu } from 'antd';
import CityMap from "./CityMap";

const { Header, Footer, Content } = Layout;

const App = () => (
  <Layout>
    <Header style={{ display: 'flex', alignItems: 'center' }}>
      <h1>Weather App</h1>
      <Menu
        theme="dark"
        mode="horizontal"
        items={['Rails 7 Demo'].map((label, idx) => {
          return {
            label,
            key: idx,
          };
        })}
      />
    </Header>
    <Content>
      <CityMap />
    </Content>
    <Footer>
      <p>Copyright @TBA 2023</p>
    </Footer>
  </Layout>
);

export default App;

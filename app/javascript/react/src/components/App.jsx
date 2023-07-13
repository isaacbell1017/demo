/*
Rendered Components
  Layout: The main layout component from the antd library. It contains the Header, Content, and Footer components.
  Header: The header of the layout. It contains a title and a menu.
  Menu: The menu component from the antd library. It has a single item labeled "Rails 7 Demo".
  Content: The content of the layout. It contains the CityMap component.
  CityMap: See the CityMap component.
  Footer: The footer of the layout. It contains a copyright notice.
*/

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

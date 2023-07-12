import React from "react";
import { Layout, Col, Row } from 'antd';
import CityMap from "./CityMap";

const { Header, Footer, Content } = Layout;

const App = () => (
  <Layout>
    <Header>
      <h1>Weather App</h1>
    </Header>
    <Content>
      <div id="map" style={{height: '500px'}}></div>
      <CityMap />
    </Content>
    <Footer>
      <p>Copyright @TBA 2023</p>
    </Footer>
  </Layout>
);

export default App;

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
      <h1>asdfda</h1>
      {/* <div id="map"></div> */}
      <CityMap />
    </Content>
    <Footer>
      <p>Copyright @TBA 2023</p>
    </Footer>
  </Layout>
);

export default App;

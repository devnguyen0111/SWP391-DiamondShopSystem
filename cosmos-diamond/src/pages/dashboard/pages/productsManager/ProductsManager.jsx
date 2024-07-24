import { Tabs } from "antd";
import "./ProductsManager.scss";
import TabPane from "antd/es/tabs/TabPane";
import StoreProducts from "./storeProducts/StoreProducts";
import CustomerProducts from "./customerProducts/CustomerProducts";

function ProductsManager() {
  return (
    <div className="mode1">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Store Products" key="1">
          <StoreProducts />
        </TabPane>
        <TabPane tab="Customer Products" key="2">
          <CustomerProducts />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default ProductsManager;

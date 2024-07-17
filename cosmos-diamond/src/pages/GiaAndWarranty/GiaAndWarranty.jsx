import { useEffect, useState } from "react";
import { apiHeader } from "./../../components/urlApiHeader";
import GiaReport from "../../components/GIAreport/GiaReport";
import { scales } from "chart.js";
import GiaReportSmall from "../../components/GIAreport/GiaReportSmall";
import { Button, Col, Flex, Row } from "antd";
import WarrantyCertificate from "../../components/warrantyCertificate/WarrantyCertificate";

function GiaAndWarranty() {
  const [productList, setProductList] = useState([]);
  const [order, setOrder] = useState();
  const fetchOrderId = async () => {
    let location = window.location.href;
    let orderId = location.slice(
      location.lastIndexOf("/") + 1,
      location.length
    );
    fetch(`${apiHeader}/Order/getOrderDetail?orderId=${orderId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrder(data);
        data.items.$values.forEach((product) => {
          fecthProducts(product.pId);
        });
      });
  };
  const fecthProducts = (pId) => {
    fetch(`${apiHeader}/Product/productDetail/${pId}`)
      .then((res) => res.json())
      .then((data) => {
        setProductList((pre) => [...pre, data]);
      });
  };
  useEffect(() => {
    fetchOrderId();
  }, []);
  return (
    <div className="" style={{ backgroundColor: "#f5f3ef" }}>
      <div
        style={{
          maxWidth: "1840px",
          padding: "0 100px 0 100px",
        }}
      >
        {productList &&
          productList.map((p) => (
            <div style={{ width: "auto", height: "auto" }}>
              <Row gutter={50} style={{ width: "100%", padding: "100px 20px 50px 20px ", backgroundColor: '#fff', marginTop:'50px' }}>
                <Col span={10}>
                  <GiaReportSmall product={p} />
                </Col>
                <Col offset={1}>
                  {order && <WarrantyCertificate order={order} product={p}/>}
                </Col>
              </Row>
            </div>
          ))}
      </div>
    </div>
  );
}

export default GiaAndWarranty;

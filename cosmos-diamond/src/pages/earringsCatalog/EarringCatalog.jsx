import { useEffect, useState, useCallback } from "react";
import Banner from "../../components/banner/Banner";
import SettingDropDownGroup from "../../components/sortSettingDropdownButton/sortSettingDropDownButton";
import { Col, Divider, Flex, Row, Select, Spin, Pagination, Input, Empty } from "antd";
import { Link } from "react-router-dom";
import { apiHeader } from "../../components/urlApiHeader";
import { LoadingOutlined } from "@ant-design/icons";

function EarringCatalog() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(16);
  const [amount, setAmount] = useState(1);
  const [earringList, setEarringList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [metalType, setMetalType] = useState([]);
  const [size, setSize] = useState([]);
  const [shape, setShape] = useState([]);
  const [order, setOrder] = useState("desc");
  const [price, setPrice] = useState([0, 50000]);
  const [search, setSearch] = useState("");
  const fetchEarrings = async (reset = false) => {
    setLoading(true);
    try {
      let urlSize = size.map((s) => `sizeIds=${s}`).join("&");
      let urlMetal = metalType.map((m) => `metaltypeIds=${m}`).join("&");
      let urlShape = shape.map((shape) => `diamondShapes=${shape}`).join("&");
      let url = `${apiHeader}/Product/getFilteredProductAd?categoryId=3&subCategoryId=3&${urlSize}&${urlMetal}&${urlShape}&pageNumber=${pageNumber}&pageSize=${pageSize}&minPrice=${price[0]}&maxPrice=${price[1]}&sortOrder=${order}&diamondCode=${search}`;
      console.log(url);
      const res = await fetch(url);
      const data = await res.json();
      setAmount(data.totalProduct);
      setEarringList(data.filteredProducts1.$values);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEarrings();
  }, [pageNumber]);

  useEffect(() => {
    setEarringList([]);
    setPageNumber(1);
    fetchEarrings(true);
  }, [size, metalType, shape, price, order, search]);

  const handleOrder = (value) => {
    setOrder(value);
  };

  const handlePageChange = (page, pageSize) => {
    setPageNumber(page);
    setPageSize(pageSize);
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <Banner
        intro="Make Every Moment Special"
        title="EARRINGS"
        subtitle="Sparkling diamond earrings are the perfect jewelry for any look. From teardrop diamond sets and elegant diamond studs to intricately embellished hoops, our splendid diamond earrings can brighten any collection. Explore our popular real diamond earrings for women and men for any budget, style and occasion."
        bg="https://dam.bluenile.com/images/public/21527/Design Your Own Earrings.jpeg"
        buttons={["Craft Your Earrings"]}
      />
      <Flex style={{ marginTop: "100px" }}>
        <SettingDropDownGroup
          size={{ size, setSize }}
          metalType={{ metalType, setMetalType }}
          shape={{ shape, setShape }}
          category={3}
          price={price}
          setPrice={setPrice}
        />
        <Input
          style={{ width: "300px", height: "70%" }}
          placeholder="Search by Diamond Code"
          value={search}
          onChange={handleSearch}
        />
      </Flex>

      <div className="list" style={{ width: "100%" }}>
        <div className="list__order">
          <span style={{ color: "#333" }}>Sort by:</span>
          <Select
            defaultValue="High to Low"
            style={{ width: 120, marginLeft: "12px" }}
            onChange={handleOrder}
            options={[
              {
                value: "desc",
                label: "High to Low",
              },
              {
                value: "asc",
                label: "Low to High",
              },
            ]}
          />
        </div>
        <Divider></Divider>
        <Row gutter={[13, 21]}>
        {!loading ? (
            earringList.length > 0 ? (
              earringList.map((earring, index) => (
                <Col span={6} className="product__container" key={index}>
                  <Link
                    to={`/Product/${earring.productId}`}
                    className="product__wrapper"
                  >
                    <div className="product__img">
                      <img src={earring.imgUrl} alt={earring.productName} />
                      {/* <i className="fa-regular fa-heart list__wishlist"></i> */}
                    </div>
                    <div className="product__info">
                      <div className="product__name">{earring.productName}</div>
                      <div className="product__price">${earring.unitPrice}</div>
                    </div>
                  </Link>
                </Col>
              ))
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Empty description="There is no earring found" />
              </div>
            )
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <LoadingOutlined style={{fontSize:'60px'}} />
            </div>
          )}
        </Row>
      
        <Pagination
          showSizeChanger
          onChange={handlePageChange}
          current={pageNumber}
          pageSize={pageSize}
          total={amount}
          style={{ marginTop: "16px" }}
        />
      </div>
    </>
  );
}

export default EarringCatalog;

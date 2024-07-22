import { useEffect, useState, useCallback } from "react";
import Banner from "../../components/banner/Banner";
import SettingDropDownGroup from "../../components/sortSettingDropdownButton/sortSettingDropDownButton";
import {
  Col,
  Divider,
  Dropdown,
  Empty,
  Flex,
  Input,
  Pagination,
  Row,
  Select,
  Space,
  Spin,
} from "antd";
import "./EngagementRingCatalog.scss";
import { Link } from "react-router-dom";
import { apiHeader } from "../../components/urlApiHeader";
import { debounce } from "lodash";
import { LoadingOutlined } from "@ant-design/icons";

function EngagementRingCatalog() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(16);
  const [amount, setAmount] = useState(1)
  const [ringList, setRingList] = useState([]);
 
  const [loading, setLoading] = useState(false);
  const [metalType, setMetalType] = useState([]);
  const [size, setSize] = useState([]);
  const [shape, setShape] = useState([]);
  const [order, setOrder] = useState("desc");
  const [search, setSearch] = useState("")
  // fetch product
  const [price, setPrice] = useState([0, 50000]);

  const fetchEngagementRing = async (reset = false) => {
    
    try {
      setLoading(true);
      let urlSize = size.map((s) => `sizeIds=${s}`).join("&");
      let urlMetal = metalType.map((m) => `metaltypeIds=${m}`).join("&");
      let urlShape = shape.map((shape) => `diamondShapes=${shape}`).join("&");
      let url = `${apiHeader}/Product/getFilteredProductAd?categoryId=1&subCategoryId=1&${urlSize}&${urlMetal}&${urlShape}&pageNumber=${pageNumber}&pageSize=${pageSize}&minPrice=${price[0]}&maxPrice=${price[1]}&sortOrder=${order}&diamondCode=${search}`;
      console.log(url);
      const res = await fetch(url);
      const data = await res.json();
      setAmount(data.totalProduct)
      setRingList(data.filteredProducts1.$values);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEngagementRing();
  }, [pageNumber]);

  useEffect(() => {
    setRingList([]);
    setPageNumber(1);
    fetchEngagementRing(true);
  }, [size, metalType, shape, price, order]);
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
        intro="The Ultimate Love Letter"
        title="ENGAGEMENT RINGS"
        subtitle="Find handcrafted engagement rings featuring ethical diamonds, 
        gems and custom designs. Easily shop high-quality gemstone, 
        natural diamond or lab diamond rings online with settings for 
        any budget and style."
        bg="https://dam.bluenile.com/images/public/20216/Six_Blue_Nile_diamond_engagement_rings_in_gold_and_platinum.jpeg"
        buttons={["Craft Your Rings"]}
      />
      <Flex style={{ marginTop: "100px" }}>
        <SettingDropDownGroup
          size={{ size, setSize }}
          metalType={{ metalType, setMetalType }}
          shape={{ shape, setShape }}
          category={1}
          price={price}
          setPrice={setPrice}
        />
        <Input style={{width: '300px', height: '70%'}} placeholder="Search by Diamond Code" value={search} onChange={handleSearch}/>
      </Flex>

      <div className="list" style={{ width: "100%" }}>
        <div className="list__order">
          <span style={{ color: "#333" }}>Sort by:</span>
          <Select
            defaultValue="High to Low"
            style={{
              width: 120,
              marginLeft: "12px",
            }}
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
            ringList.length > 0 ? (
              ringList.map((ring, index) => (
                <Col span={6} className="product__container" key={index}>
                  <Link
                    to={`/Product/${ring.productId}`}
                    className="product__wrapper"
                  >
                    <div className="product__img">
                      <img src={ring.imgUrl} alt={ring.productName} />
                      {/* <i className="fa-regular fa-heart list__wishlist"></i> */}
                    </div>
                    <div className="product__info">
                      <div className="product__name">{ring.productName}</div>
                      <div className="product__price">${ring.unitPrice}</div>
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
                <Empty description="There is no ring found" />
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

export default EngagementRingCatalog;

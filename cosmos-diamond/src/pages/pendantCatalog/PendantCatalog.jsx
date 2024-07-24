import {
  Divider,
  Flex,
  Spin,
  Row,
  Col,
  Select,
  Input,
  Pagination,
  Empty,
} from "antd";
import SettingDropDownGroup from "../../components/sortSettingDropdownButton/sortSettingDropDownButton";
import { useCallback, useEffect, useState } from "react";
import Banner from "../../components/banner/Banner";
import { debounce } from "lodash";
import { apiHeader } from "../../components/urlApiHeader";
import { Link } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

function PendantCatalog() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(16);
  const [amount, setAmount] = useState(1);
  const [pendantList, setPendantList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [metalType, setMetalType] = useState([]);
  const [size, setSize] = useState([]);
  const [shape, setShape] = useState([]);
  const [order, setOrder] = useState("desc");
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState([0, 50000]);

  const fetchPendants = async () => {
    try {
      setLoading(true)
      let urlSize = size.map((s) => `sizeIds=${s}`).join("&");
      let urlMetal = metalType.map((m) => `metaltypeIds=${m}`).join("&");
      let urlShape = shape.map((shape) => `diamondShapes=${shape}`).join("&");

      let url = `${apiHeader}/Product/getFilteredProductAd?categoryId=2&subCategoryId=2&${urlSize}&${urlMetal}&${urlShape}&pageNumber=${pageNumber}&pageSize=${pageSize}&minPrice=${price[0]}&maxPrice=${price[1]}&sortOrder=${order}&diamondCode=${search}`;
      console.log(url);
      const res = await fetch(url);
      const data = await res.json();
      setAmount(data.totalProduct);

      setPendantList(data.filteredProducts1.$values);
    } catch (error) {
      setLoading(false);
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendants();
  }, [pageNumber]);

  useEffect(() => {
    setPendantList([]);
    setPageNumber(1);
    fetchPendants();
  }, [size, metalType, shape, price, order, search]);

  const handleOrder = (value) => {
    setOrder(value);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handlePageChange = (page, pageSize) => {
    setPageNumber(page);
    setPageSize(pageSize);
  };

  return (
    <>
      <Banner
        intro="FOR LIFE'S MOST JOYFUL OCCASIONS"
        title="Pendant"
        subtitle="The eternal brilliance of a dazzling diamond necklace is unmatched. Explore ethical diamond necklace pendants, tennis necklaces, three-stone designs and bezel-set styles all set in precious metals. Eternally classic, a diamond necklace is the perfect accessory for any occasion. Give one of our handcrafted diamond necklaces as a memorable gift or choose a necklace with diamonds for your own jewelry collection."
        bg="https://dam.bluenile.com/images/public/7239/14k white gold pendant.jpeg"
        buttons={["Craft Your Pendant"]}
      />
      <Flex style={{ marginTop: "100px" }}>
        <SettingDropDownGroup
          size={{ size, setSize }}
          metalType={{ metalType, setMetalType }}
          shape={{ shape, setShape }}
          category={2}
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
            pendantList.length > 0 ? (
              pendantList.map((pendant, index) => (
                <Col span={6} className="product__container" key={index}>
                  <Link
                    to={`/Product/${pendant.productId}`}
                    className="product__wrapper"
                  >
                    <div className="product__img">
                      <img src={pendant.imgUrl} alt={pendant.productName} />
                      {/* <i className="fa-regular fa-heart list__wishlist"></i> */}
                    </div>
                    <div className="product__info">
                      <div className="product__name">{pendant.productName}</div>
                      <div className="product__price">${pendant.unitPrice}</div>
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
                <Empty description="There is no pendant found" />
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

export default PendantCatalog;

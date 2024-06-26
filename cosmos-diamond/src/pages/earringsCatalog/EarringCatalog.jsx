import { useEffect, useState, useCallback } from "react";
import Banner from "../../components/banner/Banner";
import SettingDropDownGroup from "../../components/sortSettingDropdownButton/sortSettingDropDownButton";
import { Col, Divider, Dropdown, Flex, Row, Select, Space, Spin } from "antd";

import { Link } from "react-router-dom";
import { apiHeader } from "../../components/urlApiHeader";
import { debounce } from "lodash";

function EarringCatalog() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(16);
  const [ringList, setRingList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [metalType, setMetalType] = useState([]);
  const [size, setSize] = useState([]);
  const [shape, setShape] = useState([]);
  // const [order, setOrder] = useState('asc')
  //fetch product
  const [price, setPrice] = useState([0, 50000]);

  const fetchEngagementRing = async () => {
    setLoading(true);
    try {
      let urlSize = size.map((s) => `sizeIds=${s}`).join("&");
      let urlMetal = metalType.map((m) => `metaltypeIds=${m}`).join("&");
      let urlShape = shape.map((shape) => `diamondShapes=${shape}`).join("&");
      let url = `${apiHeader}/Product/getFilteredProductAd?categoryId=3&subCategoryId=3&${urlSize}&${urlMetal}&${urlShape}&pageNumber=${pageNumber}&pageSize=${pageSize}&minPrice=${price[0]}&maxPrice=${price[1]}`;
      console.log(url);
      const res = await fetch(url);
      const data = await res.json();
      if (data.$values.length < pageSize) {
        setHasMore(false);
        setRingList((prev) => [...prev, ...data.$values]);
      }
      console.log(data);
      setRingList((prev) => [...prev, ...data.$values]);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasMore) {
      fetchEngagementRing();
    }
  }, [pageNumber]);

  const handleScroll = useCallback(
    debounce(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 3000
      ) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      }
    }, 300),
    []
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    setRingList([]);
    setPageNumber(1);
    fetchEngagementRing();
  }, [size, metalType, shape, price]);
  // const handleOrder = (value)=>{
  //   setOrder(value)
  // }
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
      </Flex>

      <div className="list" style={{ width: "100%" }}>
        {/* <div className="list__order">
          <span style={{color:'#333'}}>Sort by:</span>
        <Select
          defaultValue= 'Best seller'
          style={{
            width: 120,
            marginLeft: '12px'
          }}
          onChange={handleOrder}
          options={[
            {
              value: "asc",
              label: "Best seller",
            },
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
        </div> */}
        <Divider></Divider>
        <Row gutter={[13, 21]}>
          {ringList.map((ring, index) => (
            <Col span={6} className="product__container" key={index}>
              <Link
                to={`/Product/${ring.productId}`}
                className="product__wrapper"
              >
                <div className="product__img">
                  <img src={ring.imgUrl} alt={ring.productName} />
                  <i className="fa-regular fa-heart list__wishlist"></i>
                </div>
                <div className="product__info">
                  <div className="product__name">{ring.productName}</div>
                  <div className="product__price">${ring.unitPrice}</div>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
        {loading && (
          <div style={{ textAlign: "center" }} className="loading-spinner">
            <Spin size="large" />
          </div>
        )}
      </div>
    </>
  );
}

export default EarringCatalog;

import { Divider, Flex, Spin, Row, Col, Select } from "antd";
import SettingDropDownGroup from "../../components/sortSettingDropdownButton/sortSettingDropDownButton";
import { useCallback, useEffect, useState } from "react";
import Banner from "../../components/banner/Banner";
import { debounce, orderBy } from "lodash";
import { apiHeader } from "../../components/urlApiHeader";
import { Link } from "react-router-dom";

function PendantCatalog() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(16);
  const [ringList, setRingList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [metalType, setMetalType] = useState([]);
  const [size, setSize] = useState([]);
  const [shape, setShape] = useState([]);
  const [order, setOrder] = useState("desc");
  //fetch product
  const [price, setPrice] = useState([0, 50000]);

  const fetchEngagementRing = async (reset = false) => {
    setLoading(true);
    try {
      let urlSize = size.map((s) => `sizeIds=${s}`).join("&");
      let urlMetal = metalType.map((m) => `metaltypeIds=${m}`).join("&");
      let urlShape = shape.map((shape) => `diamondShapes=${shape}`).join("&");
      let url = `${apiHeader}/Product/getFilteredProductAd?categoryId=2&subCategoryId=2&${urlSize}&${urlMetal}&${urlShape}&pageNumber=${pageNumber}&pageSize=${pageSize}&minPrice=${price[0]}&maxPrice=${price[1]}&sortOrder=${order}`;
      console.log(url);
      const res = await fetch(url);
      const data = await res.json();
      if (reset) {
        setRingList(data.$values);
      } else {
        setRingList((prev) => [...prev, ...data.$values]);
      }

    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    
    fetchEngagementRing();
    
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
    fetchEngagementRing(true);
  }, [size, metalType, shape, price, order]);
  const handleOrder = (value) => {
    setOrder(value);
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
          {ringList.map((ring, index) => (
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

export default PendantCatalog;

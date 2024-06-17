import { useEffect, useState, useCallback } from "react";
import Banner from "../../components/banner/Banner";
import SettingDropDownGroup from "../../components/sortSettingDropdownButton/sortSettingDropDownButton";
import { Col, Flex, Row, Space, Spin } from "antd";
import "./EngagementRingCatalog.scss";
import { Link } from "react-router-dom";
import { apiHeader } from "../../components/urlApiHeader";
import { debounce } from "lodash";

function EngagementRingCatalog() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(16);
  const [ringList, setRingList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [metalType, setMetalType] = useState()
  const fetchEngagementRing = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${apiHeader}/Product/getFilteredProductAd?categoryId=1&subCategoryId=1&pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      const data = await res.json();
      if (data.$values.length < pageSize) {
        setHasMore(false);
      }
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

  const handleScroll = useCallback(debounce(() => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 2400) {
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
  }, 300), []);

  useEffect(() => {
    window.scrollTo(0, 0);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

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
        buttons={["Craft your own"]}
      />
      <Flex style={{ marginTop: "100px" }}>
        <SettingDropDownGroup category="Ring" />
      </Flex>
      <div className="list" style={{ width: "100%" }}>
        <Row gutter={[13, 21]}>
          {ringList.map((ring) => (
            <Col span={6} className="product__container" key={ring.productId}>
              <Link to={`/Product/${ring.productId}`} className="product__wrapper">
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
          <div style={{textAlign:'center'}} className="loading-spinner">
            <Spin size="large" />
          </div>
        )}
      </div>
    </>
  );
}

export default EngagementRingCatalog;

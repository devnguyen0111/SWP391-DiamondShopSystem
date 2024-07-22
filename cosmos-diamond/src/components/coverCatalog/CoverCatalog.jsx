import { useCallback, useEffect, useState } from "react";

import { debounce } from "lodash";
import SortOptionCover from "../sortSettingDropdownButton/sortOptionCover";
import { Col, Divider, Pagination, Row, Select, Spin } from "antd";
import { Link } from "react-router-dom";
import { apiHeader } from "../urlApiHeader";

function CoverCatlog({ category }) {
  const [pageSize, setPageSize] = useState(16);
  const [pageNumber, setPageNumber] = useState(1);
  const [amount, setAmount] = useState(1);
  const [coverList, setCoverList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [metalType, setMetalType] = useState([]);
  const [size, setSize] = useState([]);
  const [order, setOrder] = useState("desc");
  const [search, setSearch] = useState("");

  // const [order, setOrder] = useState('asc')
  //fetch product
  const [price, setPrice] = useState([0, 10000]);

  const fetchCover = async () => {
    setLoading(true);
    try {
      let urlSize = size.map((s) => `sizeIds=${s}`).join("&");
      let urlMetal = metalType.map((m) => `metaltypeIds=${m}`).join("&");

      let url = `${apiHeader}/Cover/getAllCoverWithFilter?status=Available&categoryId=${category}&subCategoryId=${category}&${urlSize}&${urlMetal}&pageNumber=${pageNumber}&pageSize=${pageSize}&minUnitPrice=${price[0]}&maxUnitPrice=${price[1]}&sortOrder=${order}`;
      console.log(url);
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setAmount(data.totalCover);
      setCoverList(data.filteredCovers1.$values);

      console.log(data);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCover();
  }, [pageNumber, pageSize]);

  useEffect(() => {
    setCoverList([]);
    setPageNumber(1);
    fetchCover();
  }, [size, metalType, price, order]);
  const handleOrder = (value) => {
    setOrder(value);
  };
  const handlePageChange = (page, pageSize) => {
    setPageNumber(page);
    setPageSize(pageSize);
  };
  return (
    <>
      <SortOptionCover
        size={{ size, setSize }}
        metalType={{ metalType, setMetalType }}
        category={category}
        price={price}
        setPrice={setPrice}
      />
      <div className="list" style={{ width: "100%" }}>
        <div className="list__order">
          <span style={{ color: "#333" }}>Sort by:</span>
          <Select
            defaultValue="Best seller"
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
          {coverList &&
            coverList.map((jewelry, index) => (
              <Col span={6} className="product__container" key={index}>
                <Link
                  to={`/custom-jewelry-by-diamond/${jewelry.coverId}`}
                  className="product__wrapper"
                >
                  <div className="product__img">
                    <img src={jewelry.url} alt={jewelry.name} />
                    <i className="fa-regular fa-heart list__wishlist"></i>
                  </div>
                  <div className="product__info">
                    <div className="product__name">{jewelry.name}</div>
                    <div className="product__price">
                      ${jewelry.prices} (Setting Price)
                    </div>
                  </div>
                </Link>
              </Col>
            ))}
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

export default CoverCatlog;

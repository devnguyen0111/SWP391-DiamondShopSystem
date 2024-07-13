import React, { useEffect, useState, useCallback } from "react";
import "./DiamondSort.scss";
import "./DiamondList.scss";
import { Link } from "react-router-dom";
import { Row, Col, Select } from "antd";
import SortPriceSlider from "./SortPriceSlider";
import SortCaratSlider from "./SortCaratSlider";
import SortColorSlider from "./SortColorSlider";
import SortClaritySlider from "./SortClaritySlider";
import SortCutSlider from "./SortCutSlider";
import { diamonds } from "./Diamonds";
import Image from "../Image";
import { apiHeader } from "../urlApiHeader";

function DiamondSort() {
  const MIN_PRICE = 0;
  const MAX_PRICE = 50000;
  const MIN_CARAT = 0.05;
  const MAX_CARAT = 30.0;
  const INIT_CLARITY = ["SI2", "SI1", "VS2", "VS1", "VVS2", "VVS1", "IF", "FL"];
  const INIT_COLOR_NAME = ["K", "J", "I", "H", "G", "F", "E", "D"];
  const INIT_CUT = ["Good", "Very Good", "Ideal", "Astor Ideal"];
  const [price, setPrice] = useState([MIN_PRICE, MAX_PRICE]);
  const [carat, setCarat] = useState([MIN_CARAT, MAX_CARAT]);
  const [clarity, setClarity] = useState([1, 9]);
  const [clarityName, setClarityName] = useState(INIT_CLARITY);
  const [color, setColor] = useState([1, 9]);
  const [colorName, setColorName] = useState(INIT_COLOR_NAME);
  const [cut, setCut] = useState([1, 5]);
  const [cutName, setCutName] = useState(INIT_CUT);
  const [diamondList, setDiamondList] = useState([]);
  const [diamondShape, setDiamondShape] = useState("Round");
  const [pageSize, setPageSize] = useState(16);
  const [pageNumber, setPageNumber] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState("desc");

  useEffect(() => {
    const shapes = document.querySelectorAll(".shape__block");
    shapes[0].classList.add("chosen");
    shapes.forEach((shape) => {
      shape.addEventListener("click", (e) => {
        shapes.forEach((s) => s.classList.remove("chosen"));
        if (shape.contains(e.target)) {
          shape.classList.add("chosen");
          setDiamondShape(shape.children[1].innerHTML);
        }
      });
    });
  }, []);

  const fetchDiamonds = useCallback(async () => {
    let clarityURL = clarityName
      .map((cName) => `clarityRange=${cName}`)
      .join("&");
    let colorURL = colorName.map((dname) => `colorRange=${dname}`).join("&");
    let cutURL = cutName.map((dname) => `cutRange=${dname}`).join("&");
    let minCaratURL = carat[0];
    let maxCaratURL = carat[1];
    let minPriceURL = price[0];
    let maxPriceURL = price[1];

    const url = `${apiHeader}/Diamond?sortBy=${diamondShape}&${clarityURL}&${colorURL}&${cutURL}&minCaratWeight=${minCaratURL}&maxCaratWeight=${maxCaratURL}&minPrice=${minPriceURL}&maxPrice=${maxPriceURL}&pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${order}`;

    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    if (data.diamonds.$values.length < pageSize) {
      setHasMore(false);
    }
    setIsLoading(true);
    setDiamondList((prev) => [...prev, ...data.diamonds.$values]);
  }, [clarityName, colorName, cutName, carat, price, diamondShape, pageNumber, pageSize, order]);

  useEffect(() => {
    if (hasMore) {
      fetchDiamonds();
    }
  }, [pageNumber, fetchDiamonds, hasMore]);

  useEffect(() => {
    setDiamondList([]);
    setPageNumber(0);
    fetchDiamonds();
  }, [diamondShape, price, carat, clarity, color, cut, order, fetchDiamonds]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 800
    ) {
      setPageNumber((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOrder = (value) => {
    setOrder(value);
  };

  const resetFilter = () => {
    setPrice([MIN_PRICE, MAX_PRICE]);
    setCarat([MIN_CARAT, MAX_CARAT]);
    setClarity([1, 9]);
    setClarityName(INIT_CLARITY);
    setColor([1, 9]);
    setColorName(INIT_COLOR_NAME);
    setCut([1, 5]);
    setOrder("desc");
    setDiamondList([]);
    setPageNumber(0);
    setDiamondShape("Round");
    const shapes = document.querySelectorAll(".shape__block");
    shapes.forEach((s) => s.classList.remove("chosen"));
    shapes[0].classList.add("chosen");
  };

  return (
    <div className="sort">
      <Row className="sort__wrapper" gutter={[24, 16]}>
        <Col span={8} xs={24} lg={8} className="sort__area">
          <div className="shape">
            <div className="shape__title">Shape</div>
            <div className="shape__content">
              {diamonds.map((diamond, index) => (
                <div className="shape__block" key={index}>
                  <div className="shape__img" style={{ width: 28, height: 28 }}>
                    <img
                      src={diamond.src}
                      alt=""
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                  <div className="shape__name">{diamond.name}</div>
                </div>
              ))}
            </div>
          </div>
        </Col>
        <Col span={8} xs={24} lg={8} className="sort__area">
          <SortPriceSlider
            price={price}
            setPrice={setPrice}
            MIN_PRICE={MIN_PRICE}
            MAX_PRICE={MAX_PRICE}
          />
        </Col>

        <Col span={8} xs={24} lg={8} className="sort__area">
          <SortCaratSlider
            carat={carat}
            setCarat={setCarat}
            MAX_CARAT={MAX_CARAT}
            MIN_CARAT={MIN_CARAT}
          />
        </Col>
        <Col span={8} xs={24} lg={8} className="sort__area">
          <SortColorSlider
            color={color}
            setColor={setColor}
            colorName={colorName}
            setColorName={setColorName}
            INIT_COLOR_NAME={INIT_COLOR_NAME}
          />
        </Col>
        <Col span={8} xs={24} lg={8} className="sort__area">
          <SortClaritySlider
            clarity={clarity}
            setClarity={setClarity}
            clarityName={clarityName}
            setClarityName={setClarityName}
            INIT_CLARIRY={INIT_CLARITY}
          />
        </Col>
        <Col span={8} xs={24} lg={8} className="sort__area">
          <SortCutSlider
            cut={cut}
            setCut={setCut}
            cutName={cutName}
            setCutName={setCutName}
            INIT_CUT={INIT_CUT}
          />
        </Col>
        <Col span={24} className="sort__reset">
          <button className="sort__btn--reset" onClick={resetFilter}>
            <i className="fa-solid fa-arrow-rotate-right"></i>
            <span>Reset Filters</span>
          </button>
        </Col>
        <Col span={24}>
          <div className="list">
            <div className="list__sort">
              <div className="list__left">
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
            </div>
            <div className="list__product">
              <Row gutter={[13, 21]}>
                {diamondList &&
                  diamondList.map((diamond, index) => (
                    <Col
                      span={6}
                      xs={12}
                      md={8}
                      lg={6}
                      className="product__container"
                      key={index}
                    >
                      <Link
                        to={`/Diamond/${diamond.diamondId}`}
                        className="product__wrapper"
                      >
                        <div className="product__img">
                          <Image src={diamond.shape} />
                        </div>
                        <div className="product__info">
                          <div className="product__name">
                            {diamond.diamondName}
                          </div>
                          <div className="product__price">
                            ${diamond.price}
                          </div>
                        </div>
                      </Link>
                    </Col>
                  ))}
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default DiamondSort;
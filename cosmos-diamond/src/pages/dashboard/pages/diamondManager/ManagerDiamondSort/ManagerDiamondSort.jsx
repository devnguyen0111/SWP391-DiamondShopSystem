import React, { useEffect, useState, useCallback } from "react";
import { Row, Col, Select, Pagination, Card, Modal, Button, Input } from "antd";
import { apiHeader } from "../../../../../components/urlApiHeader";
import api from "./../../../../../config/axios";
import SortPriceSlider from "../../../../../components/sortslider/SortPriceSlider";
import SortCaratSlider from "../../../../../components/sortslider/SortCaratSlider";
import SortColorSlider from "../../../../../components/sortslider/SortColorSlider";
import SortClaritySlider from "../../../../../components/sortslider/SortClaritySlider";
import SortCutSlider from "../../../../../components/sortslider/SortCutSlider";
import { diamonds } from "../../../../../components/sortslider/Diamonds";
import { useNavigate } from "react-router-dom";
import { CiRollingSuitcase } from "react-icons/ci";
import { PlusCircleFilled, PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";

function ManagerDiamondSort({ setOpen, setDiamondInfo }) {
  const MIN_PRICE = 0;
  const MAX_PRICE = 50000;
  const MIN_CARAT = 0.05;
  const MAX_CARAT = 30.0;
  const INIT_CLARITY = ["SI2", "SI1", "VS2", "VS1", "VVS2", "VVS1", "IF", "FL"];
  const INIT_COLOR_NAME = ["K", "J", "I", "H", "G", "F", "E", "D"];
  const INIT_CUT = ["Good", "Very Good", "Ideal", "Astor Ideal"];
  const [selectedDiamond, setSelectedDiamond] = useState();
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
  const [pageSize, setPageSize] = useState(9);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState("desc");
  const [amount, setAmount] = useState(0);
  const [open1, setOpen1] = useState(false);
  const [search, setSearch] = useState('')

  const nav = useNavigate();
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
  //GET Diamond List
  const fetchDiamonds = useCallback(async () => {
    setIsLoading(true);

    const clarityURL = clarityName
      .map((cName) => `clarityRange=${cName}`)
      .join("&");
    const colorURL = colorName.map((dname) => `colorRange=${dname}`).join("&");
    const cutURL = cutName.map((dname) => `cutRange=${dname}`).join("&");
    const minCaratURL = carat[0];
    const maxCaratURL = carat[1];
    const minPriceURL = price[0];
    const maxPriceURL = price[1];

    const url = `${apiHeader}/Diamond?sortBy=${diamondShape}&${clarityURL}&${colorURL}&${cutURL}&minCaratWeight=${minCaratURL}&maxCaratWeight=${maxCaratURL}&minPrice=${minPriceURL}&maxPrice=${maxPriceURL}&pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${order}&diamondCode=${search}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.diamonds.$values.length < pageSize) {
        setHasMore(false);
      }

      setDiamondList(data.diamonds.$values);
      setAmount(data.totalDiamond);
    } catch (error) {
      console.error("Failed to fetch diamonds", error);
    } finally {
      setIsLoading(false);
    }
  }, [
    clarityName,
    colorName,
    cutName,
    carat,
    price,
    diamondShape,
    pageNumber,
    pageSize,
    order,
    amount,
    search
  ]);

  useEffect(() => {
    setDiamondList([]);
    setPageNumber(1);
    fetchDiamonds();
  }, [diamondShape, price, carat, clarity, color, cut, order, amount, search]);

  useEffect(() => {
    fetchDiamonds();
  }, [pageNumber, pageSize, fetchDiamonds, amount]);

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
    setPageNumber(1);
    setDiamondShape("Round");
    const shapes = document.querySelectorAll(".shape__block");
    shapes.forEach((s) => s.classList.remove("chosen"));
    shapes[0].classList.add("chosen");
  };

  const handlePageChange = (page, pageSize) => {
    setPageNumber(page);
    setPageSize(pageSize);
  };
  const handleSelectDiamond = (diamondId) => {
    setOpen1(true);
    setSelectedDiamond(diamondId);
  };
  const handleOk = async () => {
    if (selectedDiamond) {
      const response = await api.get(`/api/Diamond/${selectedDiamond}`);

      setDiamondInfo([
        {
          key: 1,
          label: "Diamond Id",
          children: response.data.diamondId,
          span: 3,
        },
        {
          key: 2,
          label: "Diamond Name",
          children: response.data.diamondName,
          span: 3,
        },
        {
          key: 3,
          label: "Shape",
          children: response.data.shape,
        },
        {
          key: 4,
          label: "Carat",
          children: response.data.caratWeight,
        },
        {
          key: 5,
          label: "Clarity",
          children: response.data.clarity,
        },
        {
          key: 6,
          label: "Color",
          children: response.data.color,
        },
        {
          key: 7,
          label: "Cut",
          children: response.data.cut,
        },
      ]);
      setOpen(false);
      setOpen1(false);
      alertSuccess("Diamond Chosen");
    }
  };
   //handle search
   const handleSearch = (e)=>{
    setSearch(e.target.value)
    console.log(e.target.value);
  }
  return (
    <>
      <div className="sort" style={{ color: "black", padding: "40px 100px" }}>
        <div className="" style={{ textAlign: "right" }}>
          <Button
            style={{
              padding: "20px 20px",
              backgroundColor: "#171742",
              color: "#fff",
            }}
            onClick={()=> nav('/dashboard/manager/diamond/add')}
          >
            <PlusCircleOutlined /> Add Diamond
          </Button>
        </div>
        <Row className="sort__wrapper" gutter={[24, 16]}>
          <Col span={8} xs={24} lg={8} className="sort__area">
            <div className="shape">
              <div className="shape__title">Shape</div>
              <div className="shape__content">
                {diamonds.map((diamond, index) => (
                  <div className="shape__block" key={index}>
                    <div
                      className="shape__img"
                      style={{ width: 28, height: 28 }}
                    >
                      <img
                        src={diamond.src}
                        alt={diamond.name}
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
            <>
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
                  <Input onChange={handleSearch} value={search} placeholder='Search by Diamond Code' style={{width:'30%'}} addonBefore={<SearchOutlined />}/>

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
                          <Card
                            hoverable
                            style={{
                              width: 240,
                            }}
                            cover={
                              <img
                                alt="example"
                                src={`/${diamond.shape}.jpg`}
                              />
                            }
                            onClick={() =>
                              nav(
                                `/dashboard/manager/diamond/${diamond.diamondId}`
                              )
                            }
                          >
                            <div className="product__info1">
                              <div className="product__name">
                                {diamond.diamondName}
                              </div>
                              <div className="product__price">
                                ${diamond.price}
                              </div>
                            </div>
                          </Card>
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
              </div>
            </>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ManagerDiamondSort;

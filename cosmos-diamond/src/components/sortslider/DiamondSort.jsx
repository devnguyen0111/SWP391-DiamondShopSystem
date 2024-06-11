import React, { useEffect, useRef, useState } from "react";
import "./DiamondSort.scss";
import "./DiamondList.scss";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import ReactSlider from "react-slider";
import SortPriceSlider from "./SortPriceSlider";
import SortCaratSlider from "./SortCaratSlider";
import SortColorSlider from "./SortColorSlider";
import SortClaritySlider from "./SortClaritySlider";
import SortCutSlider from "./SortCutSlider";
import { diamonds } from "./Diamonds";
import Image from "../Image";
import { length } from './../../../node_modules/stylis/src/Tokenizer';

const MIN_PRICE = 0;
const MAX_PRICE = 50000;
const MIN_CARAT = 0.05;
const MAX_CARAT = 30.0;
const INIT_CLARITY = ["SI2", "SI1", "VS2", "VS1", "VVS2", "VVS1", "IF", "FL"];
const INIT_COLOR_NAME = ["K", "J", "I", "H", "G", "F", "E", "D"];
const INIT_CUT = ["Good", "Very Good", "Ideal", "Astor Ideal"];
let url;

function DiamondSort() {
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
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const shapes = document.querySelectorAll(".shape__block");
    shapes[0].classList.add("chosen");
    shapes.forEach((shape, index) => {
      shape.addEventListener("click", (e) => {
        shapes.forEach((s) => s.classList.remove("chosen"));
        if (shape.contains(e.target)) {
          shape.classList.add("chosen");
          setDiamondShape(shape.children[1].innerHTML);
        }
      });
    });
  }, []);

  const fetchDiamonds = async () => {
    let clarityURL = clarityName.map((cName) => `clarityRange=${cName}`).join("&");
    let colorURL = colorName.map((dname) => `colorRange=${dname}`).join("&");
    let cutURL = cutName.map((dname) => `cutRange=${dname}`).join("&");
    let minCaratURL = carat[0];
    let maxCaratURL = carat[1];
    let minPriceURL = price[0];
    let maxPriceURL = price[1];

    const url = `https://localhost:7262/api/Diamond?sortBy=${diamondShape}&${clarityURL}&${colorURL}&${cutURL}&minCaratWeight=${minCaratURL}&maxCaratWeight=${maxCaratURL}&minPrice=${minPriceURL}&maxPrice=${maxPriceURL}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
    
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    if(data.$values.length < pageSize){
      setHasMore(false)
    }
    setIsLoading(true)
    setDiamondList(pre => [...pre,...data.$values]);
  };
  //neu pageNumber tang, fetch them 16 san pham
  useEffect(()=>{
    console.log(pageNumber);
    if(hasMore){
      fetchDiamonds()
    }
  },[pageNumber])
  //neu user sort, reset diamondList va pageNumber
  useEffect(()=>{
    setDiamondList([])
    setPageNumber(0)
    fetchDiamonds()
  }, [diamondShape, price, carat, clarity, color, cut])


  //tang pagenumber neu user keo gan toi hang san pham cuoi
  const handleScroll = ()=>{
    if(window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 800){
      setPageNumber(prev => prev + 1)
    }
  }

  useEffect(()=>{
    window.scrollTo(0, 0)
    window.addEventListener('scroll', handleScroll)
    return ()=> window.removeEventListener('scroll', handleScroll)
  }, [])
  

  return (
    <>
      <div className="sort">
        <Row className="sort__wrapper" gutter={[24, 16]}>
          <Col span={8} className="sort__area">
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
          <Col span={8} className="sort__area">
            <SortPriceSlider
              price={price}
              setPrice={setPrice}
              MIN_PRICE={MIN_PRICE}
              MAX_PRICE={MAX_PRICE}
            />
          </Col>

          <Col span={8} className="sort__area">
            <SortCaratSlider
              carat={carat}
              setCarat={setCarat}
              MAX_CARAT={MAX_CARAT}
              MIN_CARAT={MIN_CARAT}
            />
          </Col>
          <Col span={8} className="sort__area">
            <SortColorSlider
              color={color}
              setColor={setColor}
              colorName={colorName}
              setColorName={setColorName}
              INIT_COLOR_NAME={INIT_COLOR_NAME}
            />
          </Col>
          <Col span={8} className="sort__area">
            <SortClaritySlider
              clarity={clarity}
              setClarity={setClarity}
              clarityName={clarityName}
              setClarityName={setClarityName}
              INIT_CLARIRY={INIT_CLARITY}
            />
          </Col>
          <Col span={8} className="sort__area">
            <SortCutSlider
              cut={cut}
              setCut={setCut}
              cutName={cutName}
              setCutName={setCutName}
              INIT_CUT={INIT_CUT}
            />
          </Col>
          <Col span={24} className="sort__reset">
            <button className="sort__btn--reset">
              <i class="fa-solid fa-arrow-rotate-right"></i>
              <span>Reset Filters</span>
            </button>
          </Col>
          <Col span={24}>
            <>
              <div className="list">
                <div className="list__sort">
                  <div className="list__left">
                    <span>Sort By: </span>
                    <div className="list__dropdown"></div>
                  </div>
                  <div className="list__right">
                    <div className="list__result">
                      <span>1</span> of <span>100</span> Result
                    </div>
                    <div className="list__layout">
                      <div className="list__layout--default">
                        <i class="fa-solid fa-table-cells-large"></i>
                      </div>
                      <div className="list__layout--table">
                        <i class="fa-solid fa-table-list"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="list__product">
                  <Row gutter={[13, 21]}>
                    {diamondList &&
                      diamondList.map((diamond, index) => (
                        <Col span={6} className="product__container" key={index}>
                          <Link to={"/Product/1"} className="product__wrapper">
                            <div className="product__img">
                              <Image src={diamond.shape} />
                              <i class="fa-regular fa-heart list__wishlist"></i>
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
            </>
          </Col>
        </Row>
      </div>
    </>
  );
}
export default DiamondSort;

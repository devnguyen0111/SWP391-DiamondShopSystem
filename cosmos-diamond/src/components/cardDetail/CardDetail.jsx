import {
  Button,
  Card,
  Checkbox,
  Divider,
  Flex,
  InputNumber,
  Typography,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CardDetail.scss";
import { apiHeader } from "../urlApiHeader";
import { alertFail } from "../../hooks/useNotification";
import api from "../../config/axios";

function CardDetail({
  product,
  userID,
  setCartTotalPrice,
  setRemove,
  setcheckList,
}) {
  const [productQuantity, setProductQuantity] = useState(product.quantity);
  const [productTotalPrice, setProductTotalPrice] = useState(product.total);
  const [loading, setLoading] = useState(false);
  const [diamond, setDiamond] = useState()
  console.log("heeh", product);
  const openNotification = (placement) => {
    notification.error({
      message: "Remove Product Successfully",
      description: "Product Removed",
      placement,
      pauseOnHover: true,
      stack: true,
      duration: 2,
    });
  };
  const getDiamondDetail = async ()=>{
    const res = await api.get(`/api/Product/productDetail/${product.pid}`)
    if(res.status == 200){
      console.log(res.data);
      setDiamond(res.data)
    }else{
      alertFail('Something went wrong, cannot get Jewelry Detail')
    }
  }
  const removeCartItem = async () => {
    setLoading(true);
    try {
      await fetch(`${apiHeader}/Cart/removeFromCart`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authoriaztion: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          id: userID,
          pid: product.pid,
        }),
      });
      setRemove((prev) => !prev);
      openNotification("topRight");
    } catch {
      alertFail("Something went wrong. Please try again");
    } finally {
      setLoading(false);
    }
  };
  useEffect(()=>{
    getDiamondDetail()
  }, [])
  const navigate = useNavigate();

  // const handleQuantity = async (e) => {
  //   const newQuantity = e.target.value;
  //   setProductQuantity(newQuantity);
  //   setProductTotalPrice(newQuantity * product.price);

  //   try {
  //     const response = await fetch(
  //       `${apiHeader}/Cart/updateCart?id=${userID}&pid=${product.pid}&quantity=${newQuantity}`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-type": "application/json",
  //         },
  //       }
  //     );
  //     const data = await response.json();
  //     setCartTotalPrice(data.total);
  //     setRemove((prev) => !prev);
  //   } catch (error) {
  //     console.error("Failed to update cart", error);
  //   }
  // };

  const handleCheck = (e) => {
    if (e.target.checked) {
      setcheckList((prev) => [...prev, product]);
    } else {
      setcheckList((prev) => prev.filter((item) => item.pid !== product.pid));
    }
  };

  return (
    <div>
      <Card hoverable className="cardDetail">
        <Flex vertical>
          <Flex justify="space-between" className="cardDetail__upper">
            <h5 style={{ maxWidth: "85%" }}>{product.name1}</h5>
            <Flex gap={5}>
              <p
                className="cart-action"
                onClick={() => navigate(`/Product/${product.pid}`)}
              >
                View |
              </p>
              <p
                className="cart-action"
                onClick={(e) => !loading && removeCartItem(e)}
              >
                Remove
              </p>
            </Flex>
          </Flex>
          <Flex className="cardDetail__lower">
            <Checkbox onChange={(e) => handleCheck(e)}></Checkbox>
            <img
              alt="avatar"
              src={product.img}
              className="cardDetail__lower__pic"
            />
            <Flex vertical className="cardDetail__lower__detail">
              <Flex className="cardDetail__lower__detail__ring">
                <svg
                  viewBox="0 0 29 30"
                  fill="none"
                  height={35}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 5.878c-4.694 0-8.5 3.833-8.5 8.56C1.5 19.169 5.306 23 10 23s8.5-3.833 8.5-8.561-3.806-8.561-8.5-8.561Zm0 0L4.673 1M10 5.878 15.327 1"
                    stroke="#151542"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div>
                  <p className="cardDetail__lower__detail__ring__name">
                    {product.cover}
                  </p>
                  <Flex>
                    <p className="cardDetail__lower__detail__ring__change">
                      Metal Type: {product.metal}
                    </p>
                    <p className="cardDetail__lower__detail__ring__change">
                      Size: {product.size}
                    </p>
                  </Flex>
                </div>
                <p className="cardDetail__lower__detail__ring__price">
                  {"$" + product.coverPrice}
                </p>
              </Flex>
              <Divider />
              <Flex className="cardDetail__lower__detail__diamond">
                <svg
                  viewBox="0 0 29 30"
                  fill="none"
                  height={35}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M20.95 1H5.055L1 6.763 13 21 25 6.764 20.95 1Z"
                    stroke="#151542"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <div>
                  <p className="cardDetail__lower__detail__ring__name">
                    {product.diamond}
                  </p>
                  <Flex gap={12} style={{marginTop:'10px'}}>
                    <div className="right__tag" style={{height:'auto', padding: '5px 10px'}}>{diamond?.color}</div>
                    <div className="right__tag" style={{height:'auto', padding: '5px 10px'}}>{diamond?.clarity}</div>
                    <div className="right__tag" style={{height:'auto', padding: '5px 10px'}}>{diamond?.carat}</div>
                    <div className="right__tag" style={{height:'auto', padding: '5px 10px'}}>{diamond?.cut}</div>
                  </Flex>
                </div>
                <p className="cardDetail__lower__detail__ring__price">
                  {"$" + product.diamondPrice}
                </p>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <div
          className="cardDetail__lower__total"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div className=""></div>
          <p>{"$" + productTotalPrice}</p>
        </div>
      </Card>
    </div>
  );
}

export default CardDetail;

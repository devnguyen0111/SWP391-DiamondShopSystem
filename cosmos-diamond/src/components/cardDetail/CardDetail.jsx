import {
  Button,
  Card,
  Divider,
  Flex,
  InputNumber,
  Typography,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CardDetail.scss";
import { set } from "react-hook-form";

function CardDetail({ product, userID, setCartTotalPrice, setRemove }) {
  const [productQuantity, setProductQuantity] = useState(product.quantity);
  const [productTotalPrice, setProductTotalPrice] = useState(product.total);
  
  

  const openNotification = (placement) => {
    notification.error({
      message: `Remove Product Successfully`,
      description: 'Product Removed',
      placement,
      pauseOnHover: true,
      stack: true,
      duration: 2,
    });
  };

  const removeCartItem = () => {
    
    fetch("https://localhost:7262/api/Cart/removeFromCart", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: userID,
        pid: product.pid,
      }),
    }).then(setRemove((prev) => !prev))
    .then(openNotification('topRight'))
    
    
    
  };

  const navigate = useNavigate();
  const handleQuantity = (e) => {
    const newQuantity = e.target.value;
    setProductQuantity(newQuantity);
    setProductTotalPrice(newQuantity * product.price);

    fetch(
      `https://localhost:7262/api/Cart/updateCart?id=${userID}&pid=${product.pid}&quantity=${newQuantity}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("update", data);
        setCartTotalPrice(data.total);
      });
  };

  return (
    <div>
      
      <Card hoverable className="cardDetail">
        <Flex vertical>
          <Flex justify="space-between" className="cardDetail__upper">
            <h5>{product.name1}</h5>
            <Flex gap={5}>
              <p
                className="cart-action"
                onClick={() => navigate("/complete-product")}
              >
                View |
              </p>
              <p className="cart-action" onClick={removeCartItem}>
                Remove
              </p>
            </Flex>
          </Flex>
          <Flex className="cardDetail__lower">
            <img
              alt="avatar"
              src="https://ion.bluenile.com/sets/Jewelry-bn/195871/RND/Images/stage.jpg"
              className="cardDetail__lower__pic"
            />
            <Flex vertical className="cardDetail__lower__detail">
              <div
                style={{ display: "flex", justifyContent: "space-between" }}
                className="cardDetail__lower__detail__ring"
              >
                <svg
                  viewBox="0 2 26 15"
                  fill="none"
                  width={45}
                  height={30}
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
                  <Link to="/setting-search">
                    <p className="cardDetail__lower__detail__ring__change">
                      Change Setting
                    </p>
                  </Link>
                </div>
                <p className="cardDetail__lower__detail__ring__price">
                  {"$" + product.coverPrice}
                </p>
              </div>
              <Divider />
              <div
                style={{ display: "flex", justifyContent: "space-between" }}
                className="cardDetail__lower__detail__diamond"
              >
                <svg
                  viewBox="0 0 26 16"
                  fill="none"
                  width={30}
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
                  <Link to="/diamond-search">
                    <p className="cardDetail__lower__detail__ring__change">
                      Change Diamond
                    </p>
                  </Link>
                </div>
                <p className="cardDetail__lower__detail__ring__price">
                  {"$" + product.diamondPrice}
                </p>
              </div>
            </Flex>
          </Flex>
        </Flex>
        <div
          className="cardDetail__lower__total"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div className="">
            Quantity
            <input
              min={1}
              value={productQuantity}
              type="number"
              max={5}
              onChange={(e) => handleQuantity(e)}
              onKeyDown={(e) => e.preventDefault()}
              onKeyUp={(e) => e.preventDefault()}
            />
          </div>
          <p>{"$" + productTotalPrice}</p>
        </div>
      </Card>
    </div>
  );
}

export default CardDetail;

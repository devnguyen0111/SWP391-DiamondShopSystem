import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ShoppingCart.scss";
import {
  Button,
  Card,
  Col,
  Divider,
  Flex,
  Row,
  Skeleton,
  Typography,
} from "antd";
import {
  DownOutlined,
  MessageOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import CardDetail from "../../components/cardDetail/CardDetail";
import { jwtDecode } from "jwt-decode";
import CartItemSkeleton from "../../components/cartItemSkeleton/CartItemSkeleton";
import { token } from "../../components/getToken";
import EmptyCart from "../../components/emptyCart/EmptyCart";

function ShoppingCart() {
  const [show, setShow] = useState(false);
  const [userID, setUserID] = useState(token && token.UserID);
  const [cart, setCart] = useState();
  const [cartTotalPrice, setCartTotalPrice] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [remove, setRemove] = useState(false)
  if (token) {
    useEffect(() => {
      fetch(`https://localhost:7262/api/Cart/${userID}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setCart(data);
          setCartTotalPrice(data.totalPrice);
          setIsLoading(false);
          });
    }, [remove]);
  }

  return (
    <div>
      <p id="first">
        <Link to="/">Home</Link> <span> / Shopping Cart</span>
      </p>
      <div>
        <Row
          gutter={[32, 16]}
          style={{
            backgroundColor: "#FBFBFB",
            minHeight: "100vh",
            padding: "4em",
          }}
        >
          <Col span={12} md={3} sm={0}>
            {/* khong code cho nay */}
          </Col>
          <Col span={12} md={12} sm={24}>
            <h5 className="title">
              MY CART {cart && "(" + cart.quantity + ")"}
            </h5>

            <Row gutter={[32, 16]}>
              {cart &&
                token &&
                (isLoading ? (
                  <Col span={12} md={24} sm={24}>
                    <CartItemSkeleton />
                  </Col>
                ) : (
                  cart.items.$values.map((product, i) => (
                    <Col key={product.pid} span={12} md={24} sm={24}>
                      <CardDetail
                        product={product}
                        userID={userID}
                        setCartTotalPrice={setCartTotalPrice}
                        setRemove={setRemove}
                      />
                    </Col>
                  ))
                ))}
            </Row>
          </Col>
          {/* Sumarry */}
          {cart && token && cart.items.$values.length > 0 ? (
            isLoading ? (
              <Col style={{ marginTop: "48px" }} span={12} md={6} sm={24}>
                <Skeleton />
              </Col>
            ) : (
              <Col span={12} md={6} sm={24}>
                <h5 className="title">SUMMARY</h5>
                <Card hoverable className="orderSummary">
                  <Flex vertical>
                    <Flex justify="space-between">
                      <div>
                        <p>Subtotal</p>
                        <p>US & Int. Shipping</p>
                      </div>
                      <div>
                        <p>{cart && "$" + cart.totalPrice}</p>
                        <p>Free</p>
                      </div>
                    </Flex>
                    <Divider />

                    <Flex vertical justify="space-between">
                      <p className="orderSummary__text">
                        Taxes/Duties Estimate
                      </p>
                      <p className="orderSummary__text"> ONTARIO, CANADA</p>
                      <div className="orderSummary__dropdown">
                        <div>
                          <Flex justify="space-between">
                            <div>
                              <p>
                                {" "}
                                $821.67 - Charged Upon Delivery{" "}
                                <span>
                                  <DownOutlined
                                    className="orderSummary__dropdown__icon"
                                    style={{ fontSize: "10px" }}
                                    onClick={() => setShow(!show)}
                                  />
                                </span>
                              </p>

                              <div>
                                <Flex vertical>
                                  <Flex
                                    justify="space-between"
                                    className="orderSummary__dropdown__detail"
                                  >
                                    <div>
                                      <p>Duty</p>
                                      <p>GST</p>
                                      <p>Duty</p>
                                      <p>HST</p>
                                    </div>
                                    <div>
                                      <p> $0</p>
                                      <p>$279.28</p>
                                      <p> $95.55</p>
                                      <p>$446.84</p>
                                    </div>
                                  </Flex>
                                </Flex>
                              </div>
                            </div>
                          </Flex>
                        </div>
                      </div>
                    </Flex>

                    <Divider />
                    <Flex vertical>
                      <Flex justify="space-between">
                        <div>
                          <h5 className="orderSummary__total">Total</h5>
                          <Typography>
                            or interest-free installments <br />
                            from $1,830 / mo.
                          </Typography>
                        </div>

                        <h5 className="orderSummary__total">
                          {cart && "$" + cartTotalPrice}
                        </h5>
                      </Flex>
                    </Flex>
                    <Divider />
                    <div className="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 19.55 13"
                        width={15}
                        height={10}
                        class="customerUi__sc-miaqb0-1 iTcdwm"
                      >
                        <path d="M19.55 9.6V8.54a1.23 1.23 0 0 0-.93-1c-.34-.12-.66-.27-1-.42a.72.72 0 0 1-.25-.24c-.35-.67-.7-1.35-1-2a1.88 1.88 0 0 0-1.83-1.18h-1.85a.09.09 0 0 1-.09-.09V1.84A1.85 1.85 0 0 0 11.2.07a2.64 2.64 0 0 0-.63-.07H2a1.91 1.91 0 0 0-2 1.64s0 5.22 0 8v2a1 1 0 0 0 .78.86 4.34 4.34 0 0 0 .52.09.08.08 0 0 1 .08.08 2.32 2.32 0 0 0 .86 1.82 2.41 2.41 0 0 0 1.55.51 2.37 2.37 0 0 0 2.3-2.36.09.09 0 0 1 .09-.08h7a.09.09 0 0 1 .08.08 2.36 2.36 0 0 0 4.72 0 .08.08 0 0 1 .07-.08c.18 0 .56 0 .72-.09a1 1 0 0 0 .78-.86c0-.12.01-.61 0-2.01ZM3.73 14.07a1.45 1.45 0 0 1-1.43-1.5 1.44 1.44 0 0 1 2.87.08 1.45 1.45 0 0 1-1.44 1.42Zm8-5.42v2.88a.09.09 0 0 1-.09.09H6.06a.28.28 0 0 1-.29-.17 2.22 2.22 0 0 0-2-1.18 2.24 2.24 0 0 0-2 1.19c-.09.16-.3.21-.59.15s-.19-.19-.19-.34V1.94a1 1 0 0 1 .7-1A1.55 1.55 0 0 1 2 .92h8.63A1 1 0 0 1 11.7 2c-.02 1.75-.02 6.65-.02 6.65Zm4 5.42h-.09a1.44 1.44 0 0 1 0-2.87h.05a1.45 1.45 0 1 1 0 2.89Zm3-4.17v1.37c0 .15 0 .3-.2.34s-.7 0-.79-.15a2.35 2.35 0 0 0-4.08 0 .28.28 0 0 1-.29.17h-.67a.09.09 0 0 1-.09-.09V4.61h2.14a.78.78 0 0 1 .68.41c.31.56.6 1.13.9 1.7s.43 1 .9 1.13.77.34 1.17.5.25.33.25.52v1Z"></path>
                        <path d="m16.25 8-.63-1.37a.36.36 0 0 0-.53-.12.43.43 0 0 0 0 .56l.34.81h-1.36c-.2 0-.41.07-.41.34s.11.37.49.37H16a.32.32 0 0 0 .36-.43 1 1 0 0 0-.11-.16Z"></path>
                      </svg>
                      <span
                        className="orderSummary__text"
                        style={{ paddingLeft: "0.5em" }}
                      >
                        Free Overnight Shipping,
                        <br /> Hassle-Free Returns
                      </span>
                    </div>
                    <p className="orderSummary__text">
                      Ships by:{" "}
                      <span className="orderSummary__text__inside">
                        Tuesday, June 4
                      </span>
                    </p>

                    <img
                      src="https://ion.bluenile.com/images/ShipsInTime/bluenile/itemPage/byFastShipping.svg"
                      alt=""
                      className="orderSummary__pic"
                      style={{ width: "60%" }}
                    />
                    <Button className="orderSummary__button">
                      <Link style={{ width: "100%" }} to={`/checkout/${userID}`}>
                        CHECKOUT
                      </Link>
                    </Button>
                    <Divider>OR</Divider>
                    <Button style={{ backgroundColor: "#0070BA" }}>
                      <img
                        style={{
                          objectFit: "cover",
                          height: "90%",
                          marginTop: "0.2em",
                        }}
                        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAxcHgiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAxMDEgMzIiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHhtbG5zPSJodHRwOiYjeDJGOyYjeDJGO3d3dy53My5vcmcmI3gyRjsyMDAwJiN4MkY7c3ZnIj48cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNIDEyLjIzNyAyLjggTCA0LjQzNyAyLjggQyAzLjkzNyAyLjggMy40MzcgMy4yIDMuMzM3IDMuNyBMIDAuMjM3IDIzLjcgQyAwLjEzNyAyNC4xIDAuNDM3IDI0LjQgMC44MzcgMjQuNCBMIDQuNTM3IDI0LjQgQyA1LjAzNyAyNC40IDUuNTM3IDI0IDUuNjM3IDIzLjUgTCA2LjQzNyAxOC4xIEMgNi41MzcgMTcuNiA2LjkzNyAxNy4yIDcuNTM3IDE3LjIgTCAxMC4wMzcgMTcuMiBDIDE1LjEzNyAxNy4yIDE4LjEzNyAxNC43IDE4LjkzNyA5LjggQyAxOS4yMzcgNy43IDE4LjkzNyA2IDE3LjkzNyA0LjggQyAxNi44MzcgMy41IDE0LjgzNyAyLjggMTIuMjM3IDIuOCBaIE0gMTMuMTM3IDEwLjEgQyAxMi43MzcgMTIuOSAxMC41MzcgMTIuOSA4LjUzNyAxMi45IEwgNy4zMzcgMTIuOSBMIDguMTM3IDcuNyBDIDguMTM3IDcuNCA4LjQzNyA3LjIgOC43MzcgNy4yIEwgOS4yMzcgNy4yIEMgMTAuNjM3IDcuMiAxMS45MzcgNy4yIDEyLjYzNyA4IEMgMTMuMTM3IDguNCAxMy4zMzcgOS4xIDEzLjEzNyAxMC4xIFoiPjwvcGF0aD48cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNIDM1LjQzNyAxMCBMIDMxLjczNyAxMCBDIDMxLjQzNyAxMCAzMS4xMzcgMTAuMiAzMS4xMzcgMTAuNSBMIDMwLjkzNyAxMS41IEwgMzAuNjM3IDExLjEgQyAyOS44MzcgOS45IDI4LjAzNyA5LjUgMjYuMjM3IDkuNSBDIDIyLjEzNyA5LjUgMTguNjM3IDEyLjYgMTcuOTM3IDE3IEMgMTcuNTM3IDE5LjIgMTguMDM3IDIxLjMgMTkuMzM3IDIyLjcgQyAyMC40MzcgMjQgMjIuMTM3IDI0LjYgMjQuMDM3IDI0LjYgQyAyNy4zMzcgMjQuNiAyOS4yMzcgMjIuNSAyOS4yMzcgMjIuNSBMIDI5LjAzNyAyMy41IEMgMjguOTM3IDIzLjkgMjkuMjM3IDI0LjMgMjkuNjM3IDI0LjMgTCAzMy4wMzcgMjQuMyBDIDMzLjUzNyAyNC4zIDM0LjAzNyAyMy45IDM0LjEzNyAyMy40IEwgMzYuMTM3IDEwLjYgQyAzNi4yMzcgMTAuNCAzNS44MzcgMTAgMzUuNDM3IDEwIFogTSAzMC4zMzcgMTcuMiBDIDI5LjkzNyAxOS4zIDI4LjMzNyAyMC44IDI2LjEzNyAyMC44IEMgMjUuMDM3IDIwLjggMjQuMjM3IDIwLjUgMjMuNjM3IDE5LjggQyAyMy4wMzcgMTkuMSAyMi44MzcgMTguMiAyMy4wMzcgMTcuMiBDIDIzLjMzNyAxNS4xIDI1LjEzNyAxMy42IDI3LjIzNyAxMy42IEMgMjguMzM3IDEzLjYgMjkuMTM3IDE0IDI5LjczNyAxNC42IEMgMzAuMjM3IDE1LjMgMzAuNDM3IDE2LjIgMzAuMzM3IDE3LjIgWiI+PC9wYXRoPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik0gNTUuMzM3IDEwIEwgNTEuNjM3IDEwIEMgNTEuMjM3IDEwIDUwLjkzNyAxMC4yIDUwLjczNyAxMC41IEwgNDUuNTM3IDE4LjEgTCA0My4zMzcgMTAuOCBDIDQzLjIzNyAxMC4zIDQyLjczNyAxMCA0Mi4zMzcgMTAgTCAzOC42MzcgMTAgQyAzOC4yMzcgMTAgMzcuODM3IDEwLjQgMzguMDM3IDEwLjkgTCA0Mi4xMzcgMjMgTCAzOC4yMzcgMjguNCBDIDM3LjkzNyAyOC44IDM4LjIzNyAyOS40IDM4LjczNyAyOS40IEwgNDIuNDM3IDI5LjQgQyA0Mi44MzcgMjkuNCA0My4xMzcgMjkuMiA0My4zMzcgMjguOSBMIDU1LjgzNyAxMC45IEMgNTYuMTM3IDEwLjYgNTUuODM3IDEwIDU1LjMzNyAxMCBaIj48L3BhdGg+PHBhdGggZmlsbD0iI2ZmZmZmZiIgZD0iTSA2Ny43MzcgMi44IEwgNTkuOTM3IDIuOCBDIDU5LjQzNyAyLjggNTguOTM3IDMuMiA1OC44MzcgMy43IEwgNTUuNzM3IDIzLjYgQyA1NS42MzcgMjQgNTUuOTM3IDI0LjMgNTYuMzM3IDI0LjMgTCA2MC4zMzcgMjQuMyBDIDYwLjczNyAyNC4zIDYxLjAzNyAyNCA2MS4wMzcgMjMuNyBMIDYxLjkzNyAxOCBDIDYyLjAzNyAxNy41IDYyLjQzNyAxNy4xIDYzLjAzNyAxNy4xIEwgNjUuNTM3IDE3LjEgQyA3MC42MzcgMTcuMSA3My42MzcgMTQuNiA3NC40MzcgOS43IEMgNzQuNzM3IDcuNiA3NC40MzcgNS45IDczLjQzNyA0LjcgQyA3Mi4yMzcgMy41IDcwLjMzNyAyLjggNjcuNzM3IDIuOCBaIE0gNjguNjM3IDEwLjEgQyA2OC4yMzcgMTIuOSA2Ni4wMzcgMTIuOSA2NC4wMzcgMTIuOSBMIDYyLjgzNyAxMi45IEwgNjMuNjM3IDcuNyBDIDYzLjYzNyA3LjQgNjMuOTM3IDcuMiA2NC4yMzcgNy4yIEwgNjQuNzM3IDcuMiBDIDY2LjEzNyA3LjIgNjcuNDM3IDcuMiA2OC4xMzcgOCBDIDY4LjYzNyA4LjQgNjguNzM3IDkuMSA2OC42MzcgMTAuMSBaIj48L3BhdGg+PHBhdGggZmlsbD0iI2ZmZmZmZiIgZD0iTSA5MC45MzcgMTAgTCA4Ny4yMzcgMTAgQyA4Ni45MzcgMTAgODYuNjM3IDEwLjIgODYuNjM3IDEwLjUgTCA4Ni40MzcgMTEuNSBMIDg2LjEzNyAxMS4xIEMgODUuMzM3IDkuOSA4My41MzcgOS41IDgxLjczNyA5LjUgQyA3Ny42MzcgOS41IDc0LjEzNyAxMi42IDczLjQzNyAxNyBDIDczLjAzNyAxOS4yIDczLjUzNyAyMS4zIDc0LjgzNyAyMi43IEMgNzUuOTM3IDI0IDc3LjYzNyAyNC42IDc5LjUzNyAyNC42IEMgODIuODM3IDI0LjYgODQuNzM3IDIyLjUgODQuNzM3IDIyLjUgTCA4NC41MzcgMjMuNSBDIDg0LjQzNyAyMy45IDg0LjczNyAyNC4zIDg1LjEzNyAyNC4zIEwgODguNTM3IDI0LjMgQyA4OS4wMzcgMjQuMyA4OS41MzcgMjMuOSA4OS42MzcgMjMuNCBMIDkxLjYzNyAxMC42IEMgOTEuNjM3IDEwLjQgOTEuMzM3IDEwIDkwLjkzNyAxMCBaIE0gODUuNzM3IDE3LjIgQyA4NS4zMzcgMTkuMyA4My43MzcgMjAuOCA4MS41MzcgMjAuOCBDIDgwLjQzNyAyMC44IDc5LjYzNyAyMC41IDc5LjAzNyAxOS44IEMgNzguNDM3IDE5LjEgNzguMjM3IDE4LjIgNzguNDM3IDE3LjIgQyA3OC43MzcgMTUuMSA4MC41MzcgMTMuNiA4Mi42MzcgMTMuNiBDIDgzLjczNyAxMy42IDg0LjUzNyAxNCA4NS4xMzcgMTQuNiBDIDg1LjczNyAxNS4zIDg1LjkzNyAxNi4yIDg1LjczNyAxNy4yIFoiPjwvcGF0aD48cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNIDk1LjMzNyAzLjMgTCA5Mi4xMzcgMjMuNiBDIDkyLjAzNyAyNCA5Mi4zMzcgMjQuMyA5Mi43MzcgMjQuMyBMIDk1LjkzNyAyNC4zIEMgOTYuNDM3IDI0LjMgOTYuOTM3IDIzLjkgOTcuMDM3IDIzLjQgTCAxMDAuMjM3IDMuNSBDIDEwMC4zMzcgMy4xIDEwMC4wMzcgMi44IDk5LjYzNyAyLjggTCA5Ni4wMzcgMi44IEMgOTUuNjM3IDIuOCA5NS40MzcgMyA5NS4zMzcgMy4zIFoiPjwvcGF0aD48L3N2Zz4"
                      />
                    </Button>

                    <div>
                      <p
                        className="orderSummary__text"
                        style={{ marginTop: "2em", color: "grey" }}
                      >
                        We Accept
                      </p>
                      <Flex gap={5}>
                        <img
                          src="https://ion.bluenile.com/images/ShoppingCart/pay_by_visa.svg"
                          style={{ width: "15%" }}
                        />
                        <img
                          src="https://ion.bluenile.com/images/ShoppingCart/pay_by_master_card.svg"
                          style={{ width: "15%" }}
                        />
                        <img
                          src="https://ion.bluenile.com/images/ShoppingCart/pay_by_american_express.svg"
                          style={{ width: "15%" }}
                        />
                        <img
                          src="https://ion.bluenile.com/images/ShoppingCart/pay_by_discover.svg"
                          style={{ width: "15%" }}
                        />
                        <img
                          src="https://ion.bluenile.com/images/ShoppingCart/pay_by_paypal.svg"
                          style={{ width: "15%" }}
                        />
                        <img
                          src="https://ion.bluenile.com/images/ShoppingCart/pay_by_wire_transfer.svg"
                          style={{ width: "15%" }}
                        />
                      </Flex>
                    </div>
                  </Flex>
                </Card>
              </Col>
            )
          ) : (
            <Col span={24}>
              <EmptyCart />
            </Col>
          )}

          <Col span={12} md={3} sm={0}>
            {/* khong code cho nay */}
          </Col>
        </Row>

        {/* <Row>
          <Col md={5}></Col>
          <Col md={8} sm={24}>
            <Row className="information">
              <Col md={8} sm={24} className="information__left">
                <h5>SHIPPING</h5>
                <p>
                  - Free Shipping Worldwide
                  <br />
                  - Overnight Shipping Order Tracking
                  <br />- Everystep of the way More Info...
                </p>
              </Col>
              <Col md={8}></Col>
              <Col md={8} sm={24}>
                <h5>RETURNS</h5>
                <p>
                  - 100% Money Back Guarantee
                  <br />
                  - Free returns from the US & Canada
                  <br />- Fully Insured Returns
                </p>
              </Col>
            </Row>
          </Col>
          <Col md={10} sm={24}>
            <div className="information__right">
              <h5>24/7 Customer Service</h5>
              <div className="information__right__lower">
                <p>
                  <PhoneOutlined style={{ marginRight: "0.5em" }} />
                  1-800-242-2728
                </p>
                <p>
                  <MessageOutlined style={{ marginRight: "0.5em" }} />
                  Chat With Us
                </p>
              </div>
            </div>
          </Col>
          <Col md={1}></Col>
        </Row> */}

        <Row align={"bottom"}>
          <Col span={12} md={4} sm={5}>
            {/* khong code cho nay */}
          </Col>

          <Col span={12} md={4} sm={7}>
            <h5 className="informationLeft__title">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 38.22 27.97"
                width="31"
                height="22"
                fill="#b2b2b2"
              >
                <rect
                  x="25.96"
                  y="12.76"
                  width="5.68"
                  height="1.51"
                  rx="0.75"
                ></rect>
                <path d="m30.25 13.91-1.35-2.39a.76.76 0 0 1 .24-1 .76.76 0 0 1 1 .24l1.34 2.39a.76.76 0 0 1-.23 1 .76.76 0 0 1-1-.24Z"></path>
                <path d="M36.12 12.56s-1.83-.42-2.17-1L31.73 8a4.07 4.07 0 0 0-3.33-2.35h-4V.91a.91.91 0 0 0-.95-.91H.2a.2.2 0 0 0-.2.2v1.24a.2.2 0 0 0 .2.2h21.88a.7.7 0 0 1 .7.7v18.49a.45.45 0 0 1-.45.45H11.89a4.69 4.69 0 0 0-8.5 0h-1A.39.39 0 0 1 2 20.9v-5.45a.21.21 0 0 0-.2-.21H.38a.21.21 0 0 0-.2.21v5.32c0 1.62.1 2.23 1.38 2.23h1.38a7.44 7.44 0 0 0 .25 1.33A4.68 4.68 0 0 0 7.81 28a4.69 4.69 0 0 0 4.51-4.67v-.23h13.05v.07a4.78 4.78 0 0 0 3.91 4.76 4.7 4.7 0 0 0 5.48-4.61v-.23h1.17a2.29 2.29 0 0 0 2.29-2.28v-5.69c0-1.38-.58-2.12-2.1-2.56Zm-25.6 9.58a3.1 3.1 0 0 1-4 4 3.14 3.14 0 0 1-1.73-1.74 3.09 3.09 0 0 1 4-4 3.14 3.14 0 0 1 1.73 1.74Zm19.56 4.26a3.11 3.11 0 1 1 3.11-3.11 3.11 3.11 0 0 1-3.11 3.11Zm6.53-10.83v5.22c0 .27-.42.49-.7.49h-1.58a4.69 4.69 0 0 0-8.5 0h-.95a.51.51 0 0 1-.52-.51V7.26h4a2.19 2.19 0 0 1 2 1.39l2.67 4.5a1.17 1.17 0 0 0 .47.38l2.18.73a1.32 1.32 0 0 1 .93 1.31Z"></path>
                <path d="M0 10.85V5.69h3.51v.9H1.15v1.18h2.21v.9H1.15v2.18ZM8.8 10.85H7.56l-.9-1.65a.68.68 0 0 0-.26-.27.75.75 0 0 0-.4-.09h-.55v2H4.32V5.69h2.37a2 2 0 0 1 1.37.4 1.43 1.43 0 0 1 .47 1.15 1.47 1.47 0 0 1-.33 1 1.53 1.53 0 0 1-.92.52 1.15 1.15 0 0 1 .72.56Zm-1.57-3a.65.65 0 0 0 .22-.54.62.62 0 0 0-.22-.54 1.11 1.11 0 0 0-.71-.17H5.43V8h1.09a1.17 1.17 0 0 0 .71-.19ZM9.56 10.85V5.69h3.56v.88h-2.45v1.21H13v.89h-2.3V10h2.45v.89ZM14 10.85V5.69h3.56v.88h-2.43v1.21h2.29v.89h-2.29V10h2.44v.89Z"></path>
              </svg>
              <span style={{ marginLeft: "1em" }}>SHIPPING</span>
            </h5>
            <p className="informationLeft__detail">
              - Free Shipping Worldwide
              <br />
              - Overnight Shipping Order Tracking
              <br />- Everystep of the way
            </p>
          </Col>
          <Col span={12} md={2} sm={0}>
            {/* khong code cho nay */}
          </Col>
          <Col span={12} md={4} sm={8}>
            <h5 className="informationLeft__title">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 29.97 30.69"
                width="31"
                height="31"
                fill="#b2b2b2"
              >
                <path d="M7.77 20.82v1.23a3.7 3.7 0 0 1 0 7.4v1.24a4.94 4.94 0 0 0 0-9.87ZM4.12 18.72l-3.09 3.15L.18 21l3.09-3.15.85.87z"></path>
                <ellipse cx="0.6" cy="21.44" rx="0.6" ry="0.62"></ellipse>
                <ellipse cx="3.69" cy="18.29" rx="0.6" ry="0.62"></ellipse>
                <path d="M4.12 24.15 1.03 21l-.85.87 3.09 3.15.85-.87z"></path>
                <ellipse cx="0.6" cy="21.44" rx="0.6" ry="0.62"></ellipse>
                <ellipse cx="3.69" cy="24.58" rx="0.6" ry="0.62"></ellipse>
                <path d="M.6 20.82h7.16v1.23H.6z"></path>
                <ellipse cx="0.6" cy="21.44" rx="0.6" ry="0.62"></ellipse>
                <ellipse cx="7.77" cy="21.44" rx="0.6" ry="0.62"></ellipse>
                <path d="M.6 29.45h7.16v1.23H.6z"></path>
                <ellipse cx="0.6" cy="30.07" rx="0.6" ry="0.62"></ellipse>
                <ellipse cx="7.77" cy="30.07" rx="0.6" ry="0.62"></ellipse>
                <path d="M30 6.64a.67.67 0 0 0-.07-.31.74.74 0 0 0-.58-.33L16.11.07a.89.89 0 0 0-.68 0L2.06 6a.71.71 0 0 0-.44.62v9.32h1.56V7.79L15 13v14.9l.44.19H16.12l13.41-5.94a.73.73 0 0 0 .47-.65V6.64ZM15.77 1.5l11.59 5.15-4.27 1.89L11.5 3.4Zm5.53 7.83-5.53 2.46-11.6-5.14 5.54-2.46M28.4 21.05l-11.85 5.26V13l5.11-2.27 2-.88 4.74-2.08Z"></path>
                <path d="M27.18 19.84v-3.25a.28.28 0 0 0-.42-.24l-.37.29a.26.26 0 0 0-.14.24v2.47a.3.3 0 0 1-.17.26l-2.5 1.05a.26.26 0 0 0-.16.25v.9l3.46-1.53a.49.49 0 0 0 .3-.44Z"></path>
              </svg>

              <span style={{ marginLeft: "1em" }}>RETURNS</span>
            </h5>
            <p className="informationLeft__detail">
              - 100% Money Back Guarantee
              <br />
              - Free returns from the US & Canada
              <br />- Fully Insured Returns
            </p>
          </Col>
          <Col span={12} md={9} sm={24}>
            <div className="information__right">
              <h5>24/7 Customer Service</h5>
              <div className="information__right__lower">
                <p>
                  <PhoneOutlined style={{ marginRight: "0.5em" }} />
                  1-800-242-2728
                </p>
                <p>
                  <MessageOutlined style={{ marginRight: "0.5em" }} />
                  Chat With Us
                </p>
              </div>
            </div>
          </Col>

          <Col span={12} md={1} sm={0}>
            {/* khong code cho nay */}
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ShoppingCart;

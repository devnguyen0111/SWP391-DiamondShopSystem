import {
  Button,
  Card,
  Col,
  ConfigProvider,
  Divider,
  Row,
  Typography,
} from "antd";
import React from "react";
import "./CardWishlist.scss";
import { Link } from "react-router-dom";

function CardWishlist() {
  return (
    <div>
      <Card hoverable className="cardWishlist">
        <div className="cardWishlist__header">
          <p>Engagement Ring (Completed)</p>
          <Button type="text" className="cardWishlist__header__button">
            X
          </Button>
        </div>

        <img
          src="https://ion.bluenile.com/sets/Jewelry-bn/194386/RND/Images/stage.jpg"
          style={{ width:"80%"}}
        />
        <div className="cardWishlist__detail">
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
            className="cardWishlist__detail__ring"
          >
            <svg
              viewBox="0 2 26 15"
              fill="none"
              width={55}
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
              <p className="cardWishlist__detail__ring__name">
                1.00 Carat H-VS2 Excellent Cut Round Diamond Excellent Cut • H
                Color • VS2 Clarity • Stock #: 20241044
              </p>
              <Link to="/setting-search">
                <p className="cardWishlist__detail__ring__change">
                  Change Setting
                </p>
              </Link>
            </div>
            <p className="cardWishlist__detail__ring__price">$2,300</p>
          </div>
          <Divider />
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
            className="cardWishlist__detail__diamond"
          >
            <svg
              viewBox="0 0 26 16"
              fill="none"
              width={35}
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
              <p className="cardWishlist__detail__ring__name">
                Petite Solitaire Engagement Ring in 14k White Gold Stock #:
                501130w14
              </p>
              <Link to="/diamond-search">
                <p className="cardWishlist__detail__ring__change">
                  Change Diamond
                </p>
              </Link>
            </div>
            <p className="cardWishlist__detail__ring__price">$2,370</p>
          </div>
          <Divider />
          <div className="cardWishlist__total">
            <h1>Total:</h1>
            <p className="cardWishlist__total">$4,670</p>
          </div>

          <div className="cardWishlist__button">
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    defaultActiveBg: " rgb(27, 27, 27)",
                    defaultColor: " rgb(27, 27, 27)",
                    defaultHoverBg: " rgb(27, 27, 27)",
                    defaultHoverBorderColor: " rgb(27, 27, 27)",
                    defaultHoverColor: "white",
                  },
                },
              }}
            >
              <Button className="cardWishlist__button__left">View item</Button>
            </ConfigProvider>

            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    defaultBg: " rgb(27, 27, 27)",
                    defaultColor: "white",
                    defaultHoverBg: "white",
                    defaultHoverBorderColor: "black",
                    defaultHoverColor: "black",
                  },
                },
              }}
            >
              <Button className="cardWishlist__button__right">
                Add to cart
              </Button>
            </ConfigProvider>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CardWishlist;

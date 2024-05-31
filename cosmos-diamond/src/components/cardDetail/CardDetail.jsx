import { Button, Card, Divider, Flex, Typography } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CardDetail.scss";

function CardDetail() {
  const navigate = useNavigate();
  const imgStyle = {
    display: "block",
    width: "30%",
  };
  return (
    <div>
      <Card hoverable className="cardDetail">
        <Flex vertical>
          <Flex justify="space-between" className="cardDetail__upper">
            <h5>Engagement Ring (Completed)</h5>
            <Flex gap={5}>
              <p onClick={() => navigate("/complete-product")}>View |</p>
              <p>Remove</p>
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
                    1.00 Carat H-VS2 Excellent Cut Round Diamond Excellent Cut •
                    H Color • VS2 Clarity • Stock #: 20241044
                  </p>
                  <Link to="/setting-search">
                    <p className="cardDetail__lower__detail__ring__change">
                      Change Setting
                    </p>
                  </Link>
                </div>
                <p className="cardDetail__lower__detail__ring__price">$2,300</p>
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
                    Petite Solitaire Engagement Ring in 14k White Gold Stock #:
                    501130w14
                  </p>
                  <Link to="/diamond-search">
                    <p className="cardDetail__lower__detail__ring__change">
                      Change Diamond
                    </p>
                  </Link>
                </div>
                <p className="cardDetail__lower__detail__ring__price">$2,370</p>
              </div>
            </Flex>
          </Flex>
        </Flex>
        <p
          className="cardDetail__lower__total"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          $5,240
        </p>
      </Card>
    </div>
  );
}

export default CardDetail;

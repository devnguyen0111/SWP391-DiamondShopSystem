import React, { useEffect, useState } from "react";
import "./DiamondDetailComponent.scss";

import { Col, Row, notification, Flex, Button, Modal } from "antd";
import { Link } from "react-router-dom";
import CustomModal from "../modal/Modal";
import { disableScroll } from "../disableScroll";

import Image from "./../Image";
import GiaReport from './../GIAreport/GiaReport';
function DiamondDetailComponent({ product }) {
  console.log(product);
  const [modal2Open, setModal2Open] = useState(false);

  const [show, setShow] = useState(false);
  const openModal = () => {
    setShow(true);
    disableScroll();
  };
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  const url = window.location.href;
  const productId = url.slice(url.lastIndexOf("/") + 1, url.length);
 

  return (
    <div className="detail" style={{marginTop:'70px'}}>
      <Row className="summary" gutter={[20, 16]}>
        <Col span={12} className="summary__left">
          <Col span={24}>
            <Link to={"/diamond-search"} className="summary__navigator">
              <i class="fa-solid fa-chevron-left"></i>
              <span className="" style={{ marginLeft: "4px" }}>
                Back to gallery
              </span>
            </Link>
          </Col>
          <Col span={24}>
            <div className="summary__img">
              <Image src={"/" + product.shape} />
            </div>
          </Col>
          <Col span={24}>
            <div className="summary__album">
              <Image src={"/" + product.shape} />
            </div>
          </Col>
          <Col span={24} className="summary__action">
            <div className="summary__item">
              <Flex justify="center" className="sumarry__action-icon">
                <img
                  src="https://ecommo--ion.bluenile.com/static-diamonds-bn/GIALogo.df3f5.png"
                  alt=""
                />
              </Flex>
              <div className="summary__action-name" onClick={()=> setModal2Open(true)}>GIA Report</div>
            </div>
          </Col>
          <Col className="summary__table">
            <table class="details-table">
              <tr>
                <th>Shape</th>
                <td>{product.shape}</td>
              </tr>
              <tr>
                <th>Color</th>
                <td>{product.color}</td>
              </tr>
              <tr>
                <th>Clarity</th>
                <td>{product.clarity}</td>
              </tr>
              <tr>
                <th>Cut</th>
                <td>{product.cut}</td>
              </tr>
              <tr>
                <th>Carat Weight</th>
                <td>{product.caratWeight}</td>
              </tr>
              <tr>
                <th>Certificate</th>
                <td>GIA</td>
              </tr>
            </table>
          </Col>
        </Col>
        <Col span={12} className="right">
          <Col span={24} className="right__name">
            {product && product.diamondName}
          </Col>

          <Col span={24}>
            <div className="right__sticker">
              <img
                src="https://ion.bluenile.com/images/ShipsInTime/bluenile/itemPage/byFastShipping.svg"
                alt=""
              />
            </div>
            <div className="right__shipping">
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 19.55 13"
                  width={20}
                  height={16}
                  class="customerUi__sc-miaqb0-1 iTcdwm"
                >
                  <path d="M19.55 9.6V8.54a1.23 1.23 0 0 0-.93-1c-.34-.12-.66-.27-1-.42a.72.72 0 0 1-.25-.24c-.35-.67-.7-1.35-1-2a1.88 1.88 0 0 0-1.83-1.18h-1.85a.09.09 0 0 1-.09-.09V1.84A1.85 1.85 0 0 0 11.2.07a2.64 2.64 0 0 0-.63-.07H2a1.91 1.91 0 0 0-2 1.64s0 5.22 0 8v2a1 1 0 0 0 .78.86 4.34 4.34 0 0 0 .52.09.08.08 0 0 1 .08.08 2.32 2.32 0 0 0 .86 1.82 2.41 2.41 0 0 0 1.55.51 2.37 2.37 0 0 0 2.3-2.36.09.09 0 0 1 .09-.08h7a.09.09 0 0 1 .08.08 2.36 2.36 0 0 0 4.72 0 .08.08 0 0 1 .07-.08c.18 0 .56 0 .72-.09a1 1 0 0 0 .78-.86c0-.12.01-.61 0-2.01ZM3.73 14.07a1.45 1.45 0 0 1-1.43-1.5 1.44 1.44 0 0 1 2.87.08 1.45 1.45 0 0 1-1.44 1.42Zm8-5.42v2.88a.09.09 0 0 1-.09.09H6.06a.28.28 0 0 1-.29-.17 2.22 2.22 0 0 0-2-1.18 2.24 2.24 0 0 0-2 1.19c-.09.16-.3.21-.59.15s-.19-.19-.19-.34V1.94a1 1 0 0 1 .7-1A1.55 1.55 0 0 1 2 .92h8.63A1 1 0 0 1 11.7 2c-.02 1.75-.02 6.65-.02 6.65Zm4 5.42h-.09a1.44 1.44 0 0 1 0-2.87h.05a1.45 1.45 0 1 1 0 2.89Zm3-4.17v1.37c0 .15 0 .3-.2.34s-.7 0-.79-.15a2.35 2.35 0 0 0-4.08 0 .28.28 0 0 1-.29.17h-.67a.09.09 0 0 1-.09-.09V4.61h2.14a.78.78 0 0 1 .68.41c.31.56.6 1.13.9 1.7s.43 1 .9 1.13.77.34 1.17.5.25.33.25.52v1Z"></path>
                  <path d="m16.25 8-.63-1.37a.36.36 0 0 0-.53-.12.43.43 0 0 0 0 .56l.34.81h-1.36c-.2 0-.41.07-.41.34s.11.37.49.37H16a.32.32 0 0 0 .36-.43 1 1 0 0 0-.11-.16Z"></path>
                </svg>
                <span>Free Overnight Shipping, Hassle-Free Returns</span>
              </div>

              <i class="fa-regular fa-heart right__wishlist"></i>
            </div>
          </Col>
          <Col span={24} className="right__tag-container">
            <div className="right__tag-wrapper">
              <div className="right__tag">{product.color}</div>
              <div className="right__tag">{product.clarity}</div>
              <div className="right__tag">{product.caratWeight}</div>
              <div className="right__tag">{product.cut}</div>
            </div>
          </Col>
          <Col span={24} className="right__price-wrapper">
            <div className="right__price">
              $<span>{product.price}</span>{" "}
            </div>
            <span className="right__price-text">(Diamond price)</span>
          </Col>
          <Col span={24}>
            <div className="right__notice">
              <i
                class="fa-solid fa-circle-info"
                style={{ marginRight: "4px" }}
              ></i>
              This price pertains solely to the diamond and does not include the
              cost of the entire piece of jewelry.
            </div>
          </Col>
          <Col span={24} className="right__button-wrapper">
            <button onClick={() => openModal()} className="right__button">
              Select This Diamond
            </button>
            <button className="right__button">Consult Expert</button>
          </Col>
          <Col span={24} className="include">
            <div className="include__header">Your Order Include:</div>
            <div className="include__item">
              <div className="include__img">
                <img
                  src="https://ecommo--ion.bluenile.com/static-diamonds-bn/trackFastShipping.2b103.png"
                  alt=""
                />
              </div>
              <div className="include__content">
                <h5 className="include__title">Free Shipping</h5>
                <div className="include__text">
                  We're committed to making your entire experience a pleasant
                  one, from shopping to shipping.
                </div>
              </div>
            </div>
            <div className="include__item">
              <div className="include__img">
                <img
                  src="https://ecommo--ion.bluenile.com/static-diamonds-bn/freeReturns.c7cd2.png"
                  alt=""
                />
              </div>
              <div className="include__content">
                <h5 className="include__title">Free Return</h5>
                <div className="include__text">
                  Our commitment to you does not end at delivery. We offer free
                  returns (U.S and Canada) to make your experience as easy as
                  possible.
                </div>
              </div>
            </div>
          </Col>
        </Col>
      </Row>
      <CustomModal show={show} setShow={setShow} diamond={product}></CustomModal>
      <Modal
        title="GIA Report"
        centered
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
        style={{minWidth: '1000px'}}
        footer={[
          <Button type="primary" key="back" onClick={()=>setModal2Open(false)}>
            OK
          </Button>
        ]}
      >
        <GiaReport product={product}/>
      </Modal>
    </div>
  );
}

export default DiamondDetailComponent;

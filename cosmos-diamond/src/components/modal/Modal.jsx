import React, { useEffect, useRef, useState } from "react";
import "./Modal.scss";
import { Col, Row } from "antd";
import { enableScroll } from "../disableScroll";
import { Link } from "react-router-dom";

function Modal({ show, setShow }) {
  const closeModal = () => {
    setShow(false);
    enableScroll();
  };
  const submitBtn = useRef(); 
  useEffect(() => {
    const settings = document.querySelectorAll(".setting-option__item");
    

    function handleSubmit() {
      console.log(submitBtn.current);
      settings.forEach((setting, index)=>{
        if(setting.children[1].classList.contains('active')){
            console.log(index);
        }
      })
        enableScroll();

    }
    
    submitBtn.current && submitBtn.current.addEventListener('click', handleSubmit )
    const handleClick = (event) => {
      // Remove 'active' class from all items
      settings.forEach((setting) => {
        setting.children[1].classList.remove("active");
      });

      // Add 'active' class to the clicked item
      const clickedSetting = event.currentTarget;
      clickedSetting.children[1].classList.add("active");
    };

    settings.forEach((setting) => {
      setting.addEventListener("click", handleClick);
    });

    return () => {
      settings.forEach((setting) => {
        setting.removeEventListener("click", handleClick);
      });
    };
  }, [show]);

  return (
    <>
      {show && (
        <div className="setting-option">
          <Row style={{ width: "100%" }}>
            <Col span={3}>
              <div onClick={closeModal} className="setting-option__back">
                <i class="fa-solid fa-arrow-left"></i> Back
              </div>
            </Col>
            <Col span={24}>
              <div className="setting-option__header">Add this diamond to</div>
            </Col>
            <Col
              style={{
                opacity: 0.7,
                fontFamily: "Gantari",
                marginBottom: "50px",
              }}
            >
              Choose one of the options below to complete your selection.
            </Col>
            <Col span={24}>
              <ul className="setting-option__list">
                <li className="setting-option__item">
                  <div className="setting-option__right">
                    <div className="setting-option__name">
                      <svg
                        viewBox="0 8 26 15"
                        fill="none"
                        width={28}
                        height={35}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 5.878c-4.694 0-8.5 3.833-8.5 8.56C1.5 19.169 5.306 23 10 23s8.5-3.833 8.5-8.561-3.806-8.561-8.5-8.561Zm0 0L4.673 1M10 5.878 15.327 1"
                          stroke="#151542"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      <span>Ring Setting</span>
                    </div>
                    <div className="setting-option__description">
                      Choose a ring to match this diamond.
                    </div>
                  </div>
                  <i class="fa-solid fa-circle-check setting-option__check active"></i>
                </li>
                <li className="setting-option__item">
                  <div className="setting-option__right">
                    <div className="setting-option__name">
                      <svg
                        viewBox="0 0 26 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        width={28}
                        height={35}
                      >
                        <path
                          d="M6.053 16.5v-6.412m0 0V6.065m0 4.023C2.684 10.088 1 9.403 1 11.458c0 1.781 1.684 2.738 2.807 2.053m2.246-3.423c3.368 0 5.052-.685 5.052 1.37 0 2.053-1.684 2.738-2.807 2.053M6.053 6.065l4.42-4.565m-4.42 4.565L1.632 1.5m18.315 15v-6.412m0 0V6.065m0 4.023c-3.368 0-5.052-.685-5.052 1.37 0 1.781 1.684 2.738 2.807 2.053m2.245-3.423c3.369 0 5.053-.685 5.053 1.37 0 2.053-1.684 2.738-2.807 2.053m-2.246-7.446L24.368 1.5m-4.42 4.565L15.525 1.5"
                          stroke="#151542"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      <span>Earrings Setting</span>
                    </div>
                    <div className="setting-option__description">
                      Choose a earrings to match this diamond.
                    </div>
                  </div>
                  <i class="fa-solid fa-circle-check setting-option__check "></i>
                </li>
                <li className="setting-option__item">
                  <div className="setting-option__right">
                    <div className="setting-option__name">
                      <svg
                        width={28}
                        height={35}
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="-6 5 26 18"
                      >
                        <path
                          d="M1 1.003a15.473 15.473 0 0 0 8.04 2.392A15.052 15.052 0 0 0 17 1M8.955 7.505C3.637 14.761 1.64 20.07 3.026 23.291c.807 1.874 2.846 3.124 6.076 3.709 3.162-.583 5.092-1.771 5.883-3.624 1.37-3.214-.656-8.549-6.03-15.876M5.594 20.15l3.41 3.6 3.512-3.6-3.512-7.108-3.41 7.108ZM10.6 5.875C10.6 6.772 9.884 7.5 9 7.5c-.884 0-1.6-.728-1.6-1.625S8.116 4.25 9 4.25c.884 0 1.6.728 1.6 1.625Z"
                          stroke="#151542"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      <span>Pendant Setting</span>
                    </div>
                    <div className="setting-option__description">
                      Choose a pendant to match this diamond.
                    </div>
                  </div>
                  <i class="fa-solid fa-circle-check setting-option__check"></i>
                </li>
              </ul>
            </Col>
          </Row>
          <Link 
            ref={submitBtn}
            to={"/setting-search"}
            className="setting-option__submit"
          >
            
            Continue
          </Link>
        </div>
      )}
      {show && <div onClick={() => closeModal()} className="modal"></div>}
    </>
  );
}

export default Modal;

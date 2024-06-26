import { CheckCircleOutlined, CheckCircleTwoTone } from "@ant-design/icons";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useNavigate } from "react-router-dom";

import './OrderFail.scss'

function OrderFail() {
    const nav = useNavigate()
  return (
    <>
      <div className="fail">
        <div className="fail__wrapper">
          <DotLottieReact
            src="https://lottie.host/b54b4fbb-c00b-490c-b978-7bce39dd982b/9dG906IB3p.json"
            speed="0.5"
            direction="1"
            playMode="normal"
            autoplay
            keepLastFrame
            className="fail__icon" 
          />
          <span className="fail__title">Transaction Fail</span>
          <p className="fail__content">Your recent transaction for the Cosmos Diamond failed. Please check your payment details and try again.</p>
          <p className="fail__contact">If the issue persists, contact your bank or our customer support team.</p>
          <div className="fail__btn">
            <button onClick={()=> nav("/shopping-cart")} className="fail__view">TRY AGAIN</button>
            <button onClick={()=> nav("/diamond-search")} className="fail__next">COUNTINUE SHOPPING</button>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default OrderFail;

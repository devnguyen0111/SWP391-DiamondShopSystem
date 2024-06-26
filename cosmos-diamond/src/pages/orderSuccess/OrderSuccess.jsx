import { CheckCircleOutlined, CheckCircleTwoTone } from "@ant-design/icons";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useNavigate } from "react-router-dom";

import "./OrderSuccess.scss";
import Fireworks from "@fireworks-js/react";






function OrderSuccess() {
    const nav = useNavigate()
  return (
    <>
      <div className="thanks">
        <div className="thanks__wrapper">
          <DotLottieReact
            src="https://lottie.host/c6baa1f1-473d-4b52-86b9-3118136708e0/6mdtVDh1yB.json"
            speed="1"
            direction="1"
            playMode="normal"
            autoplay
            className="thanks__icon" 
          />
          <span className="thanks__title">Thank you for ordering !</span>
          <p className="thanks__content">Thank you for choosing the Cosmos Diamond. We deeply appreciate your trust in our product and are committed to exceeding your expectations</p>
          <p className="thanks__contact"> Should you need any assistance, please reach out to our customer service team.</p>
          <div className="thanks__btn">
            <button onClick={()=> nav("/orders-history")} className="thanks__view">VIEW ORDER</button>
            <button onClick={()=> nav("/diamond-search")} className="thanks__next">COUNTINUE SHOPPING</button>
          </div>
        </div>
        <Fireworks style={{
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        position: 'fixed',
        zIndex: '1'
      }}/>
      </div>
      
    </>
  );
}

export default OrderSuccess;

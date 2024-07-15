import React from "react";
import WeddingRingsBanner from "../../components/weddingRingsBanner/WeddingRingsBanner";
import FashionRingsBanner from "../../components/fashionRingsBanner/FashionRingsBanner";
import { Col, Image, Row } from "antd";
import "./Homepage.scss";
import EngagementRingsBanner from "../../components/engagementRingsBanner/EngagementRingsBanner";

import ExploreDiamond from "./../../components/exploreDiamondBanner/ExploreDiamond";
import ReviewBanner from "./../../components/reviewsBanner/ReviewBanner";

import { useMediaQuery } from "react-responsive";

function Homepage() {
  const isMobile = useMediaQuery({ maxWidth: "2400px" });

  return (
    <div className="homepage">
      <WeddingRingsBanner />
      <ExploreDiamond version="diamonds" />
      <EngagementRingsBanner />

      <ReviewBanner />
      <FashionRingsBanner />
      <div className="homepage__education">
        <div className="homepage__education__inform">
          <h1>Become An Expert.</h1>
          <h5>Cosmos Diamonds Education And Guidance</h5>
        </div>
        <Row className="homepage__education__pics">
          <Col span={isMobile ? 7 : 4}>
            <Row>
              <Col md={24}>
                <Image
                  src="https://dam.bluenile.com/images/public/4695/STACKABLE_RINGS.webp"
                  className="homepage__education__pics__left"
                  width={400}
                  height={400}
                />
              </Col>
              <Col md={24}>
                <h5>Engagement Ring Guide</h5>
              </Col>
            </Row>

            <Row>
              <Col md={24}>
                <Image
                  src="https://dam.bluenile.com/images/public/4701/PETITE_TWIST_RINGS.webp"
                  className="homepage__education__pics__left"
                  width={400}
                  height={400}
                />
              </Col>
              <Col md={24}>
                <h5>Wedding Ring Guide</h5>
              </Col>
            </Row>
          </Col>
          <Col>
            <Image
              className="homepage__education__pics__right"
              src="https://ecommo--ion.bluenile.com/static-dyo-bn/dyo-ring.3ead9.jpg"
              width={880}
              height={849}
            />
            <h5>Diamond Education And Guidance</h5>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Homepage;

// import React, { useEffect } from "react";
// import WeddingRingsBanner from "../../components/weddingRingsBanner/WeddingRingsBanner";
// import FashionRingsBanner from "../../components/fashionRingsBanner/FashionRingsBanner";
// import { Col, Image, Row } from "antd";
// import "./Homepage.scss";
// import EngagementRingsBanner from "../../components/engagementRingsBanner/EngagementRingsBanner";

// import ExploreDiamond from "./../../components/exploreDiamondBanner/ExploreDiamond";
// import ReviewBanner from "./../../components/reviewsBanner/ReviewBanner";

// import { useMediaQuery } from "react-responsive";

// function Homepage() {
//   const isMobile = useMediaQuery({ maxWidth: "2400px" });

//   useEffect(() => {
//     const scriptContent = `!function(s,u,b,i,z){
//       var o,t,r,y;
//       s[i]||(s._sbzaccid=z,
//       s[i]=function(){s[i].q.push(arguments)},
//       s[i].q=[],s[i]("setAccount",z),
//       r=["widget.subiz.net","storage.googleapis"+(t=".com"),"app.sbz.workers.dev",i+"a"+(o=function(k,t){
//         var n=t<=6?5:o(k,t-1)+o(k,t-3);
//         return k!==t?n:n.toString(32)
//       })(20,20)+t,i+"b"+o(30,30)+t,i+"c"+o(40,40)+t],
//       (y=function(k){
//         var t,n;
//         s._subiz_init_2094850928430||r[k]&&(t=u.createElement(b),
//         n=u.getElementsByTagName(b)[0],t.async=1,
//         t.src="https://"+r[k]+"/sbz/app.js?accid="+z,
//         n.parentNode.insertBefore(t,n),setTimeout(y,2e3,k+1))
//       })(0))
//     }(window,document,"script","subiz", "acsawfysjaeuwhxclogn");`;

//     const script = document.createElement("script");
//     script.innerHTML = scriptContent;
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   return (
//     <div className="homepage">
//       <WeddingRingsBanner />
//       <ExploreDiamond version="diamonds" />
//       <EngagementRingsBanner />

//       <ReviewBanner />
//       <FashionRingsBanner />
//       <div className="homepage__education">
//         <div className="homepage__education__inform">
//           <h1>Become An Expert.</h1>
//           <h5>Cosmos Diamonds Education And Guidance</h5>
//         </div>
//         <Row className="homepage__education__pics">
//           <Col span={isMobile ? 7 : 4}>
//             <Row>
//               <Col md={24}>
//                 <Image
//                   src="https://dam.bluenile.com/images/public/4695/STACKABLE_RINGS.webp"
//                   className="homepage__education__pics__left"
//                   width={400}
//                   height={400}
//                 />
//               </Col>
//               <Col md={24}>
//                 <h5>Engagement Ring Guide</h5>
//               </Col>
//             </Row>

//             <Row>
//               <Col md={24}>
//                 <Image
//                   src="https://dam.bluenile.com/images/public/4701/PETITE_TWIST_RINGS.webp"
//                   className="homepage__education__pics__left"
//                   width={400}
//                   height={400}
//                 />
//               </Col>
//               <Col md={24}>
//                 <h5>Wedding Ring Guide</h5>
//               </Col>
//             </Row>
//           </Col>
//           <Col>
//             <Image
//               className="homepage__education__pics__right"
//               src="https://ecommo--ion.bluenile.com/static-dyo-bn/dyo-ring.3ead9.jpg"
//               width={880}
//               height={849}
//             />
//             <h5>Diamond Education And Guidance</h5>
//           </Col>
//         </Row>
//       </div>
//     </div>
//   );
// }

// export default Homepage;

import React, { useEffect, useState } from "react";
import "./DiamondDetail.scss";

import ProductDetail from "../../components/productDetail/ProductDetail";
import CommitExperience from "../../components/commitExperience/CommitExperience";
import axios from "axios";
import LoadingScreen from "../../components/loadingScreen/LoadingScreen";
import Stepper from "../../components/stepper/Stepper";
import { apiHeader } from "../../components/urlApiHeader";
import DiamondDetailComponent from "../../components/diamondDetailComponent/DiamondDetailComponet";
function DiamondDetail() {
  const [product, setProduct] = useState(null)
  const url = window.location.href
  const diamondId = url.slice(url.lastIndexOf("/")+1, url.length);

  useEffect(()=>{
   fetch(`${apiHeader}/Diamond/getDiamondDetail?id=${diamondId}`)
   .then((res)=> res.json())
   .then(data=> {
    console.log(data);
    setProduct(data)
  })
  }, [])
  
 
  useEffect(() => {
    window.scrollTo({top: 0, left:0})
  }, [])
  
  return (
    <div>
      <Stepper
        step2={"Choose a Setting"}
        step1={"Choose a diamond"}
        path={{ op: "/diamond-search", op1: "/setting-search" }}
      />
      {product && <DiamondDetailComponent product={product}/>}
      <CommitExperience/>
    </div>
    
  );
}

export default DiamondDetail;

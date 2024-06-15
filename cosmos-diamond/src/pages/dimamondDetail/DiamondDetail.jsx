import React, { useEffect, useState } from "react";
import "./DiamondDetail.scss";

import ProductDetail from "../../components/productDetail/ProductDetail";
import CommitExperience from "../../components/commitExperience/CommitExperience";
import axios from "axios";
import LoadingScreen from "../../components/loadingScreen/LoadingScreen";
import Stepper from "../../components/stepper/Stepper";
import { apiHeader } from "../../components/urlApiHeader";
function DiamondDetail() {
  const [product, setProduct] = useState(null)
  
  useEffect(()=>{
   fetch(`${apiHeader}/Product/productDetail/1`)
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
      <ProductDetail product={product}/>
      <CommitExperience/>
    </div>
    
  );
}

export default DiamondDetail;

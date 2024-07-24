import React, { useEffect, useState } from "react";


import ProductDetail from "../../components/productDetail/ProductDetail";
import CommitExperience from "../../components/commitExperience/CommitExperience";
import { apiHeader } from "../../components/urlApiHeader";
import DiamondDetailComponent from "../../components/diamondDetailComponent/DiamondDetailComponet";
import Review from "../../components/review/Review";
function ProductDetailPage() {
  const [product, setProduct] = useState(null)
  const url = window.location.href
  const productId = url.slice(url.lastIndexOf("/")+1, url.length);

  useEffect(()=>{
   fetch(`${apiHeader}/Product/productDetail/${productId}`)
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
      {product && <ProductDetail product={product}/>}
      <CommitExperience />
      {product && <Review product={product}/>}
    </div>
    
  );
}

export default ProductDetailPage;

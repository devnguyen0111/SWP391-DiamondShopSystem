import React, { useEffect } from "react";
import Stepper from "./../../components/stepper/Stepper";
import DiamondFinderIntro from "../../components/diamondSortIntro/DiamondFinderIntro";
import DiamondSort from "./../../components/sortslider/DiamondSort";
import "./CatalogPages.scss";
import { useNavigate } from "react-router-dom";

function CatalogPage() {
  const nav = useNavigate();
  useEffect(() => {
    if (
      JSON.parse(sessionStorage.getItem("diamond")) &&
      JSON.parse(sessionStorage.getItem("cover"))
    ) {
      nav("/custom-ring-by-diamond/complete-product");
    }
  }, []);
  return (
    <div className="catalog-page">
      <Stepper
        step2={"Choose a Setting"}
        step1={"Choose a diamond"}
        path={{ op: "/diamond-search", op1: "/setting-search" }}
      />
      <DiamondFinderIntro />
      <DiamondSort />
    </div>
  );
}

export default CatalogPage;

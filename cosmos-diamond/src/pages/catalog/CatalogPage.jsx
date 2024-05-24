import React from "react";
import Stepper from "./../../components/stepper/Stepper";
import DiamondFinderIntro from "../../components/diamondSortIntro/DiamondFinderIntro";
import DiamondSort from "./../../components/sortslider/DiamondSort";
import "./CatalogPages.scss";
import DiamondList from "../../components/sortslider/DiamondList";

function CatalogPage() {
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

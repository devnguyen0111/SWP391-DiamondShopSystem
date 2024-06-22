import { useEffect } from "react";
import CompleteProduct from "../../components/completeProduct/CompleteProduct";
import Stepper from "../../components/stepper/Stepper";

function CompleteProductPage() {
    useEffect(()=>{
        window.scrollTo({left: 0, top: 0})
    })
  return (
    <>
      <Stepper
        step2={"Choose a Setting"}
        step1={"Choose a diamond"}
        path={{ op: "/diamond-search", op1: "/custom-ring-by-diamond" }}
      />
      <CompleteProduct />
    </>
  );
}

export default CompleteProductPage;

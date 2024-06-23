import CoverCatlog from "../../components/coverCatalog/CoverCatalog";
import Stepper from "../../components/stepper/Stepper";

function CustomEarrings() {
  return (
    <>
      <Stepper
        step2={"Choose a Setting"}
        step1={"Choose a diamond"}
        path={{ op: "/diamond-search", op1: "/setting-search" }}
      />

      <CoverCatlog category="3" />
    </>
  );
}

export default CustomEarrings;

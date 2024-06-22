import CommitExperience from "../../components/commitExperience/CommitExperience";
import CoverDetail from "../../components/coverDetail/CoverDetail";
import Stepper from "../../components/stepper/Stepper";

function CoverDetailPage() {
  return (
    <>
      <Stepper
        step2={"Choose a Setting"}
        step1={"Choose a diamond"}
        path={{ op: "/diamond-search", op1: "/setting-search" }}
      />
      <CoverDetail />
      <CommitExperience />
    </>
  );
}

export default CoverDetailPage;

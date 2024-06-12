import { useEffect } from "react";
import Banner from "../../components/banner/Banner";

function EngagementRingCatalog() {
    useEffect(()=>{
        window.scrollTo(0,0)
      },[]) 
  return (
    <>
      <Banner
        intro="The Ultimate Love Letter"
        title="ENGAGEMENT RINGS"
        subtitle="Find handcrafted engagement rings featuring ethical diamonds, 
        gems and custom designs. Easily shop high-quality gemstone, 
        natural diamond or lab diamond rings online with settings for 
        any budget and style."
        bg="https://dam.bluenile.com/images/public/20216/Six_Blue_Nile_diamond_engagement_rings_in_gold_and_platinum.jpeg"
        buttons={["Craft your own"]}
      />
    </>
  );
}

export default EngagementRingCatalog;

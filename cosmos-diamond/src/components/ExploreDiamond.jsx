import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper-bundle.css';
import 'swiper/css/scrollbar';


// import required modules
import { Scrollbar } from 'swiper/modules';



// import required modules

import "./ExploreDiamond.css";

const diamonds = [
  {
    href: "/",
    src: "https://ecommo--ion.bluenile.com/static-dyo-bn/round.49562.svg",
    name: "Round",
  },
  {
    href: "/",
    src: "https://ecommo--ion.bluenile.com/static-dyo-bn/princMobile.5923a.svg",
    name: "Princess",
  },
  {
    href: "/",
    src: "https://ecommo--ion.bluenile.com/static-dyo-bn/emeraldMobile.150d1.svg",
    name: "Emerald",
  },
  {
    href: "/",
    src: "https://ecommo--ion.bluenile.com/static-dyo-bn/asscherMobile.4201b.svg",
    name: "Asscher",
  },
  {
    href: "/",
    src: "https://ecommo--ion.bluenile.com/static-dyo-bn/cushionMobile.39d1e.svg",
    name: "Cushion",
  },
  {
    href: "/",
    src: "https://ecommo--ion.bluenile.com/static-dyo-bn/marquiseMobile.8f34f.svg",
    name: "Marquise",
  },
  {
    href: "/",
    src: "https://ecommo--ion.bluenile.com/static-dyo-bn/radiantMobile.ca49d.svg",
    name: "Radiant",
  },
  {
    href: "/",
    src: "https://ecommo--ion.bluenile.com/static-dyo-bn/ovalMobile.79c32.svg",
    name: "Oval",
  },
  {
    href: "/",
    src: "https://ecommo--ion.bluenile.com/static-dyo-bn/pearMobile.462a0.svg",
    name: "Pear",
  },
  {
    href: "/",
    src: "https://ecommo--ion.bluenile.com/static-dyo-bn/heartMobile.6ddbf.svg",
    name: "Heart",
  },
];
function ExploreDiamond() {
  return (
    <div className="explore">
      <div className="explore__header">
        <h1>Explore Diamonds</h1>
      </div>
      <div className="explore__carousel">
        <Swiper
              scrollbar={{
                hide: true,
              }}
              
              modules={[Scrollbar]}
              breakpoints={{
                1200:{
                  spaceBetween:10,
                  slidesPerView: 10
                },
                992:{
                  spaceBetween:10,
                  slidesPerView: 7
                },
                576:{
                  spaceBetween:3,
                  slidesPerView: 5
                },
                0:{
                  spaceBetween:3,
                  slidesPerView: 3
                }
              }
              }
              className="mySwiper"
            >
              {diamonds.map((diamond, index) => (
                <SwiperSlide>
                  <a href={diamond.href} className="carousel__item" key={index}>
                    <div className="item__img">
                      <img src={diamond.src}></img>
                    </div>
                    <div className="item__name">{diamond.name}</div>
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
      </div>
    </div>
  );
}

export default ExploreDiamond;

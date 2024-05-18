import "./ReviewBanner.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/swiper-bundle.css";
const reviews = [
  {
    name: "Anne Hathaway",
    content: `Cosmos Diamonds is a place where timeless elegance meets dazzling brilliance. Their stunning collection is sure to leave you breathless.`,
    bio: `Fashion icon and award-winning actress, Anne Hathaway is a force in Hollywood`,
    image: "./src/assets/images/anne-hathaway.jpg",
  },
  {
    name: "Johnny Dang",
    content: `Cosmos Diamond offers an exquisite selection of beautifully
        crafted diamond jewelry, with exceptional quality and
        outstanding customer service. Every visit is a sparkling
        experience!`,
    bio: "Renowned for custom diamond grills and celebrity jewelry.",
    image: "./src/assets/images/johnnydang.png",
  },
  {
    name: "Zendaya",
    content: `Cosmos Diamonds sounds like a wonderful place to find that
        perfect sparkling treasure. They offer a beautiful selection
        and seem committed to ethical sourcing, which is always a
        plus!`,
    bio: `Rising star who's become a household name, is not just an actress, but also a singer and fashion icon.`,
    image: "./src/assets/images/zendaya.jpg",
  },
];
function ReviewBanner() {
  return (
    <>
      <div className="review-banner__container">
        <h1 className="review-banner__header">What our customers say</h1>
        <Swiper
          className="mySwiper"
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}

          modules={[Autoplay]}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="review-banner__upper">
                <div className="upper__img">
                  <img src={review.image} alt="" />
                </div>
                <div className="upper__content">
                  <p>{review.content}</p>
                </div>
              </div>
              <hr />
              <div className="review-banner__lower">
                <h1 className="lower__name">{review.name}</h1>
                <div className="lower__bio">{review.bio}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default ReviewBanner;

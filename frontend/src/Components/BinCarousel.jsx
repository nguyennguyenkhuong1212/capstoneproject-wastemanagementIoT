import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
import Card from "./Card";
import "./carousel.css";

const BinCarousel = ({ readyToCollectBins }) => {
  console.log(readyToCollectBins);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Show 3 bins at a time
    slidesToScroll: 1,
    arrow: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrow: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrow: false,
        },
      },
    ],
  };

  if (!readyToCollectBins || readyToCollectBins.length === 0) {
    return <div className="empty-box">No bins available to display</div>;
  }

  return (
    <div className="container">
      <Slider {...settings}>
        {readyToCollectBins.map((bin) => (
          <div className="column" key={bin.name}>
            <Card
              bID={bin._id}
              name={bin.name}
              address={bin.address}
              trashPercentage={bin.fullness}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BinCarousel;

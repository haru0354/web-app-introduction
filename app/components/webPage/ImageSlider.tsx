"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

type ImageSliderProps = {
  imageUrls: string[];
  imageAlts: string[];
};

const ImageSlider: React.FC<ImageSliderProps> = ({ imageUrls, imageAlts }) => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    slidesToShow: 3,
    speed: 500,
  };

  return (
    <div className="w-full max-w-[800px] mx-auto">
      <Slider {...settings}>
        {imageUrls.map((imageUrl, index) => {
          return (
            <div key={index} className="min-w-[200px]text-center my-4 mx-8 md:mx-0">
              <Image
                src={`/${imageUrl}`}
                width={200}
                height={200}
                alt={imageAlts[index]}
                className="mx-auto"
              />
              <p>{imageAlts[index]}</p>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default ImageSlider;

"use client";

import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import type { Image as PrismaImage } from "@prisma/client";

type ImageSliderProps = {
  images: PrismaImage[];
};

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
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
        {images.map((image, index) => {
          return (
            <div
              key={index}
              className="min-w-[200px]text-center my-4 mx-8 md:mx-0"
            >
              <Image
                src={`/${image.imageURL}`}
                width={200}
                height={200}
                alt={image.imageALT}
                className="mx-auto"
              />
              <p>{image.imageALT}</p>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default ImageSlider;

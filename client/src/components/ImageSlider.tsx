import React, { useState, useEffect } from "react";
import "../css/components/imageslider.css";

interface ImageSliderProps {
  images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Cập nhật mainImage và currentIndex khi images thay đổi
    setMainImage(images[0]);
    setCurrentIndex(0);
  }, [images]);

  const handleMouseEnter = (image: string, index: number) => {
    setMainImage(image);
    setCurrentIndex(index);
  };

  const handlePrev = (index: number) => {
    const newIndex = (index - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
    setMainImage(images[newIndex]);
  };

  const handleNext = (index: number) => {
    const newIndex = (index + 1) % images.length;
    setCurrentIndex(newIndex);
    setMainImage(images[newIndex]);
  };

  return (
    <div className="image-slider">
      <div className="thumbnails">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            onMouseEnter={() => handleMouseEnter(image, index)}
            className={`thumbnail ${image === mainImage ? "border" : ""}`}
          />
        ))}
      </div>
      <div className="main-image relative">
        <button
          className="btnLeft"
          style={{ left: "10%" }}
          onClick={() => handlePrev(currentIndex)}
        >
          <img className="icon" src="/icons/left-arrow.png" alt="" />
        </button>
        <img src={mainImage} alt="Main" />
        <button
          className="btnRight"
          style={{ right: "10%" }}
          onClick={() => handleNext(currentIndex)}
        >
          <img className="icon" src="/icons/right-arrow.png" alt="" />
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;

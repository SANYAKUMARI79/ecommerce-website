import React, { useRef, useMemo, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import { Button } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const HomeSectionCarousel = ({ data, sectionName }) => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = Math.min(data.length, 10); // Ensure max 10 items

  const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1024: { items: 5 },
  };

  const slidePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.slidePrev();
    }
  };

  const slideNext = () => {
    if (carouselRef.current) {
      carouselRef.current.slideNext();
    }
  };

  const items = useMemo(
    () =>
      data.slice(0, 10).map((product, index) => (
        <div key={index}>
          <HomeSectionCard
            imageUrl={product.imageUrl}
            brand={product.brand}
            title={product.title}
          />
        </div>
      )),
    [data]
  );

  return (
    <div className="relative px-4 lg:px-8 border">
      <h2 className="text-2xl font-extrabold text-gray-800 py-5">{sectionName}</h2>
      <div className="relative p-5 flex items-center justify-center">

        {/* Left Button (Only Show If Not at First Item) */}
        {currentIndex > 0 && (
          <Button
            onClick={slidePrev}
            variant="contained"
            sx={{
              position: "absolute",
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "rgba(255, 255, 255, 0.8)",
              zIndex: 10,
              "&:hover": { bgcolor: "white" },
            }}
            aria-label="previous"
          >
            <KeyboardArrowLeftIcon sx={{ color: "black" }} />
          </Button>
        )}

        {/* Carousel */}
        <AliceCarousel
          ref={carouselRef}
          items={items}
          disableButtonsControls
          responsive={responsive}
          disableDotsControls
          infinite={false}
          onSlideChanged={(e) => setCurrentIndex(e.item)}
        />

        {/* Right Button (Only Show If Not at Last Item) */}
        {currentIndex < totalItems - 1 && (
          <Button
            onClick={slideNext}
            variant="contained"
            sx={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "rgba(255, 255, 255, 0.8)",
              zIndex: 10,
              "&:hover": { bgcolor: "white" },
            }}
            aria-label="next"
          >
            <KeyboardArrowRightIcon sx={{ color: "black" }} />
          </Button>
        )}

      </div>
    </div>
  );
};

export default HomeSectionCarousel;

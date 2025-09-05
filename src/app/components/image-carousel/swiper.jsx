"use client";
// Import Swiper React components
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// Import required modules
import { EffectCoverflow, Navigation, Autoplay } from "swiper/modules";

export default function App({ images, flag, view, width }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  const  openModal = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <div className="w-full">
        <Swiper
          modules={[EffectCoverflow, Navigation, Autoplay]}
          onSlideChange={(swiper) => handleChange(swiper)}
          navigation={true}
          effect={"coverflow"}
          centeredSlides={true}
          slidesPerView={view}
          spaceBetween={20}
          initialSlide={1}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: -120,
              loop: false,
              autoplay: false,
            },
          }}
          autoplay={{
            delay: 2000, // 2 seconds per slide
            disableOnInteraction: true,
          }}
          loop={false}
          speed={1500}
          className={`mySwiper ${width}`}
          style={{ transitionTimingFunction: "ease-in-out" }}
        >
          {images &&
            images.map((image, index) => (
              <SwiperSlide
                key={index}
              >
                <img
                  src={image["img"]}
                  alt={`Slide ${index + 1}`}
                  loading="lazy"
                  className="w-[400px] h-[300px] object-cover cursor-pointer"
                  onClick={() => openModal(image["img"])}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      {/* Modal for showing full-size image */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage}
              alt="Full size"
              className="max-w-[90vw] max-h-[90vh] "
            />
            <button
              className="absolute top-2 left-2 text-white bg-accent p-2 "
              onClick={closeModal}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}

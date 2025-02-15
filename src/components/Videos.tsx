"use client";

import React, { useState, useEffect } from "react";
import MyVideoCard from "./radix/VideoCard";
import { FinalResultResponse } from "@/lib/youtube";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import Swiper styles
import "swiper/css/pagination";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

const Videos = ({ query }: { query: string }) => {
  const [videos, setVideos] = useState<FinalResultResponse[]>([]);

  const fetchVideos = async () => {
    if (!query) return;

    try {
      const response = await fetch("/api/getYoutubeVideos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: query }),
      });

      if (!response.ok) {
        console.error("Failed to fetch videos");
        return;
      }

      const data = await response.json();
      console.log("Fetched videos:", data);

      setVideos(data || []);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos, query]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {videos.length > 0 ? (
        <Swiper
          spaceBetween={20}
          slidesPerView={4}
          navigation
          loop={true}
          autoplay={{ delay: 1000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          modules={[Pagination, Navigation, Autoplay]}
          className="mySwiper"
        >
          {videos.map((video) => (
            <SwiperSlide key={video.url}>
              <MyVideoCard video={video} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-center mt-4">No videos found.</p>
      )}
    </div>
  );
};

export default Videos;

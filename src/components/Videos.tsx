import React, { useState, useEffect } from "react";
import MyVideoCard from "./radix/VideoCard";
import { FinalResultResponse } from "@/lib/youtube";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

const Videos = ({ query }: { query: string }) => {
  const [videos, setVideos] = useState<FinalResultResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchVideos = async () => {
      if (!query) return;

      setLoading(true); // Bắt đầu tải dữ liệu

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
      } finally {
        setLoading(false); // Kết thúc tải dữ liệu
      }
    };

    fetchVideos();
  }, [query]); // Chỉ gọi lại khi query thay đổi

  return (
    <div className="w-full p-4 mb-6 bg-slate-800 border border-gray-700 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-white mb-2">Videos:</h2>
      {loading ? (
        <p className="text-center text-lg text-gray-500 mt-4">
          Loading videos...
        </p>
      ) : videos.length > 0 ? (
        <Swiper
          spaceBetween={20}
          slidesPerView={1} // Mặc định hiển thị 1 video trên màn hình nhỏ
          breakpoints={{
            640: { slidesPerView: 2 }, // Từ 640px trở lên, hiển thị 2 video
            1024: { slidesPerView: 3 }, // Từ 1024px trở lên, hiển thị 3 video
            1280: { slidesPerView: 4 }, // Từ 1280px trở lên, hiển thị 4 video
          }}
          navigation={false}
          loop={true}
          autoplay={{ delay: 1000, disableOnInteraction: false }}
          pagination={false}
          modules={[Pagination, Navigation, Autoplay]}
          className="mySwiper"
        >
          {videos.map((video) => (
            <SwiperSlide key={video.url}>
              <div className="flex justify-center">
                <MyVideoCard video={video} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-center text-lg text-gray-500 mt-4">
          No videos found.
        </p>
      )}
    </div>
  );
};

export default Videos;

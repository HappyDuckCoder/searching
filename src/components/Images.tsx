"use client";

import React, { useEffect, useState } from "react";
import { GlareCard } from "./acernity/glare-card";

interface ImageProps {
  url: string;
  description: string;
}

const Images = ({ query }: { query: string }) => {
  const [images, setImages] = useState<ImageProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      if (!query) return;

      setLoading(true); // Bắt đầu loading
      setError(null); // Reset lỗi trước mỗi lần fetch

      try {
        const response = await fetch("/api/getImagesAndSources", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: query }),
        });

        if (!response.ok) throw new Error("Failed to fetch images");

        const data = await response.json();
        setImages(data.images || []);
      } catch (err) {
        console.error("Error fetching images:", err);
        setError("Could not load images. Please try again.");
      } finally {
        setLoading(false); // Dừng loading sau khi fetch
      }
    };

    fetchImages();
  }, [query]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Hiển thị lỗi */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Skeleton Loader */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-pulse">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-300 rounded-lg h-[250px] w-full"
            ></div>
          ))}
        </div>
      ) : images.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <li key={index} className="relative group">
              <GlareCard className="relative w-full h-[250px] rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                <img
                  src={image.url}
                  alt={image.description || "Image"}
                  className="w-full h-full object-cover rounded-lg"
                />
                {/* Overlay text */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                  <p className="text-white text-sm">{image.description}</p>
                </div>
              </GlareCard>
            </li>
          ))}
        </ul>
      ) : (
        !error && <p className="text-center text-gray-500">No images found.</p>
      )}
    </div>
  );
};

export default Images;

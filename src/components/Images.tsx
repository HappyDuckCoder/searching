"use client";

import React, { useEffect, useState } from "react";
import { GlareCard } from "./acernity/glare-card";

interface ImageProps {
  url: string;
  description: string;
}

const Images = ({ query }: { query: string }) => {
  const [images, setImages] = useState<ImageProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      if (!query) return;

      try {
        const response = await fetch("/api/getImagesAndSources", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: query }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }

        const data = await response.json();
        setImages(data.images || []);
      } catch (err) {
        console.error("Error fetching images:", err);
        setError("Could not load images. Please try again.");
      }
    };

    fetchImages();
  }, [query]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      {error && <p className="text-red-500 text-center">{error}</p>}

      {images.length > 0 ? (
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <li key={index}>
              <GlareCard className="relative w-full h-[250px] rounded-lg overflow-hidden shadow-lg">
                <img
                  src={image.url}
                  alt={image.description || "Image"}
                  className="w-full h-full object-cover"
                />
                <p className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded">
                  {image.description}
                </p>
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

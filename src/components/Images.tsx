"use client";

import React, { useEffect, useState, useCallback } from "react";
import { GlareCard } from "./acernity/glare-card";

interface ImageProps {
  url: string;
  description: string;
}

const Images = ({ query }: { query: string }) => {
  const [images, setImages] = useState<ImageProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = useCallback(async () => {
    if (!query) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/getImagesAndSources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: query }),
      });

      // *NOTE: DEBUGGING

      if (!response.ok) throw new Error("Failed to fetch images");

      const data = await response.json();
      setImages(data.images || []);
    } catch (err) {
      console.error("Error fetching images:", err);
      setError("Could not load images. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return (
    <div className="w-full p-4 mb-6 bg-slate-800 border border-gray-700 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Images:</h2>

      {error && (
        <div className="text-center">
          <p className="text-red-500">{error}</p>
          <button
            onClick={fetchImages}
            className="mt-4 bg-blue-500 text-white p-2 rounded"
          >
            Retry
          </button>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-pulse">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-300 rounded-lg h-[250px] w-full"
            ></div>
          ))}
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => {
            const image = images[index];

            return (
              <li key={index} className="relative group">
                <GlareCard className="relative bg-gray-900 w-full rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 p-2">
                  {image ? (
                    <>
                      <img
                        src={image.url}
                        alt={image.description || "Image"}
                        className="w-full h-[250px] object-cover rounded-lg"
                      />
                      <div className="absolute bg-gradient from-transparent to-black group-hover:opacity-75 duration-300 flex items-end p-2">
                        <p className="text-white text-sm text-shadow-md z-20">
                          {image.description}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-[250px] bg-gray-200 flex items-center justify-center rounded-lg">
                      <p className="text-gray-500">No Image</p>
                    </div>
                  )}
                </GlareCard>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Images;

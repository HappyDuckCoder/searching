"use client";

import React from "react";
import { Card, Inset, Box, Text } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { FinalResultResponse } from "@/lib/youtube";
import Image from "next/image";

const MyVideoCard = ({ video }: { video: FinalResultResponse }) => {
  return (
    <Box
      maxWidth="260px"
      style={{
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        padding: "10px", // Added padding around the card for spacing
      }}
    >
      <Card
        size="2"
        style={{
          border: "none", // Removed white border
          borderRadius: "12px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          transition:
            "transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease",
          minHeight: "300px", // Ensure card height consistency
          fontFamily: '"Inter", Arial, sans-serif', // Nice font
          backgroundColor: "#1A202C", // Dark background to make white text stand out
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.boxShadow = "0px 8px 16px rgba(0, 0, 0, 0.2)";
          e.currentTarget.style.backgroundColor = "#2D3748"; // Darker background on hover
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.1)";
          e.currentTarget.style.backgroundColor = "#1A202C"; // Revert back to original background
        }}
      >
        <Inset clip="padding-box" side="top" pb="current">
          <Image
            src={video.image || "https://via.placeholder.com/280x140"}
            alt={video.name || "Video Thumbnail"}
            style={{
              display: "block",
              objectFit: "cover",
              width: "100%",
              height: 140,
              backgroundColor: "var(--gray-5)",
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
              transition: "transform 0.3s ease",
            }}
            width={280}
            height={140}
            aria-label={video.name || "Video Thumbnail"} // Accessibility improvement
          />
        </Inset>
        <Box px="4" py="4">
          <Text as="p" size="2" style={{ fontWeight: "bold", color: "white" }}>
            {video.name}
          </Text>
          <Text
            as="div"
            size="1"
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              display: "block",
              maxWidth: "100%",
            }}
          >
            <a
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Go to ${video.name} video`}
              style={{
                color: "#A0AEC0", // Subtle link color
                textDecoration: "none",
                transition: "color 0.3s ease", // Smooth color transition on hover
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#63B3ED"; // Light blue on hover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#A0AEC0"; // Revert to original link color
              }}
            >
              {video.url}
            </a>
          </Text>
        </Box>
      </Card>
    </Box>
  );
};

export default MyVideoCard;

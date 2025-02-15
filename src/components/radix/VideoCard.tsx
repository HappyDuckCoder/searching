"use client";

import React from "react";
import { Card, Inset, Box, Text, Strong } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { FinalResultResponse } from "@/lib/youtube";

const MyVideoCard = ({ video }: { video: FinalResultResponse }) => {
  return (
    <Box
      maxWidth="260px" // Tăng chiều rộng của card
      style={{
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <Card
        size="2"
        style={{
          border: "1px solid var(--gray-6)",
          borderRadius: "12px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          minHeight: "300px", // Đảm bảo chiều cao các card bằng nhau
          fontFamily: '"Inter", Arial, sans-serif', // Font chữ đẹp hơn
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.boxShadow = "0px 8px 16px rgba(0, 0, 0, 0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.1)";
        }}
      >
        <Inset clip="padding-box" side="top" pb="current">
          <img
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
            }}
          />
        </Inset>
        <Box px="2" py="2">
          <Text as="p" size="2" style={{ fontWeight: "bold" }}>
            {video.name}
          </Text>
          <Text
            as="div"
            size="1"
            color="gray"
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              display: "block",
              maxWidth: "100%",
            }}
          >
            <a href={video.url} target="_blank" rel="noopener noreferrer">
              {video.url}
            </a>
          </Text>
        </Box>
      </Card>
    </Box>
  );
};

export default MyVideoCard;

"use client";

import React, { useState } from "react";
import { Card, Flex, Box, Text } from "@radix-ui/themes";
import Image from "next/image";
import { DuckDuckGoRelatedTopic } from "@/lib/duckduckgo";
import { getValidImageUrl } from "@/lib/utils";

const SourceCard = ({ source }: { source: DuckDuckGoRelatedTopic }) => {
  const defaultIcon = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  const [iconUrl, setIconUrl] = useState(
    getValidImageUrl(source.Icon?.URL || defaultIcon)
  );

  return (
    <Box
      style={{
        maxWidth: "100%",
        width: "320px",
      }}
    >
      <Card
        style={{
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 6px 14px rgba(0, 0, 0, 0.15)",
          transition: "all 0.3s ease-in-out",
          cursor: "pointer",
          backgroundColor: "rgb(30, 41, 59)", // Dark background
          border: "1px solid #4b5563", // Border color for dark mode
          // height: "220px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.backgroundColor = "#374151"; // Slightly lighter hover effect
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.backgroundColor = "rgb(30, 41, 59)"; // Default background on leave
        }}
      >
        {/* Icon & Content */}
        <Flex align="center" gap="16px">
          {/* Icon Image */}
          <Image
            src={iconUrl}
            width={50}
            height={50}
            alt="Source Icon"
            style={{
              borderRadius: "10px",
              objectFit: "cover",
              flexShrink: 0,
              border: "1px solid #6b7280",
              padding: "4px",
              backgroundColor: "#1e293b",
            }}
            onError={() => setIconUrl(defaultIcon)}
          />

          {/* Title & URL */}
          <Box style={{ flex: 1 }}>
            <Text
              as="div"
              size="4"
              weight="bold"
              style={{
                fontFamily: "Arial, sans-serif",
                wordBreak: "break-word",
                whiteSpace: "normal",
                color: "white",
                lineHeight: "1.4",
              }}
            >
              <a
                href={source.FirstURL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  color: "#60a5fa", // Brighter blue for better visibility
                  display: "block",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "240px",
                  whiteSpace: "nowrap",
                  transition: "color 0.2s ease-in-out",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#93c5fd")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#60a5fa")}
              >
                {source.Text}
              </a>
            </Text>
            <Text
              as="div"
              size="2"
              color="gray"
              style={{
                maxWidth: "240px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                display: "block",
                fontSize: "13px",
                color: "#9ca3af",
              }}
            >
              {source.FirstURL}
            </Text>
          </Box>
        </Flex>

        {/* Decorative Bottom Border */}
        <Box
          style={{
            height: "4px",
            width: "100%",
            background: "linear-gradient(90deg, #3b82f6, #9333ea)",
            borderRadius: "2px",
            marginTop: "12px",
          }}
        />
      </Card>
    </Box>
  );
};

export default SourceCard;

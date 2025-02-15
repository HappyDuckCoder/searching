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
          padding: "16px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          transition: "all 0.2s ease-in-out",
          cursor: "pointer",
          backgroundColor: "white",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.03)";
          e.currentTarget.style.backgroundColor = "#f9fafb";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.backgroundColor = "white";
        }}
      >
        {/* Dùng style trực tiếp để chắc chắn `gap` hoạt động */}
        <Flex
          align="center"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px", // Đảm bảo có khoảng cách giữa icon và nội dung
          }}
        >
          {/* Ảnh Icon */}
          <Image
            src={iconUrl}
            width={50}
            height={50}
            alt="Source Icon"
            style={{
              borderRadius: "8px",
              objectFit: "cover",
              flexShrink: 0,
            }}
            onError={() => setIconUrl(defaultIcon)}
          />

          {/* Nội dung */}
          <Box style={{ flex: 1 }}>
            <Text
              as="div"
              size="3"
              weight="bold"
              style={{
                fontFamily: "Arial, sans-serif",
                wordBreak: "break-word",
                whiteSpace: "normal",
              }}
            >
              <a
                href={source.FirstURL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  color: "#2563eb",
                  display: "block",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "240px",
                  whiteSpace: "nowrap",
                }}
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
              }}
            >
              {source.FirstURL}
            </Text>
          </Box>
        </Flex>
      </Card>
    </Box>
  );
};

export default SourceCard;

"use client";

import React from "react";
import { Card, Inset, Box, Text, Strong } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { FinalResultResponse } from "@/lib/youtube";

const MyVideoCard = ({ video }: { video: FinalResultResponse }) => {
  return (
    <Box maxWidth="240px">
      <Card size="2">
        <Inset clip="padding-box" side="top" pb="current">
          <img
            src={video.image}
            alt="Bold typography"
            style={{
              display: "block",
              objectFit: "cover",
              width: "100%",
              height: 140,
              backgroundColor: "var(--gray-5)",
            }}
          />
        </Inset>
        <Text as="p" size="1">
          <Strong>{video.name}</Strong>
          <br />
          <p>{video.url}</p>
        </Text>
      </Card>
    </Box>
  );
};

export default MyVideoCard;

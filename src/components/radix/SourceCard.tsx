"use client";

import React from "react";
import { Card, Flex, Avatar, Box, Text } from "@radix-ui/themes";
import { DuckDuckGoRelatedTopic } from "@/lib/duckduckgo";
import Image from "next/image";

const SourceCard = ({ source }: { source: DuckDuckGoRelatedTopic }) => {
  return (
    <Box maxWidth="240px">
      <Card>
        <Flex gap="3" align="center">
          {/* Sử dụng source.Icon.URL nếu có, fallback nếu ảnh không tồn tại */}
          <Avatar
            size="3"
            src={
              source.Icon?.URL && source.Icon.URL.trim() !== ""
                ? source.Icon.URL
                : "https://via.placeholder.com/150"
            }
            radius="full"
            fallback={
              <Image
                src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fagreatdream.com%2Fquestion-mark%2F&psig=AOvVaw3uC-3fHF24-PW3DG6L3vO4&ust=1739345179274000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCICHwO6Lu4sDFQAAAAAdAAAAABAE"
                width={150}
                height={150}
                alt="Source Icon"
              />
            }
          />

          <Box>
            {/* Không có `source.Result`, thay bằng `source.Text` */}
            <Text as="div" size="2" weight="bold">
              <a
                href={source.FirstURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {source.Text}
              </a>
            </Text>
            <Text as="div" size="2" color="gray">
              {source.FirstURL}
            </Text>
          </Box>
        </Flex>
      </Card>
    </Box>
  );
};

export default SourceCard;

import React from "react";
import { Card, Flex, Avatar, Box, Text } from "@radix-ui/themes";
import { SearchResult } from "@/lib/tavily";

const SourceCard = ({ source }: { source: SearchResult }) => {
  return (
    <Box maxWidth="240px">
      <Card>
        <Flex gap="3" align="center">
          <Avatar size="3" src={source.url} radius="full" fallback="T" />
          <Box>
            <Text as="div" size="2" weight="bold">
              {source.title}
            </Text>
            <Text as="div" size="2" color="gray">
              {source.content}
            </Text>
          </Box>
        </Flex>
      </Card>
    </Box>
  );
};

export default SourceCard;

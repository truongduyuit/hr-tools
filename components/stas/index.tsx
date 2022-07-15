import { Stat, Flex, StatLabel, StatNumber, Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  stat: string;
  icon?: ReactNode;
}

function StatsCard(props: StatsCardProps) {
  const { title, stat, icon } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={"gray.800"}
      rounded={"lg"}
    >
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={"medium"}>{title}</StatLabel>
          <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
            {stat}
          </StatNumber>
        </Box>
        {icon && (
          <Box my={"auto"} color={"gray.800"} alignContent={"center"}>
            {icon}
          </Box>
        )}
      </Flex>
    </Stat>
  );
}

export { StatsCard };

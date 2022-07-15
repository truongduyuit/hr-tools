import {
  Box,
  Button,
  chakra,
  Flex,
  ListItem,
  OrderedList,
  SimpleGrid,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tooltip,
  Tr,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCalendarAlt, FaCalendarWeek, FaDailymotion } from "react-icons/fa";
import Sidebar from "../components/sidebar";
import { StatsCard } from "../components/stas";
import { IScheduleModel } from "../database";
import { getStartEndDate, getStartEndMonth, getStartEndWeek } from "../utils";

export default function Dashboard() {
  const toast = useToast();
  const [schedules, setSchedules] = useState<IScheduleModel[]>([]);
  const [totalDate, setTotalDate] = useState<string>("0");
  const [totalWeek, setTotalWeek] = useState<string>("0");
  const [totalMonth, setTotalMonth] = useState<string>("0");

  useEffect(() => {
    loadStat();
    getScheduleToday();
  }, []);

  const loadStat = async () => {
    const { startDate, endDate } = getStartEndDate();
    const { startWeekDate, endWeekDate } = getStartEndWeek();
    const { startMonthDate, endMonthDate } = getStartEndMonth();

    const [tDate, tWeek, tMonth] = await Promise.all([
      getCountStat(startDate, endDate),
      getCountStat(startWeekDate, endWeekDate),
      getCountStat(startMonthDate, endMonthDate),
    ]);

    if (tDate && tDate.data) {
      setTotalDate(tDate.data.value);
    }

    if (tWeek && tWeek.data) {
      setTotalWeek(tWeek.data.value);
    }

    if (tMonth && tMonth.data) {
      setTotalMonth(tMonth.data.value);
    }
  };

  const getCountStat = async (startDate: Date, endDate: Date) => {
    return await axios.get(
      `/api/candidate/count?fromDate=${startDate.toISOString()}&toDate=${endDate.toISOString()}`
    );
  };

  const getScheduleToday = async () => {
    try {
      const { endDate } = getStartEndDate();
      const currentTime = new Date();
      const result = await axios.get(
        `/api/schedule?fromDate=${new Date(
          currentTime.setHours(currentTime.getHours() + 7)
        ).toISOString()}&toDate=${endDate.toISOString()}`
      );

      if (result && result.data) {
        setSchedules(result.data.value.records);
      }
    } catch (error) {
      toast({
        title: "Lấy lịch pv hôm nay thất bại",
        description: `Error: ${error}`,
        duration: 10000,
        position: "bottom-right",
        isClosable: true,
        status: "error",
      });
    }
  };

  return (
    <div>
      <Flex>
        <Sidebar />
        <Flex ml="50px" flexDir="column" marginTop="2.5vh">
          <Box minW="5xl" mx={"auto"} px={{ base: 2, sm: 12, md: 17 }}>
            <chakra.h1
              textAlign={"center"}
              fontSize={"4xl"}
              py={10}
              fontWeight={"bold"}
            >
              Ứng viên đã apply
            </chakra.h1>
            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              spacing={{ base: 5, lg: 8 }}
            >
              <StatsCard
                title={"Hôm nay"}
                stat={totalDate}
                icon={<FaDailymotion size={"3em"} />}
              />
              <StatsCard
                title={"Tuần này"}
                stat={totalWeek}
                icon={<FaCalendarWeek size={"3em"} />}
              />
              <StatsCard
                title={"Tháng này"}
                stat={totalMonth}
                icon={<FaCalendarAlt size={"3em"} />}
              />
            </SimpleGrid>
          </Box>

          <Box minW="5xl" mx={"auto"} pt={10} px={{ base: 2, sm: 12, md: 17 }}>
            <chakra.h1
              textAlign={"center"}
              fontSize={"4xl"}
              py={10}
              fontWeight={"bold"}
            >
              Lịch phỏng vấn tiếp theo
            </chakra.h1>
            <TableContainer>
              <Table variant="striped" colorScheme="teal">
                <Thead>
                  <Tr>
                    <Th>Giờ</Th>
                    <Th>Họ tên</Th>
                    <Th>Số điện thoại</Th>
                    <Th>Chi nhánh PV</Th>
                    <Th>Email</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {schedules.map((c) => {
                    const { id, date, candidateInfo, interviewBranchInfo } = c;
                    return (
                      <Tr key={id}>
                        <Td>{String(date).slice(11, 16)}</Td>
                        <Td>
                          <Link href={`/candidate/${id}`} passHref>
                            <Box as="a" textDecoration="underline" color="blue">
                              {candidateInfo?.name}
                            </Box>
                          </Link>
                        </Td>
                        <Td>{candidateInfo?.phone}</Td>
                        <Td>
                          <Tooltip label={`${interviewBranchInfo?.hotline} - ${interviewBranchInfo?.detail}`}>
                            {`${interviewBranchInfo?.symbol}`}
                          </Tooltip>
                        </Td>
                        <Td>
                          <Box
                            as="a"
                            color="blue"
                            textDecoration="underline"
                            href={`mailto:${interviewBranchInfo?.email}`}
                          >
                            {interviewBranchInfo?.email}
                          </Box>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Flex>
      </Flex>
    </div>
  );
}

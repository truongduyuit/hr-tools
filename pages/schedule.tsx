import {
  Box,
  Button,
  Flex,
  FormControl,
  HStack,
  Input,
  Select,
  SimpleGrid,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead, Tooltip, Tr,
  VStack
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import AddForm from "../components/schedule/AddForm";
import Sidebar from "../components/sidebar";
import { Positions } from "../configs";
import { IBranchModel, ICandidateModel, IScheduleModel } from "../database";
import { setLoading, setOpenModal } from "../redux/appSlide";
import { getStartEndDate } from "../utils";

export default function Candidate() {
  const dispatch = useDispatch();

  const [branches, setBranches] = useState<IBranchModel[]>([]);
  const [metadata, setMetadata] = useState<any>({});
  const [schedules, setSchedules] = useState<IScheduleModel[]>();

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [position, setPosition] = useState<string>("undefined");
  const [isPass, setIsPass] = useState<string>("undefined");
  const [branchId, setBranchId] = useState<string>("undefined");


  useEffect(() => {
    loadSchedules(page, limit);
    loadBranches();
  }, []);

  const loadBranches = async () => {
    const result = await axios.get(`/api/branches`);

    if (result && result.data) {
      setBranches(result.data.value.records);
    }
  };

  const loadSchedules = async (page?: number, limit?: number) => {
    dispatch(setLoading(true));

    try {
      const result = await axios.get(
        `/api/schedule?page=${page}&limit=${limit}`
      );
      if (result && result.data.isSuccess) {
        setSchedules(result.data.value.records);
        setMetadata(result.data.value.metadata);
      }
    } catch (error) { }

    dispatch(setLoading(false));
  };

  function range(currentPage: number, totalPage: number) {
    const arr = [];

    for (var i = currentPage - 2; i <= currentPage + 5; i++) {
      if (i >= 0 && i <= totalPage - 1) {
        arr.push(i);
      }

      if (arr.length >= 5) break;
    }

    return arr;
  }

  const handleAddSchedule = (candidate: ICandidateModel) => {
    dispatch(setOpenModal(true));
  };

  const onClose = (reload?: boolean) => {
    if (reload) {
      loadSchedules(page, limit);
    }

    dispatch(setOpenModal(false));
  };

  const handleSearch = async () => {
    dispatch(setLoading(true));

    try {
      let url = `/api/schedule?page=${page}&limit=${limit}`;

      if (search !== "") {
        url += `&search=${search}`;
      }

      if (position !== "undefined") {
        url += `&position=${position}`;
      }

      if (isPass !== "undefined") {
        url += `&position=${isPass}`;
      }

      if (fromDate) {
        const { startDate } = getStartEndDate(
          new Date(fromDate.setHours(fromDate.getHours() + 7))
        );
        url += `&fromDate=${startDate.toISOString()}`;
      }

      if (toDate) {
        const { endDate } = getStartEndDate(
          new Date(toDate.setHours(toDate.getHours() + 7))
        );
        url += `&toDate=${endDate.toISOString()}`;
      }

      const result = await axios.get(url);
      if (result && result.data.isSuccess) {
        setSchedules(result.data.value.records);
        setMetadata(result.data.value.metadata);
      }
    } catch (error) {
      console.log("error: ", error);
    }

    dispatch(setLoading(false));
  };

  return (
    <Flex>
      <Sidebar />
      <Flex ml="50px" flexDir="column" marginTop="2vh" maxW="1440px">
        {/* filter */}
        <Flex align="center" border="2px solid teal" borderRadius={15} p={5}>
          <SimpleGrid minW="1000px" columns={4} spacing={5}>
            <VStack spacing={5}>
              <FormControl>
                <Input
                  id="search"
                  placeholder="Tìm kiếm theo tên, sdt, email"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <Select
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                >
                  <option value="undefined">Tất cả vị trí</option>
                  {
                    Positions.map(p => {
                      return <option key={p} value={p}>{p}</option>
                    })
                  }
                </Select>
              </FormControl>
            </VStack>

            <VStack spacing={5}>
              <FormControl>
                <Select
                  value={String(branchId)}
                  onChange={(e) => setBranchId(e.target.value)}
                >
                  <option value="undefined">Chi nhánh PV</option>

                  {
                    branches.map(b => {
                      const {id, detail} = b;
                      return <option key={id} value={id}>{detail}</option>
                    })
                  }
                </Select>
              </FormControl>

              <FormControl>
                <Select
                  value={String(isPass)}
                  onChange={(e) => setIsPass(e.target.value)}
                >
                  <option value="undefined">KQ phỏng vấn</option>
                  <option value="false">Rớt mất tiêu</option>
                  <option value="true">Đậu rồi</option>
                </Select>
              </FormControl>


            </VStack>

            <VStack spacing={5}>
              <Box border="1px solid #ccc" p={1.5} borderRadius={5}>
                <DatePicker
                  selected={fromDate}
                  onChange={(date: Date) => setFromDate(date)}
                  selectsStart
                  startDate={fromDate}
                  endDate={toDate}
                  placeholderText="Từ ngày"
                  locale="area"
                />
              </Box>

              <Box border="1px solid #ccc" p={1.5} borderRadius={5}>
                <DatePicker
                  selected={toDate}
                  onChange={(date: Date) => setToDate(date)}
                  selectsEnd
                  startDate={fromDate}
                  endDate={toDate}
                  minDate={fromDate}
                  placeholderText="Đến ngày"
                />
              </Box>
            </VStack>

            <VStack spacing={5}>
              <Button colorScheme="teal" onClick={handleSearch} w="120px">
                Tìm kiếm
              </Button>
            </VStack>
          </SimpleGrid>
        </Flex>

        <TableContainer mt={5} minH="750px">
          <Table w="full" overflowX="auto">
            <Thead>
              <Tr bgColor="teal">
                <Th color="#fff">
                  Họ và Tên ({metadata?.totalRecord || 0} ƯV)
                </Th>
                <Th color="#fff">SĐT</Th>
                <Th color="#fff">Vị trí</Th>
                <Th color="#fff">Thương hiệu</Th>
                <Th color="#fff">CN làm việc</Th>
                <Th color="#fff">CN phỏng vấn</Th>
                <Th color="#fff">Ngày giờ phỏng vấn</Th>
                <Th color="#fff">Ghi chú</Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* {schedules?.map((c) => {
                const { name, phone, scheduleInfo = {} } = c;
                const position = scheduleInfo?.position;
                const selectBrand = scheduleInfo?.selectBrand;
                const workBranchInfo = scheduleInfo?.workBranchInfo;
                const interviewBranchInfo = scheduleInfo?.interviewBranchInfo;

                return (
                  <Tr key={c._id.toString()}>
                    <Td>{name}</Td>
                    <Td>{phone}</Td>
                    <Td>{position}</Td>
                    <Td>{selectBrand}</Td>
                    <Td>
                      {workBranchInfo && (
                        <Tooltip
                          hasArrow
                          label={`${scheduleInfo?.workBranchInfo.detail} - ${scheduleInfo?.workBranchInfo.district} - ${scheduleInfo?.workBranchInfo.province}`}
                          bg="red.600"
                        >
                          <Button>{scheduleInfo?.workBranchInfo.symbol}</Button>
                        </Tooltip>
                      )}
                    </Td>
                    <Td>
                      {interviewBranchInfo && (
                        <Tooltip
                          hasArrow
                          label={`${scheduleInfo?.interviewBranchInfo.detail} - ${scheduleInfo?.interviewBranchInfo.district} - ${scheduleInfo?.interviewBranchInfo.province}`}
                          bg="red.600"
                        >
                          <Button>
                            {scheduleInfo?.interviewBranchInfo.symbol}
                          </Button>
                        </Tooltip>
                      )}
                    </Td>
                    <Td>
                      {scheduleInfo?.date.slice(0, 10)} -{" "}
                      {scheduleInfo?.date.slice(11, 16)}
                    </Td>
                    <Td>
                      {c.haveSchedule ? (
                        <>{scheduleInfo?.note}</>
                      ) : (
                        <Button
                          colorScheme="facebook"
                          onClick={(e) => handleAddSchedule(c)}
                        >
                          Thêm lịch PV
                        </Button>
                      )}
                    </Td>
                  </Tr>
                );
              })} */}
            </Tbody>
          </Table>
        </TableContainer>
        <Flex justify="center" mt={5}>
          {Object.keys(metadata).length ? (
            <HStack spacing="24px">
              <Button
                w="7.5rem"
                h="40px"
                disabled={metadata.currentPage === 0}
                // onClick={(e) => loadCandidate(0)}
              >
                Trang đầu (0)
              </Button>
              {range(metadata.currentPage, metadata.totalPage).map((p) => {
                if (p >= 0 && p <= metadata.totalPage) {
                  return (
                    <Button
                      w="3rem"
                      h="40px"
                      color="#fff"
                      bgColor={metadata.currentPage === p ? "teal" : "#ccc"}
                      // onClick={(e) => loadCandidate(p)}
                    >
                      {p + 1}
                    </Button>
                  );
                }
              })}
              <Button
                w="7.5rem"
                h="40px"
                disabled={metadata.currentPage === metadata.totalPage - 1}
                // onClick={(e) => loadCandidate(metadata.totalPage - 1)}
              >
                Trang cuối ({metadata.totalPage})
              </Button>
            </HStack>
          ) : (
            <Box>Không có ứng viên nào</Box>
          )}
        </Flex>
      </Flex>

      {/* {candidateEdit && (
        <AddForm
          isOpen={true}
          candidate={candidateEdit}
          branches={branches}
          onClose={onClose}
        />
      )} */}
    </Flex>
  );
}

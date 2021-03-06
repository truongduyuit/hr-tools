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
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import * as XLSX from "xlsx";
import AddForm from "../../components/schedule/AddForm";
import Sidebar from "../../components/sidebar";
import { ICandidateModel } from "../../database";
import { setLoading, setOpenModal } from "../../redux/appSlide";
import { Tooltip } from "@chakra-ui/react";
import { getStartEndDate } from "../../utils";
import { Positions } from "../../configs";
import { CustomLink } from "../../components/customLink";

export default function Candidate() {
  const dispatch = useDispatch();

  const [branches, setBranches] = useState([]);
  const [candidates, setCandidates] = useState<ICandidateModel[]>([]);
  const [metadata, setMetadata] = useState<any>({});
  const [candidateEdit, setCandidateEdit] = useState<
    ICandidateModel | undefined
  >();

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [position, setPosition] = useState<string>("undefined");
  const [haveSchedule, setHaveSchedule] = useState<string>("undefined");
  const [status, setStatus] = useState<string>("undefined");

  useEffect(() => {
    loadCandidate(page, limit);
    loadBranches();
  }, []);

  const loadBranches = async () => {
    const result = await axios.get(`/api/branches`);

    if (result && result.data) {
      setBranches(result.data.value.records);
    }
  };

  const loadCandidate = async (page?: number, limit?: number) => {
    dispatch(setLoading(true));

    try {
      const result = await axios.get(
        `/api/candidate?page=${page}&limit=${limit}`
      );
      if (result && result.data.isSuccess) {
        setCandidates(result.data.value.records);
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
    setCandidateEdit(candidate);
    dispatch(setOpenModal(true));
  };

  const onClose = (reload?: boolean) => {
    if (reload) {
      loadCandidate(page, limit);
    }

    dispatch(setOpenModal(false));
    setCandidateEdit(undefined);
  };

  const handleExportData = async () => {
    const rows = candidates.map((c) => {
      const { name, phone, dob, scheduleInfo } = c;
      const { selectBrand, position, note, workBranchInfo, interviewBranchInfo } = scheduleInfo || {};

      return {
        name: name,
        phone: phone,
        dob: dob.slice(0, 10),
        position,
        selectBrand,
        workAddress: workBranchInfo?.symbol,
        interviewAddress: interviewBranchInfo?.symbol,
        hour: scheduleInfo?.date.slice(11, 16),
        date: scheduleInfo?.date.slice(0, 10),
        note,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "(My)Chuk");

    /* fix headers */
    XLSX.utils.sheet_add_aoa(worksheet, [[`Ng??y `]], { origin: "A1" });
    XLSX.utils.sheet_add_aoa(
      worksheet,
      [
        [
          "H??? t??n",
          "S??T",
          "DOB",
          "V??? tr??",
          "Th????ng hi???u",
          "Chi nh??nh l??m vi???c",
          "Ph???ng v???n",
          "Gi???",
          "Ng??y",
          "Ghi ch??",
        ],
      ],
      { origin: "A1" }
    );

    /* calculate column width */
    const max_width = rows.reduce((w, r) => Math.max(w, r.name.length), 10);
    worksheet["!cols"] = [{ wch: max_width }];

    XLSX.writeFile(workbook, "???ng zi??n.xlsx");
  };

  const handleSearch = async () => {
    dispatch(setLoading(true));

    try {
      let url = `/api/candidate?page=${page}&limit=${limit}`;

      if (search !== "") {
        url += `&search=${search}`;
      }

      if (position !== "undefined") {
        url += `&position=${position}`;
      }

      if (haveSchedule !== "undefined") {
        url += `&haveSchedule=${haveSchedule}`;
      }

      if (status !== "undefined") {
        url += `&status=${status}`;
      }

      if (fromDate) {
        const { startDate } = getStartEndDate(new Date(fromDate.setHours(fromDate.getHours() + 7)))
        url += `&fromDate=${startDate.toISOString()}`;
      }

      if (toDate) {
        const { endDate } = getStartEndDate(new Date(toDate.setHours(toDate.getHours() + 7)))
        url += `&toDate=${endDate.toISOString()}`;
      }

      const result = await axios.get(url);
      if (result && result.data.isSuccess) {
        setCandidates(result.data.value.records);
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
                  placeholder="T??m ki???m theo t??n, sdt, email"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <Select
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                >
                  <option value="undefined">T???t c??? v??? tr??</option>
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
                  value={String(haveSchedule)}
                  onChange={(e) => setHaveSchedule(e.target.value)}
                >
                  <option value="undefined">L???ch ph???ng v???n</option>
                  <option value="false">Ch??a c??</option>
                  <option value="true">???? c??</option>
                </Select>
              </FormControl>

              <FormControl>
                <Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="undefined">Tr???ng th??i</option>
                  <option value="0">??ang ???ng tuy???n</option>
                  <option value="1">??ang l??m vi???c</option>
                  <option value="-1">???? ngh??? vi???c</option>
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
                  placeholderText="T??? ng??y"
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
                  placeholderText="?????n ng??y"
                />
              </Box>
            </VStack>

            <VStack spacing={5}>
              <Button colorScheme="teal" onClick={handleSearch} w="120px">
                T??m ki???m
              </Button>
              <Button
                colorScheme="facebook"
                onClick={handleExportData}
                w="120px"
              >
                Export Data
              </Button>
            </VStack>
          </SimpleGrid>
        </Flex>

        <TableContainer mt={5} minH="750px">
          <Table w="full" overflowX="auto">
            <Thead>
              <Tr bgColor="teal">
                <Th color="#fff">
                  H??? v?? T??n ({metadata?.totalRecord || 0} ??V)
                </Th>
                <Th color="#fff">S??T</Th>
                <Th color="#fff">V??? tr??</Th>
                <Th color="#fff">Th????ng hi???u</Th>
                <Th color="#fff">CN l??m vi???c</Th>
                <Th color="#fff">CN ph???ng v???n</Th>
                <Th color="#fff">Ng??y gi??? ph???ng v???n</Th>
                <Th color="#fff">Ghi ch??</Th>
              </Tr>
            </Thead>
            <Tbody>
              {candidates?.map((c) => {
                const { name, phone, scheduleInfo = {} } = c;
                const position = scheduleInfo?.position;
                const selectBrand = scheduleInfo?.selectBrand;
                const workBranchInfo = scheduleInfo?.workBranchInfo;
                const interviewBranchInfo = scheduleInfo?.interviewBranchInfo;

                return (
                  <Tr key={c._id.toString()}>
                    <Td><CustomLink href={`/candidate/${c.id}`} label={name} /></Td>
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
                          Th??m l???ch PV
                        </Button>
                      )}
                    </Td>
                  </Tr>
                );
              })}
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
                onClick={(e) => loadCandidate(0)}
              >
                Trang ?????u (0)
              </Button>
              {range(metadata.currentPage, metadata.totalPage).map((p) => {
                if (p >= 0 && p <= metadata.totalPage) {
                  return (
                    <Button
                      w="3rem"
                      h="40px"
                      color="#fff"
                      bgColor={metadata.currentPage === p ? "teal" : "#ccc"}
                      onClick={(e) => loadCandidate(p)}
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
                onClick={(e) => loadCandidate(metadata.totalPage - 1)}
              >
                Trang cu???i ({metadata.totalPage})
              </Button>
            </HStack>
          ) : (
            <Box>Kh??ng c?? ???ng vi??n n??o</Box>
          )}
        </Flex>
      </Flex>

      {candidateEdit && (
        <AddForm
          isOpen={true}
          candidate={candidateEdit}
          branches={branches}
          onClose={onClose}
        />
      )}
    </Flex>
  );
}

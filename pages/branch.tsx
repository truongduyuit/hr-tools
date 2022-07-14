import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Table,
  TableContainer,
  Tag,
  TagLabel,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import BranchForm from "../components/branch/Form";
import Sidebar from "../components/sidebar";
import { IBranchModel } from "../database";
import { setLoading, setOpenModal } from "../redux/appSlide";
import { RootState } from "../redux/store";
import { paginationRange } from "../utils";

export default function Candidate() {
  const toast = useToast();
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.app.modalOpened);

  const [types, setTypes] = useState<any[]>([]);
  const [branches, setBranches] = useState<IBranchModel[]>([]);
  const [metadata, setMetadata] = useState<any>({});
  const [branchEdit, setBranchEdit] = useState<IBranchModel | undefined>();

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    loadBranches(page, limit);
    loadAddresses();
  }, []);

  const loadBranches = async (page?: number, limit?: number) => {
    dispatch(setLoading(true));

    try {
      let url = `/api/branches?page=${page}&limit=${limit}`;

      if (search !== "") {
        url += `&search=${search}`;
      }

      const result = await axios.get(url);
      if (result && result.data.isSuccess) {
        setBranches(result.data.value.records);
        setMetadata(result.data.value.metadata);
      }
    } catch (error) {
      toast({
        title: "Thêm lịch phỏng vấn thất bại",
        description: `${JSON.stringify(error)}`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
    }

    dispatch(setLoading(false));
  };

  const loadAddresses = async () => {
    const result = await axios.get("/api/branches/addresses");
    if (result && result.data) {
      setTypes(result.data.value.types);
    }
  };

  const handleEdit = (branch: IBranchModel) => {
    setBranchEdit(branch);
    dispatch(setOpenModal(true));
  };

  const onClose = (reload?: boolean) => {
    if (reload) {
      loadBranches(page, limit);
    }

    dispatch(setOpenModal(false));
  };

  return (
    <Flex>
      <Sidebar />
      <Flex ml="50px" flexDir="column" marginTop="2vh">
        <Flex align="center" border="2px solid teal" borderRadius={15} p={5}>
          <HStack spacing={5}>
            <Input
              w="50rem"
              id="search"
              placeholder="Tìm kiếm theo kí hiệu, tỉnh/tp, quận/huyện"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Button
              colorScheme="teal"
              onClick={(e) => loadBranches(page, limit)}
              w="120px"
            >
              Tìm kiếm
            </Button>
          </HStack>
        </Flex>

        <TableContainer mt={5} minW="1200px" minH="600px">
          <Table w="full" overflowX="auto">
            <Thead>
              <Tr bgColor="teal">
                <Th color="#fff">Kí hiệu ({metadata.totalRecord})</Th>
                <Th color="#fff">Loại hình</Th>
                <Th color="#fff">Hotline</Th>
                <Th color="#fff">Email</Th>
                <Th color="#fff">Trạng thái</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {branches?.map((b) => {
                const {
                  _id,
                  symbol,
                  province,
                  district,
                  detail,
                  type,
                  hotline,
                  email,
                  status,
                } = b;
                return (
                  <Tr key={_id.toString()}>
                    <Td>
                      <Tooltip
                        hasArrow
                        label={`${detail} - ${district} - ${province}`}
                        bg="gray.300"
                        color="black"
                      >
                        <Button onClick={(e) => handleEdit(b)}>{symbol}</Button>
                      </Tooltip>
                    </Td>
                    <Td>{type}</Td>
                    <Td>{hotline}</Td>
                    <Td>
                      <Box
                        as="a"
                        color="blue"
                        textDecoration="underline"
                        href={`mailto:${email}`}
                      >
                        {email}
                      </Box>
                    </Td>
                    <Td>
                      {status ? (
                        <Tag size="md" variant="subtle" colorScheme="green">
                          <TagLabel>Hoạt động</TagLabel>
                        </Tag>
                      ) : (
                        <Tag size="md" variant="subtle" colorScheme="red">
                          <TagLabel>Đã đóng cửa</TagLabel>
                        </Tag>
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
                disabled={metadata.currentPage === 0 || !metadata.currentPage}
                onClick={(e) => loadBranches(0, limit)}
              >
                Trang đầu (0)
              </Button>
              {paginationRange(metadata.currentPage, metadata.totalPage).map(
                (p) => {
                  if (p >= 0 && p <= metadata.totalPage) {
                    return (
                      <Button
                        w="3rem"
                        h="40px"
                        color="#fff"
                        bgColor={metadata.currentPage === p ? "teal" : "#ccc"}
                        onClick={(e) => loadBranches(p, limit)}
                      >
                        {p + 1}
                      </Button>
                    );
                  }
                }
              )}
              <Button
                w="7.5rem"
                h="40px"
                disabled={
                  metadata.currentPage === metadata.totalPage - 1 ||
                  !metadata.currentPage
                }
                onClick={(e) => loadBranches(metadata.totalPage - 1, limit)}
              >
                Trang cuối ({metadata.totalPage})
              </Button>
            </HStack>
          ) : (
            <Box>Không có chi nhánh nào</Box>
          )}
        </Flex>
      </Flex>

      {branchEdit && (
        <BranchForm
          info={branchEdit}
          isOpen={isOpen}
          onClose={onClose}
          types={types}
        />
      )}
    </Flex>
  );
}

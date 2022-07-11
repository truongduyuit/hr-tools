import { Box, Button, Center, Flex, HStack, Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Sidebar from "../components/sidebar";
import { ICandidateModel } from "../database";
import { setLoading } from "../redux/appSlide";


export default function Candidate() {
    const dispatch = useDispatch()

    const [candidates, setCandidates] = useState<ICandidateModel[]>([])
    const [metadata, setMetadata] = useState<any>({})

    useEffect(() => {


        loadCandidate()
    }, [])

    const loadCandidate = async (page = 0, limit = 2) => {
        dispatch(setLoading(true))

        try {
            const result = await axios.get(`/api/candidate?page=${page}&limit=${limit}`)
            if (result && result.data.isSuccess) {
                setCandidates(result.data.value.records)
                setMetadata(result.data.value.metadata)
            }
        } catch (error) {

        }

        dispatch(setLoading(false))
    }

    function range(currentPage: number, totalPage: number) {
        const arr = [];

        for (var i = currentPage - 2; i <= currentPage + 5; i++) {
            if (i >= 0 && i <= totalPage - 1) {
                arr.push(i);
            }

            if (arr.length >= 5) break
        }
        
        return arr;
    }

    console.log("candidates: ", candidates)

    return (
        <Flex>
            <Sidebar />
            <Flex
                ml="50px"
                flexDir="column"
                marginTop="2.5vh"

            >
                <TableContainer mt={5} >
                    <Table w="full" overflowX="auto">
                        <Thead>
                            <Tr bgColor='teal'>
                                <Th color="#fff">Họ và Tên</Th>
                                <Th color="#fff">SĐT</Th>
                                <Th color="#fff">DOB</Th>
                                <Th color="#fff">Vị trí</Th>
                                <Th color="#fff">Thương hiệu</Th>
                                <Th color="#fff">CN làm việc</Th>
                                <Th color="#fff">CN phỏng vấn</Th>
                                <Th color="#fff">Ngày giờ phỏng vấn</Th>
                                <Th color="#fff">Ghi chú</Th>
                            </Tr>
                        </Thead>
                        <Tbody>

                        </Tbody>
                    </Table>
                </TableContainer>
                <Flex justify="center" mt={5}>
                    {
                        Object.keys(metadata).length ? <HStack spacing='24px'>
                            <Button w='7.5rem' h='40px' disabled={metadata.currentPage === 0} onClick={e => loadCandidate(0)}>
                                Trang đầu (0)
                            </Button>
                            {
                                range(metadata.currentPage, metadata.totalPage).map(p => {
                                    if (p >= 0 && p <= metadata.totalPage) {
                                        return <Button w='3rem' h='40px' color="#fff" bgColor={metadata.currentPage === p ? "teal" : "#ccc"} onClick={e => loadCandidate(p)}>
                                            {p + 1}
                                        </Button>
                                    }
                                })
                            }
                            <Button w='7.5rem' h='40px' disabled={metadata.currentPage === metadata.totalPage - 1} onClick={e => loadCandidate(metadata.totalPage - 1)}>
                                Trang cuối ({metadata.totalPage})
                            </Button>
                        </HStack> : <Box>Không có ứng viên nào</Box>
                    }
                </Flex>

            </Flex>


        </Flex>
    );
}


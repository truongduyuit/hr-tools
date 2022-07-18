import { chakra, Container, Flex, HStack, IconButton, Table, TableContainer, Tbody, Td, Th, Thead, Tooltip, Tr, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { BsFillTrashFill } from "react-icons/bs";
import Sidebar from '../../components/sidebar';
import { CandidateConfigLabel } from '../../configs';
import { ICandidateModel, IScheduleModel } from '../../database';

export default function CandidateDetailPage() {
    const router = useRouter()
    const { id } = router.query

    const [candidate, setCandidate] = useState<ICandidateModel | any>()
    const [schedules, setSchedules] = useState<IScheduleModel[]>([])

    useEffect(() => {
        loadCandidate()
        loadSchedules()
    }, [id])

    const loadCandidate = async () => {
        if (id) {
            const result = await axios.get(`/api/candidate/${id}`)
            if (result && result.data.isSuccess) {
                setCandidate(result.data.value);
            }
        }

    }

    const loadSchedules = async () => {
        if (id) {
            const result = await axios.get(`/api/schedule?candidateId=${id}`)
            if (result && result.data.isSuccess) {
                setSchedules(result.data.value.records);
            }
        }
    }

    return (
        <Flex>
            <Sidebar />
            <Flex ml="50px" marginTop="2vh" maxW="1440px">
                <HStack spacing={10} w="full">
                    <TableContainer>
                        <Table variant='striped' colorScheme='teal'>
                            <Thead>
                                <Tr>
                                    <Th>Thông tin Ứng viên </Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    Object.keys(candidate || {}).map((key: string) => {
                                        if (!CandidateConfigLabel[key]) return <></>

                                        return <Tr key={key}>
                                            <Td>{CandidateConfigLabel[key]}</Td>
                                            <Td>{candidate[key]}</Td>
                                        </Tr>
                                    })
                                }

                            </Tbody>
                        </Table>
                    </TableContainer>

                    <VStack spacing={5}>
                        <chakra.h1
                            fontSize={"4xl"}
                            fontWeight={"bold"}
                        >
                            Danh sách phỏng vấn
                        </chakra.h1>
                        <TableContainer>
                            <Table>
                                <Thead>
                                    <Tr>
                                        <Th>Ngày</Th>
                                        <Th>Giờ</Th>
                                        <Th>Chi nhánh PV</Th>
                                        <Th>Kết quả</Th>
                                        <Th>Ghi chú</Th>
                                        <Th>Cập nhật</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {schedules?.map((c) => {
                                        const { id, date, isPass, interviewBranchInfo, note } = c;

                                        return (
                                            <Tr key={id}>
                                                <Td>{new Date(date).toLocaleString("VI").slice(-10)}</Td>
                                                <Td>{new Date(date).toLocaleString("VI").slice(0, 5)}</Td>
                                                <Td>
                                                    <Tooltip label={`${interviewBranchInfo?.hotline} - ${interviewBranchInfo?.detail}`}>
                                                        {`${interviewBranchInfo?.symbol}`}
                                                    </Tooltip>
                                                </Td>
                                                <Td>
                                                    {isPass === true ? "Đậu" : isPass === false ? "Rớt" : "Chưa có kết quả"}
                                                </Td>
                                                <Td>
                                                    {note}
                                                </Td>
                                                <Td>
                                                    <HStack spacing={3}>
                                                        <IconButton
                                                            colorScheme="green"
                                                            icon={<AiFillEdit />}
                                                            aria-label="Edit"
                                                        />
                                                        <IconButton
                                                            colorScheme="red"
                                                            variant="outline"
                                                            icon={<BsFillTrashFill />}
                                                            aria-label="Delete"
                                                        />
                                                    </HStack>
                                                </Td>
                                            </Tr>
                                        );
                                    })}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </VStack>
                </HStack>
            </Flex>
        </Flex>

    )
}

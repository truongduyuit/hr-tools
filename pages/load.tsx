import { Button, Flex, Table, TableContainer, Tbody, Th, Thead, Tr, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as XLSX from "xlsx";
import Candidate from "../components/candidateData";
import Sidebar from "../components/sidebar";
import { CandidateConfig } from "../configs";
import { setLoading } from "../redux/appSlide";

export default function Load() {
    const toast = useToast()
    const dispatch = useDispatch()

    const [data, setData] = useState<any[]>([])

    const onChange = (e: any) => {
        const [file] = e.target.files;
        const reader = new FileReader();

        reader.onload = (e: any) => {
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, {
                type: 'binary',
                cellDates: true,
                cellNF: false,
                cellText: false
            });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws, { header: "A" }).slice(1)

            setData(data)
        };

        if (file)
            reader.readAsBinaryString(file);
    };

    const onSave = async () => {
        dispatch(setLoading(true))

        try {
            const candidates = data?.map(i => {
                let candidate = {}
                Object.keys(i).forEach((key) => {
                    if (CandidateConfig[key]) {
                        const field = CandidateConfig[key].key
                        candidate = { ...candidate, [field]: key === "A" ? JSON.stringify(i?.[key]).replaceAll('"', '') : i?.[key] }
                    }
                })
                return candidate
            })

            const result = await axios.post("/api/candidate", {
                candidates
            })

            if (result && result.data.isSuccess) {
                toast({
                    title: 'Thêm dữ liệu ứng viên thành công',
                    description: `Đã thêm ${data?.length} ứng viên`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-right"
                })
            } else {
                toast({
                    title: 'Thêm dữ liệu ứng viên thất bại',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-right"
                })
            }

            setData([])
        } catch (error) {
            toast({
                title: 'Thêm dữ liệu ứng viên thất bại',
                description: error,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "bottom-right"
            })
        }

        dispatch(setLoading(false))
    }

    return (
        <div>
            <Flex>
                <Sidebar />
                <Flex
                    ml="50px"
                    flexDir="column"
                    marginTop="2.5vh"
                >
                    <Flex justify={'space-around'}>
                        <input type="file" onChange={onChange} />

                        <Button colorScheme="teal" w="5rem" onClick={onSave} disabled={!data.length}>
                            Lưu
                        </Button>
                    </Flex>

                    <TableContainer mt={5} >
                        <Table w="full" overflowX="auto">
                            <Thead>
                                <Tr bgColor='teal'>
                                    <Th color="#fff">Họ và Tên</Th>
                                    <Th color="#fff">SĐT</Th>
                                    <Th color="#fff">Vị trí apply</Th>
                                    <Th color="#fff">Thương hiệu apply</Th>
                                    <Th color="#fff">Khu vực</Th>
                                    <Th color="#fff">Kinh nghiệm làm việc</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    data?.map((i: any, index: number) => {
                                        return <Candidate key={index} info={i} />
                                    })
                                }
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Flex>
            </Flex>
        </div >
    );
}
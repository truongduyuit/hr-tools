import { Box, Button, Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as XLSX from "xlsx";
import Candidate from "../components/candidateData";
import Sidebar from "../components/sidebar";
import { setLoading } from "../redux/appSlide";

export default function App() {
    const dispatch = useDispatch()
    const [data, setData] = useState<any[]>()

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

    const onSave = () => {
        dispatch(setLoading(true))

        try {
            

            setData([])
        } catch (error) {

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

                        <Button colorScheme="teal" w="5rem" onClick={onSave}>
                            Lưu
                        </Button>
                    </Flex>

                    <TableContainer mt={5} >
                        <Table w="full" overflowX="auto">
                            <Thead>
                                <Tr bgColor='blue'>
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
import {
  Button,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as XLSX from "xlsx";
import Candidate from "../components/candidateData";
import Sidebar from "../components/sidebar";
import { CandidateConfig } from "../configs";
import { setLoading } from "../redux/appSlide";
import { toNormalForm } from "../utils";

const Load = () => {
  const toast = useToast();
  const dispatch = useDispatch();

  const [data, setData] = useState<any[]>([]);

  const onChange = (e: any) => {
    const [file] = e.target.files;
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, {
        type: "binary",
        cellDates: true,
        cellNF: false,
        cellText: false,
      });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: "A" }).slice(1);

      setData(data);
    };

    if (file) reader.readAsBinaryString(file);
  };

  const onSave = async () => {
    dispatch(setLoading(true));

    try {
      const candidates = data?.map((i) => {
        let candidate = {};
        Object.keys(i).forEach((key) => {
          if (CandidateConfig[key]) {
            const field = CandidateConfig[key].key;
            candidate = {
              ...candidate,
              [field]:
                key === "A"
                  ? JSON.stringify(i?.[key]).replaceAll('"', "")
                  : i?.[key],
            };
          }
        });

        candidate = {
          ...candidate,
          nameNoAccent: toNormalForm(
            String(JSON.parse(JSON.stringify(candidate)).name)
          ).toLowerCase(),
        };
        return candidate;
      });

      const result = await axios.post("/api/candidate", {
        candidates,
      });

      if (result && result.data.isSuccess) {
        toast({
          title: "Th??m d??? li???u ???ng vi??n th??nh c??ng",
          description: `???? th??m ${data?.length} ???ng vi??n`,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom-right",
        });
      } else {
        toast({
          title: "Th??m d??? li???u ???ng vi??n th???t b???i",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-right",
        });
      }

      setData([]);
    } catch (error) {
      toast({
        title: "Th??m d??? li???u ???ng vi??n th???t b???i",
        description: `Error: ${error}`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
    }

    dispatch(setLoading(false));
  };

  useEffect(() => {
    dispatch(setLoading(false))
  }, [])
  
  
  return (
    <div>
      <Flex>
        <Sidebar />
        <Flex ml="50px" flexDir="column" marginTop="2.5vh">
          <Flex justify={"space-around"}>
            <input type="file" onChange={onChange} />

            <Button
              colorScheme="teal"
              w="5rem"
              onClick={onSave}
              disabled={!data.length}
            >
              L??u
            </Button>
          </Flex>

          <TableContainer mt={5}>
            <Table w="full" overflowX="auto">
              <Thead>
                <Tr bgColor="teal">
                  <Th color="#fff">H??? v?? T??n</Th>
                  <Th color="#fff">S??T</Th>
                  <Th color="#fff">V??? tr?? apply</Th>
                  <Th color="#fff">Th????ng hi???u apply</Th>
                  <Th color="#fff">Khu v???c</Th>
                  <Th color="#fff">Kinh nghi???m l??m vi???c</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((i: any, index: number) => {
                  return <Candidate key={index} info={i} />;
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      </Flex>
    </div>
  );
};

export default Load;

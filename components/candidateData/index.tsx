import { Center } from "@chakra-ui/react";
import {
  Td,
  Textarea,
  Tr,
  useDisclosure,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Box,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
} from "@chakra-ui/react";
import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { CandidateConfig } from "../../configs";

export default function Candidate({ info }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Tr>
        <Td>
          <Button colorScheme="teal" onClick={onOpen}>
            {info.F}
          </Button>
        </Td>
        <Td>{info.C}</Td>
        <Td>{info.D}</Td>
        <Td>{info.S}</Td>
        <Td>
          <Textarea value={info.E} />
        </Td>
        <Td>
          <Textarea value={info.N} />
        </Td>
      </Tr>
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Center>Thông tin ứng viên</Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer>
              <Table variant="striped" colorScheme="teal">
                <Thead>
                  <Tr bgColor="blue">
                    <Th color="#fff">Họ và Tên</Th>
                    <Th color="#fff">SĐT</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {Object.keys(CandidateConfig).map((c) => {
                    const { key, label, column } = CandidateConfig[c];

                    return (
                      <Tr key={key}>
                        <Td>{label}</Td>
                        <Td>
                          {["A", "G", "T"].includes(column)
                            ? JSON.stringify(info?.[column])
                            : info?.[column]}
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} colorScheme="teal">Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

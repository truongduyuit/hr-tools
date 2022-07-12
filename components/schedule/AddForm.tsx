import {
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { setLoading, setOpenModal } from "../../redux/appSlide";
import axios from "axios";

import "react-datepicker/dist/react-datepicker.css";

export default function AddForm({ isOpen, candidate, addresses, onClose }: any) {
  const toast = useToast();
  const dispatch = useDispatch();

  const { name, workType, workArea, brand } = candidate;
  const [position, setPosition] = useState<string>()
  const [selectBrand, setSelectBrand] = useState<string>()
  const [workAddress, setWorkAddress] = useState<string>();
  const [interviewAddress, setInterviewAddress] = useState<string>();
  const [interviewDate, setInterviewDate] = useState(new Date());
  const [note, setNote] = useState<string>("");


  const handleChangeWork = (newValue: any, _: any) => {
    setWorkAddress(newValue.id);
  };

  const handleChangeInterview = (newValue: any, _: any) => {
    setInterviewAddress(newValue.id);
  };

  const handleCreateSchedule = async () => {
    dispatch(setLoading(true));

    try {
      const result = await axios.post("/api/schedule", {
        candidateId: candidate._id,
        workAddress: workAddress,
        interviewAddress: interviewAddress,
        date: interviewDate,
        note,
        position,
        selectBrand
      });

      if (result && result.data.isSuccess) {
        toast({
          title: "Thêm lịch phỏng vấn thành công",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom-right",
        });
      } else {
        toast({
          title: "Thêm lịch phỏng vấn thất bại",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-right",
        });
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

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Center>Thêm lịch PV</Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={5}>
              <FormControl>
                <FormLabel htmlFor="email">
                  Họ và Tên: <b>{name}</b>
                </FormLabel>
              </FormControl>

              <FormControl as="fieldset">
                <FormLabel as="legend">Chọn vị trí</FormLabel>
                <RadioGroup onChange={value => setPosition(value)}>
                  <HStack spacing="24px">
                    <Radio value="Part time">Part time</Radio>
                    <Radio value="Full time">Full time</Radio>
                    <Radio value="Captain">Captain</Radio>
                  </HStack>
                </RadioGroup>
                <FormHelperText>Vị trí mong muốn: {workType}</FormHelperText>
              </FormControl>

              <FormControl as="fieldset">
                <FormLabel as="legend">Chọn thương hiệu</FormLabel>
                <RadioGroup onChange={value => setSelectBrand(value)}>
                  <HStack spacing="24px">
                    <Radio value="Chuk">Chuk</Radio>
                    <Radio value="Bánh mì ơi">Bánh mì ơi</Radio>
                  </HStack>
                </RadioGroup>
                <FormHelperText>Thương hiệu mong muốn: {brand}</FormHelperText>
              </FormControl>

              <FormControl as="fieldset">
                <FormLabel as="legend">Chọn địa chỉ làm việc</FormLabel>
                <Select
                  tagVariant="solid"
                  options={addresses}
                  onChange={(newValue, metadata) => handleChangeWork(newValue, metadata)}
                />
                <FormHelperText>Khu vực mong muốn: {workArea}</FormHelperText>
              </FormControl>

              <FormControl as="fieldset">
                <FormLabel as="legend">Chọn địa chỉ phỏng vấn</FormLabel>
                <Select
                  tagVariant="solid"
                  options={addresses}
                  onChange={(newValue, metadata) =>
                    handleChangeInterview(newValue, metadata)
                  }
                />
              </FormControl>

              <FormControl as="fieldset">
                <FormLabel as="legend">Chọn ngày / giờ phỏng vấn</FormLabel>

                <DatePicker
                  selected={interviewDate}
                  onChange={(date: Date) => setInterviewDate(date)}
                  showTimeSelect
                  dateFormat="dd/MM/yyyy HH:mm"
                />
              </FormControl>

              <FormControl as="fieldset">
                <FormLabel as="legend">Ghi chú</FormLabel>

                <Textarea
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder="Nhập ghi chú"
                  size="sm"
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <HStack spacing={5}>
              <Button onClick={onClose}>Hủy bỏ</Button>
              <Button onClick={handleCreateSchedule} colorScheme="teal">
                Thêm mới
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

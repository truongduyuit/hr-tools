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
  SimpleGrid,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { Select } from "chakra-react-select";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { Brands, Positions } from "../../configs";
import { setLoading } from "../../redux/appSlide";

export default function AddForm({ isOpen, candidate, branches, onClose }: any) {
  const toast = useToast();
  const dispatch = useDispatch();

  const { name, workType, workArea, brand } = candidate;
  const [position, setPosition] = useState<string>();
  const [selectBrand, setSelectBrand] = useState<string>();
  const [workAddress, setWorkAddress] = useState<string>();
  const [interviewAddress, setInterviewAddress] = useState<string>();
  const [interviewDate, setInterviewDate] = useState(new Date());
  const [note, setNote] = useState<string>("");
  const [addresses, setAddresses] = useState<any[]>([]);

  useEffect(() => {
    if (branches) {
      let adds = {} as any;
      branches.map((b: any) => {
        const { _id, symbol, province, district, detail } = b;

        if (province && district) {
          const key = `=============== ${province} - ${district} ===============`;
          const option = {
            label: `${symbol} - ${detail}`,
            id: _id,
          };

          if (adds[key]) {
            adds[key].push(option);
          } else {
            adds[key] = [option];
          }
        }
      });

      const addressMap = Object.keys(adds).map((key) => {
        return {
          label: key,
          options: adds[key],
        };
      });
      setAddresses(addressMap);
    }
  }, [branches]);

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
        workBranchId: workAddress,
        interviewBranchId: interviewAddress,
        date: interviewDate.toISOString(),
        note,
        position,
        selectBrand,
      });

      if (result && result.data.isSuccess) {
        toast({
          title: "Th??m l???ch ph???ng v???n th??nh c??ng",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom-right",
        });

        onClose(true);
      } else {
        toast({
          title: "Th??m l???ch ph???ng v???n th???t b???i",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-right",
        });
      }
    } catch (error) {
      toast({
        title: "Th??m l???ch ph???ng v???n th???t b???i",
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
            <Center>Th??m l???ch PV</Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={5}>
              <FormControl>
                <FormLabel htmlFor="email">
                  H??? v?? T??n: <b>{name}</b>
                </FormLabel>
              </FormControl>

              <FormControl as="fieldset">
                <FormLabel as="legend">Ch???n v??? tr??</FormLabel>
                <RadioGroup onChange={(value) => setPosition(value)}>
                  <SimpleGrid columns={3} spacing={3}>
                    {Positions.map((p) => {
                      return (
                        <Radio key={p} value={p}>
                          {p}
                        </Radio>
                      );
                    })}
                  </SimpleGrid>
                </RadioGroup>
                <FormHelperText>V??? tr?? mong mu???n: {workType}</FormHelperText>
              </FormControl>

              <FormControl as="fieldset">
                <FormLabel as="legend">Ch???n th????ng hi???u</FormLabel>
                <RadioGroup onChange={(value) => setSelectBrand(value)}>
                  <SimpleGrid columns={3} spacing={3}>
                    {Brands.map((p) => {
                      return (
                        <Radio key={p} value={p}>
                          {p}
                        </Radio>
                      );
                    })}
                  </SimpleGrid>
                </RadioGroup>
                <FormHelperText>Th????ng hi???u mong mu???n: {brand}</FormHelperText>
              </FormControl>

              <FormControl as="fieldset">
                <FormLabel as="legend">Ch???n ?????a ch??? l??m vi???c</FormLabel>
                <Select
                  tagVariant="solid"
                  options={addresses}
                  onChange={(newValue, metadata) =>
                    handleChangeWork(newValue, metadata)
                  }
                />
                <FormHelperText>Khu v???c mong mu???n: {workArea}</FormHelperText>
              </FormControl>

              <FormControl as="fieldset">
                <FormLabel as="legend">Ch???n ?????a ch??? ph???ng v???n</FormLabel>
                <Select
                  tagVariant="solid"
                  options={addresses}
                  onChange={(newValue, metadata) =>
                    handleChangeInterview(newValue, metadata)
                  }
                />
              </FormControl>

              <FormControl as="fieldset">
                <FormLabel as="legend">Ch???n ng??y / gi??? ph???ng v???n</FormLabel>

                <DatePicker
                  selected={interviewDate}
                  onChange={(date: Date) => setInterviewDate(date)}
                  showTimeSelect
                  dateFormat="dd/MM/yyyy HH:mm"
                />
              </FormControl>

              <FormControl as="fieldset">
                <FormLabel as="legend">Ghi ch??</FormLabel>

                <Textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Nh???p ghi ch??"
                  size="sm"
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <HStack spacing={5}>
              <Button onClick={onClose}>H???y b???</Button>
              <Button onClick={handleCreateSchedule} colorScheme="teal">
                Th??m m???i
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

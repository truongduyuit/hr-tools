import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { CUIAutoComplete } from "chakra-ui-autocomplete";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/appSlide";

const BranchForm: React.FC<any> = ({ info = {}, isOpen, onClose, types }: any) => {
  const toast = useToast();
  const dispatch = useDispatch();

  const [pickerType, setPickerType] = useState<any[]>([]);
  const [selectedType, setSelectedType] = useState<any[]>([]);
  const [symbol, setSymbol] = useState<string>("");
  const [province, setProvince] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [detail, setDetail] = useState<string>("");
  const [hotline, setHotline] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [lead, setLead] = useState<string>("");
  const [status, setStatus] = useState<boolean>(true);

  useEffect(() => {
    const ts = types?.map((t: string) => {
      let item = {
        label: t,
        value: t,
      };
      if (t === info.type) {
        setSelectedType([item]);
      }

      return item;
    });

    if (info) {
      setPickerType(ts);
      setSymbol(info.symbol);
      setProvince(info.province);
      setDistrict(info.district);
      setDetail(info.detail);
      setHotline(info.hotline);
      setEmail(info.email);
      setLead(info.lead);
      setStatus(info.status ? true : false);
    }
  }, [info]);

  const handleCreateItem = (item: any) => {
    setPickerType((curr: any) => [...curr, item]);
    setSelectedType((curr: any) => [...curr, item]);
  };

  const handleSelectedItemsChange = (selectedItems: any) => {
    if (selectedItems && selectedItems.length) {
      setSelectedType([selectedItems[selectedItems.length - 1]]);
    } else {
      setSelectedType([]);
    }
  };

  const showErrorToast = (description?: string) => {
    toast({
      title: `${info._id ? "Ch???nh s???a" : "Th??m"} chi nh??nh th???t b???i`,
      description,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom-right",
    });
  };

  const handleCreateOrUpdate = async () => {
    dispatch(setLoading(true));

    try {
      const result = await axios.post("/api/branches", {
        _id: info._id,
        symbol,
        type: selectedType.length ? selectedType[0].value : "",
        province,
        district,
        detail,
        lead,
        hotline,
        status,
      });

      if (result && result.data.isSuccess) {
        toast({
          title: `${info._id ? "Ch???nh s???a" : "Th??m"} chi nh??nh th??nh c??ng`,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom-right",
        });

        onClose(true);
      } else showErrorToast();
    } catch (error) {
      showErrorToast(`${JSON.stringify(error)}`);
    }

    dispatch(setLoading(false));
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Center>{info._id ? "Ch???nh s???a " : "Th??m "} chi nh??nh</Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={5}>
              <FormControl>
                <FormLabel htmlFor="symbol">K?? hi???u</FormLabel>
                <Input
                  id="symbol"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                />
              </FormControl>

              <Box w="full">
                <CUIAutoComplete
                  label="Lo???i h??nh"
                  placeholder="Ch???n ho???c nh???p lo???i h??nh"
                  onCreateItem={handleCreateItem}
                  items={pickerType}
                  tagStyleProps={{
                    rounded: "full",
                    pt: 1,
                    pb: 2,
                    px: 2,
                    fontSize: "1rem",
                  }}
                  hideToggleButton
                  selectedItems={selectedType}
                  onSelectedItemsChange={(changes) =>
                    handleSelectedItemsChange(changes.selectedItems)
                  }
                />
              </Box>

              <FormControl isRequired>
                <FormLabel htmlFor="province">T???nh / th??nh ph???</FormLabel>
                <Input
                  id="province"
                  placeholder="Nh???p t???nh / tp"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="district">Qu???n / Huy???n</FormLabel>
                <Input
                  id="district"
                  placeholder="Nh???p qu???n / huy???n"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="detail">??C chi ti???t</FormLabel>
                <Input
                  id="detail"
                  placeholder="Nh???p ?????a ch???"
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="hotline">Hotline</FormLabel>
                <Input
                  id="hotline"
                  value={hotline}
                  onChange={(e) => setHotline(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="lead">Leader</FormLabel>
                <Input
                  id="lead"
                  value={lead}
                  onChange={(e) => setLead(e.target.value)}
                  type="lead"
                />
              </FormControl>

              <FormControl as="fieldset">
                <FormLabel as="legend">Tr???ng th??i</FormLabel>
                <RadioGroup defaultValue="1" onChange={(e) => setStatus(!!e)}>
                  <HStack spacing="24px">
                    <Radio value="1">Ho???t ?????ng</Radio>
                    <Radio value="">???? ????ng c???a</Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <HStack spacing={5}>
              <Button onClick={handleCreateOrUpdate} colorScheme="teal">
                L??u
              </Button>
              <Button onClick={onClose}>????ng</Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BranchForm;

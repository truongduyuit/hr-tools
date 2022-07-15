import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Box,
  useToast,
  position,
} from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const toast = useToast();
  const router = useRouter();
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    loadLoggedIn();
  }, []);

  const loadLoggedIn = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;

    const result = await axios.post("/api/token/verify", {
      accessToken,
    });

    if (result && result.data) {
      return router.push("/dashboard");
    }
  };

  const handleLogin = async () => {
    try {
      const result = await axios.post("/api/token/access", {
        phone,
        password,
      });

      if (result && result.data) {
        localStorage.setItem("accessToken", result.data.value.accessToken);
        localStorage.setItem("refreshToken", result.data.value.refreshToken);

        return router.push("/dashboard");
      }

      toast({
        title: "Đăng nhập thất bại",
        isClosable: true,
        position: "bottom-right",
        duration: 9000,
      });
    } catch (error) {
      toast({
        title: "Đăng nhập thất bại",
        description: `Error: ${error}`,
        isClosable: true,
        position: "bottom-right",
        duration: 9000,
      });
    }
  };

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"3xl"}>Đăng nhập tài khoản của bạn</Heading>
          <FormControl>
            <FormLabel htmlFor="phone">Số điện thoại</FormLabel>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Mật khẩu</FormLabel>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Link href="/signup">
                <Box
                  as="a"
                  cursor={"pointer"}
                  color="blue.500"
                  textDecoration="underline"
                >
                  Đăng kí
                </Box>
              </Link>
              <Link href="/signup">
                <Box
                  as="a"
                  cursor={"pointer"}
                  color="blue.500"
                  textDecoration="underline"
                >
                  Quên mật khẩu
                </Box>
              </Link>
            </Stack>
            <Button
              colorScheme={"blue"}
              variant={"solid"}
              onClick={handleLogin}
            >
              Đăng nhập
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image alt={"Login Image"} objectFit={"cover"} src="ny.jpg" />
      </Flex>
    </Stack>
  );
}

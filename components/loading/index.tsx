import { Box, Center, Flex, Portal } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { PacmanLoader } from "react-spinners";
import { RootState } from "../../redux/store";

export function Loading({ isLoading }: { isLoading?: boolean }) {
    const _isLoading = useSelector((state: RootState) => state.app.loading);
    const loading = typeof isLoading === "undefined" ? _isLoading : isLoading;

    useEffect(() => {
        if (loading) {
            document
                .getElementById("body-container")
                ?.classList.add("disable-mouse-event");
        } else {
            document
                .getElementById("body-container")
                ?.classList.remove("disable-mouse-event");
        }
    }, [loading]);

    return (
        <>
            {loading && (
                <Center
                    position="fixed"
                    top={0}
                    bottom={0}
                    left={0}
                    right={0}
                    bgColor="rgba(0,0,0,0.25)"
                    zIndex={9999}
                >
                    <Flex>
                        <PacmanLoader color="highlight" loading={loading} />
                        <Box mt={50} ml={-5}>Chờ 1 xíu thôi !!!</Box>
                    </Flex>

                </Center>
            )}
        </>
    );
}

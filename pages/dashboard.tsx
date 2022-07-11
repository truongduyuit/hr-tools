import { Flex } from "@chakra-ui/react";
import Sidebar from "../components/sidebar";

export default function Dashboard() {

    return (
        <div>
            <Flex>
                <Sidebar />
                <Flex
                    ml="50px"
                    flexDir="column"
                    marginTop="2.5vh"
                >
                    
                </Flex>
            </Flex>
        </div >
    );
}
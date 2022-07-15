import React from 'react'
import {
    Flex,
    Text,
    Icon,
    Box,
    Menu,
    MenuButton,
    MenuList
} from '@chakra-ui/react'
import Link from 'next/link'

export default function NavItem({ icon, title, active, navSize = "large", href }: any) {
    return (
        <Link href={href}
            passHref>
            <Flex
                mt={30}
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
            >
                <Menu placement="right">
                    <Box
                        backgroundColor={active ? "teal" : "#ccc"}
                        p={3}
                        borderRadius={8}
                        _hover={{ textDecor: 'none', backgroundColor: "#AAA", cursor: "pointer" }}
                        w={navSize == "large" ? "100%" : ""}

                    >
                        <MenuButton w="100%">
                            <Flex>
                                <Icon as={icon} fontSize="xl" color={active ? "#fff" : "teal"} />
                                <Text ml={5} display={navSize == "small" ? "none" : "flex"} color={active ? "#fff" : "teal"}>{title}</Text>
                            </Flex>
                        </MenuButton>
                    </Box>
                </Menu>
            </Flex>
        </Link>

    )
}
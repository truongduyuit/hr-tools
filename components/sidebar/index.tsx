import {
    Flex, IconButton
} from '@chakra-ui/react'
import { FiCalendar, FiHome, FiMenu } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { setNavSize } from '../../redux/appSlide'
import { RootState } from '../../redux/store'
import NavItem from './SidebarItem'

export default function Sidebar() {
    const dispatch = useDispatch();

    const navSize = useSelector((state: RootState) => state.app.navSize)

    return (
        <Flex
            pos="sticky"
            left="5"
            h="95vh"
            marginTop="2.5vh"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            borderRadius={navSize == "small" ? "15px" : "30px"}
            w={navSize == "small" ? "75px" : "200px"}
            flexDir="column"
            justifyContent="space-between"
            transitionDuration={navSize == "small" ? ".5s" : ".2s"}
        >
            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                as="nav"
            >
                <IconButton
                    aria-label='Search database'
                    background="none"
                    mt={5}
                    _hover={{ background: 'none' }}
                    icon={<FiMenu />}
                    onClick={() => {
                        if (navSize == "small")
                            dispatch(setNavSize("large"))
                        else
                            dispatch(setNavSize("small"))
                    }}
                />
                <NavItem navSize={navSize} icon={FiHome} title="Bảng điều khiển" />
                <NavItem navSize={navSize} icon={FiCalendar} title="Thêm dữ liệu" active />

            </Flex>


        </Flex>
    )
}
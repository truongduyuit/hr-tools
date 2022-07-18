import {
    Flex, IconButton
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { AiOutlineShareAlt } from "react-icons/ai";
import { FiUsers, FiHome, FiMenu, FiUserPlus, FiCalendar } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { setNavSize } from '../../redux/appSlide';
import { RootState } from '../../redux/store';
import NavItem from './SidebarItem';

export default function Sidebar() {
    const router = useRouter()
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
                <NavItem href="/dashboard" navSize={navSize} icon={FiHome} title="Bảng điều khiển"  active={router.pathname.includes("dashboard")}/>
                <NavItem href="/branch" navSize={navSize} icon={AiOutlineShareAlt} title="Chi nhánh" active={router.pathname.includes("branch")} />
                <NavItem href="/load" navSize={navSize} icon={FiUserPlus} title="Thêm ứng viên" active={router.pathname.includes("load")} />
                <NavItem href="/candidate" navSize={navSize} icon={FiUsers} title="QL ứng viên" active={router.pathname.includes("candidate")} />
                <NavItem href="/schedule" navSize={navSize} icon={FiCalendar} title="Lịch phỏng vấn" active={router.pathname.includes("schedule")} />
            </Flex>
        </Flex>
    )
}
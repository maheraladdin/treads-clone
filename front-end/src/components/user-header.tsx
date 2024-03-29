import {
    Avatar,
    Box,
    Flex,
    Link,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Portal,
    Text,
    VStack
} from "@chakra-ui/react";
import ZuckerbergAvatar from "../assets/zuck-avatar.png";
import {BsInstagram} from "react-icons/bs";
import {CgMoreO} from "react-icons/cg";
import {useCopy} from "../hooks/useCopy.ts";

export function UserHeader() {
    const {copyLink} = useCopy(window.location.href);

    return (
        <VStack gap={4} alignItems={"start"} >
            <Flex justifyContent={"space-between"} w={"full"} >
                <Box>
                    <Text fontSize={"2xl"} fontWeight={"bold"}>
                        Mark Zuckerberg
                    </Text>
                    <Flex gap={2} alignItems={"center"}>
                        <Text
                            fontSize={"sm"}
                        >
                            markzuckerberg
                        </Text>
                        <Text
                            fontSize={"xs"}
                            bg={"gray.dark"}
                            color={"gray.light"}
                            p={1}
                            borderRadius={"full"}
                        >
                            threads.net
                        </Text>
                    </Flex>
                </Box>
                <Box>
                    <Avatar
                        size={{
                            base: "md",
                            md: "xl"
                        }}
                        name={"Mark Zuckerberg"}
                        src={ZuckerbergAvatar}
                    />
                </Box>
            </Flex>
            <Box>
                <Text>
                    The official account of Mark Zuckerberg.
                </Text>
            </Box>
            <Flex w={"full"} justifyContent={"space-between"}>
                <Flex gap={2} alignItems={"center"}>
                    <Text color={"gray.light"}>3.2k followers</Text>
                    <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
                    <Link color={"gray.light"}>instagram.com</Link>
                </Flex>
                <Flex>
                    <Box className={"icon-container"}>
                        <BsInstagram size={24} cursor={"pointer"} />
                    </Box>
                    <Menu>
                        <MenuButton>
                            <Box className={"icon-container"}>
                                <CgMoreO size={24} cursor={"pointer"} />
                            </Box>
                        </MenuButton>
                        <Portal>
                            <MenuList bg={"gray.dark"}>
                                <MenuItem bg={"gray.dark"} onClick={copyLink}>
                                    Copy Link
                                </MenuItem>
                            </MenuList>
                        </Portal>
                    </Menu>
                </Flex>
            </Flex>
            <Flex w={"full"}>
                <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} cursor={"pointer"} pb={3}>
                    Threads
                </Flex>
                <Flex flex={1} borderBottom={"1.5px solid gray"} color={"gray.light"} justifyContent={"center"} cursor={"pointer"} pb={3}>
                    Replies
                </Flex>
            </Flex>
        </VStack>
    )
}
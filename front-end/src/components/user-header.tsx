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
import {BsInstagram} from "react-icons/bs";
import {CgMoreO} from "react-icons/cg";
import {useCopy} from "../hooks/use-copy.ts";
import {useNavigate, useParams} from "@tanstack/react-router";
import {useRecoilValue} from "recoil";
import {User, userAtom} from "../atoms/userAtom.ts";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import {useEffect} from "react";

export function UserHeader() {
    const navigate = useNavigate({
        from: "/$username",
    });
    const username = useParams({
        strict: true,
        from: "/$username",
        select: params => params.username,
    });
    const {copyLink} = useCopy(window.location.href);
    const user = useRecoilValue(userAtom);

    const fetchUserByUsername = async () => {
        const {data: {data}} = await axios.get(`/api/users/profile/${username}`);
        return data;
    }

    const {data, isError, isLoading} = useQuery<User, Error>({
        queryKey: ["user", username],
        queryFn: fetchUserByUsername,
        enabled: !!username,
    });


    useEffect(() => {
        (async () => {
            if (isError) {
                toast.error("User not found");
                await navigate({
                    to: "/$username",
                    params: {
                        username: user?.username
                    }
                });
            }
        })()
    }, [isError, navigate, user?.username]);

    if(isLoading) {
        return (
            <VStack>
                <Text>
                    Loading...
                </Text>
            </VStack>
        )
    }

    if(isError) {
        return (
            <VStack>
                <Text>
                    User not found
                </Text>
            </VStack>
        )
    }

    return (
        <VStack gap={4} alignItems={"start"} >
            <Flex justifyContent={"space-between"} w={"full"} >
                <Box>
                    <Text fontSize={"2xl"} fontWeight={"bold"}>
                        {data?.name}
                    </Text>
                    <Flex gap={2} alignItems={"center"}>
                        <Text
                            fontSize={"sm"}
                        >
                            {data?.username}
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
                        name={data?.name}
                        src={data?.profilePic}
                    />
                </Box>
            </Flex>
            <Box>
                <Text>
                    {user?.bio}
                </Text>
            </Box>
            <Flex w={"full"} justifyContent={"space-between"}>
                <Flex gap={2} alignItems={"center"}>
                    <Text color={"gray.light"}>{data?.followers.length} followers</Text>
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
                                {user?.username === username ? (
                                    <>
                                <MenuItem bg={"gray.dark"} onClick={() => navigate({
                                    to: "/profile/update"
                                })}>
                                        Edit Profile
                                </MenuItem>
                                        <MenuItem bg={"gray.dark"} onClick={() => navigate({
                                    to: "/profile/updatePassword"
                                })}>
                                    Edit Password
                                </MenuItem>
                                    </>
                                ) : null}
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
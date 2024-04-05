import { Link } from "@tanstack/react-router";
import {Avatar, Box, Flex, Image, Menu, MenuButton, MenuItem, MenuList, Portal, Text} from "@chakra-ui/react";
import ZuckerbergAvatar from "../assets/zuck-avatar.png";
import VerifiedIcon from "../assets/verified.png"
import {useId, useState} from "react";
import {BsThreeDots} from "react-icons/bs";
import Actions from "./actions.tsx";
import {useCopy} from "../hooks/use-copy.ts";

const Avatars = [
    {
        name: "Kent Dodds",
        src: "https://bit.ly/kent-c-dodds",
        top: "0px",
        left: "15px"
    },
    {
        name: "Dan Abrahmov",
        src: "https://bit.ly/dan-abramov",
        bottom: "0px",
        right: "-5px"
    },
    {
        name: "Ryan Florence",
        src: "https://bit.ly/ryan-florence",
        bottom: "0px",
        left: "4px"
    }
]

type UserPostProps = {
    likes: number;
    replies: number;
    postImage?: string;
    postTitle: string;

}

export function UserPost({
    likes,
    replies,
    postImage,
    postTitle
}: UserPostProps) {
    const id = useId();
    const [liked, setLiked] = useState<boolean>(false);
    const {copyLink} = useCopy( window.location.host + "/markzuckerberg/post/123");
    return (
        <Flex gap={3} mb={4} py={5}>
            <Flex flexDirection={"column"} alignItems={"center"}>
                <Avatar size={"md"} name={"Mark Zuckerberg"} src={ZuckerbergAvatar} />
                <Box w={1} h={"full"} bg={"gray.light"} my={2}></Box>
                <Box position={"relative"} w={"full"}>
                    {Avatars.map((avatar, index) => (
                        <Avatar
                            key={`${index + 1}_${id}`}
                            size={"xs"}
                            name={avatar.name}
                            src={avatar.src}
                            position={"absolute"}
                            top={avatar.top}
                            left={avatar.left}
                            bottom={avatar.bottom}
                            right={avatar.right}
                            padding={"2px"}
                        />
                    ))}
                </Box>
            </Flex>
            <Flex flex={1} flexDirection={"column"} gap={2}>
                <Flex justifyContent={"space-between"} w={"full"}>
                    <Flex w={"full"} alignItems={"center"}>
                        <Text fontSize={"sm"} fontWeight={"bold"}>Mark Zuckerberg</Text>
                        <Image
                            src={VerifiedIcon}
                            alt={"Verified"}
                            borderRadius={"full"}
                            boxSize={4}
                            ml={1}
                        />
                    </Flex>
                    <Flex gap={4} alignItems={"center"}>
                        <Text fontSize={"sm"} color={"gray.light"}>1d</Text>
                        <Menu>
                            <MenuButton>
                                <Box className={"icon-container"}>
                                    <BsThreeDots size={24} cursor={"pointer"} />
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
                <Link
                    to={"/$user/post/$postId"}
                    params={{user: "markzuckerberg", postId: "123"}}
                >
                    <Flex gap={2} flexDirection={"column"}>
                        <Text fontSize={"sm"}>{postTitle}</Text>
                        { postImage ?
                        (
                            <Box
                                borderRadius={6}
                                overflow={"hidden"}
                                border={"1px solid"}
                                borderColor={"gray.light"}
                            >
                                <Image
                                    src={postImage}
                                    alt={"post 1"}
                                    w={"full"}
                                    objectFit={"cover"}
                                />
                            </Box>
                        ) : null
                        }
                    </Flex>
                </Link>
                <Actions liked={liked} setLiked={setLiked} />
                <Flex gap={3} alignItems={"center"}>
                    <Text fontSize={"sm"} color={"gray.light"}>{replies} replies</Text>
                    <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"} />
                    <Text fontSize={"sm"} color={"gray.light"}>{likes} likes</Text>
                </Flex>
            </Flex>
        </Flex>
    )
}
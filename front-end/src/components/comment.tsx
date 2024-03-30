import {useState} from "react";
import {Avatar, Box, Divider, Flex, Image, Text} from "@chakra-ui/react";
import VerifiedIcon from "../assets/verified.png";
import {BsThreeDots} from "react-icons/bs";
import Actions from "./actions.tsx";

type CommentProps = {
    comment: string;
    username: string;
    userAvatar: string;
    likes: number;
    replies: number;
    createdAt: string;
    verified?: boolean;
}

export const Comment = ({
    comment,
    username,
    userAvatar,
    likes,
    replies,
    createdAt,
    verified
}: CommentProps) => {
    const [liked, setLiked] = useState<boolean>(false);

    return (
        <>
            <>
                <Flex gap={4} py={2} my={2} w={"full"}>
                    <Avatar src={userAvatar} name={username} size={"sm"} />
                    <Flex gap={1} w={"full"} flexDirection={"column"}>
                        <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
                            <Flex gap={1} alignItems={"center"}>
                                <Text fontSize='sm' fontWeight='bold'>
                                    {username}
                                </Text>
                                {verified ? <Image
                                    src={VerifiedIcon}
                                    boxSize={4}
                                /> : null}
                            </Flex>
                            <Flex gap={2} alignItems={"center"}>
                                <Text fontSize={"sm"} color={"gray.light"}>{createdAt}</Text>
                                <BsThreeDots cursor={"pointer"} />
                            </Flex>
                        </Flex>
                        <Text>{comment}</Text>
                        <Actions liked={liked} setLiked={setLiked} />
                        <Flex gap={3} alignItems={"center"}>
                            <Text fontSize={"sm"} color={"gray.light"}>{replies} replies</Text>
                            <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"} />
                            <Text fontSize={"sm"} color={"gray.light"}>{likes + +liked }  likes</Text>
                        </Flex>
                    </Flex>
                </Flex>
                <Divider my={4} />
            </>
        </>
    )
}
import {createFileRoute} from "@tanstack/react-router";
import {Avatar, Box, Button, Divider, Flex, Image, Text} from "@chakra-ui/react";
import MarkZuckerberg from "../assets/zuck-avatar.png";
import VerifiedIcon from "../assets/verified.png";
import {BsThreeDots} from "react-icons/bs";
import postImage from "../assets/post1.png";
import Actions from "../components/actions.tsx";
import {useState} from "react";
import {Comment} from "../components/comment.tsx";

export const Route = createFileRoute("/$user/post/$postId")({
    component: $user_post_$postId,
});

const Comments = [
    {
        username: "Kent Dodds",
        userAvatar: "https://bit.ly/kent-c-dodds",
        comment: "this is an awesome day",
        createdAt: "2d",
        likes: 100,
        replies: 200,
        verified: true
    },
    {
        username: "Dan Abrahmov",
        userAvatar: "https://bit.ly/dan-abramov",
        comment: "this is my first thread",
        createdAt: "7d",
        likes: 200,
        replies: 300,
        verified: false
    },
    {
        username: "Ryan Florence",
        userAvatar: "https://bit.ly/ryan-florence",
        comment: "this is an awesome thread",
        createdAt: "5d",
        likes: 300,
        replies: 400,
        verified: true
    }
]

function $user_post_$postId() {
    // const {postId, user} = Route.useParams();
    const [liked, setLiked] = useState<boolean>(false);
    return (
        <>
            <Flex>
                <Flex w={"full"} alignItems={"center"} gap={3}>
                    <Avatar src={MarkZuckerberg} size={"md"} name={"Mark Zuckerberg"} />
                    <Flex>
                        <Text fontSize={"sm"} fontWeight={"bold"}>Mark Zuckerberg</Text>
                        <Image
                            src={VerifiedIcon}
                            alt={"Verified"}
                            borderRadius={"full"}
                            boxSize={4}
                            ml={1}
                        />
                    </Flex>
                </Flex>
                <Flex gap={4} alignItems={"center"}>
                    <Text fontSize={"sm"} color={"gray.light"}>1d</Text>
                    <BsThreeDots cursor={"pointer"} />
                </Flex>
            </Flex>
            <Flex gap={2} flexDirection={"column"}>
                <Text my={3}>this is my first Thread</Text>
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
            <Box my={3}>
                <Actions liked={liked} setLiked={setLiked} />
            </Box>
            <Flex gap={3} alignItems={"center"}>
                <Text fontSize={"sm"} color={"gray.light"}>120 replies</Text>
                <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"} />
                <Text fontSize={"sm"} color={"gray.light"}>{2478 + +liked }  likes</Text>
            </Flex>
            <Divider my={4} />
            <Flex justifyContent={"space-between"}>
                <Flex gap={2} alignItems={"center"}>
                    <Text fontSize={"2xl"}>👋</Text>
                    <Text color={"gray.light"}>Get the app to like ,and reply</Text>
                </Flex>
                <Button>
                    Get
                </Button>
            </Flex>
            <Divider my={4} />
            {Comments.map((comment, index) => (
                <Comment
                    key={index}
                    comment={comment.comment}
                    createdAt={comment.createdAt}
                    likes={comment.likes}
                    replies={comment.replies}
                    username={comment.username}
                    userAvatar={comment.userAvatar}
                    verified={comment.verified}
                />
            ))}
        </>
    )
}
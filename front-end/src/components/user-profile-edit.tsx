import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    Avatar,
    Center, Box,
} from '@chakra-ui/react'
import {useForm} from "react-hook-form";
import {z} from "zod";
import {useRecoilState} from "recoil";
import {userAtom} from "../atoms/userAtom.ts";
import axios from "axios";
import {ElementRef, useEffect, useRef} from "react";
import toast from "react-hot-toast";
import {ErrorMessage} from "@hookform/error-message";
import {usePreviewImage} from "../hooks/use-preview-image.ts";
import {useNavigate} from "@tanstack/react-router";

const formSchema = z.object({
    username: z.string().min(0, {message: 'Username must be at least 0 characters long.'}),
    name: z.string().min(0, {message: 'Name must be at least 0 characters long.'}),
    email: z.string().email({message: 'Invalid email address.'}),
    bio: z.optional(z.string()),
})

export default function UserProfileEdit() {
    const navigate = useNavigate({
        from: "/profile/update",
    })
    const [user, setUser] = useRecoilState(userAtom);
    const imgRef = useRef<ElementRef<"input">>(null);
    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        defaultValues: {
            username: "",
            name: "",
            email: "",
            bio: "",
        },
        mode: 'onBlur'
    });

    const {handleImageChange, previewImage} = usePreviewImage(user?.profilePic);

    const onSubmit = async (formData: z.infer<typeof formSchema>) => {
        const {username, name, email, bio} = formData;

        if(
            username === user?.username &&
            name === user?.name &&
            email === user?.email &&
            bio === user?.bio &&
            !previewImage
        ) {
            return toast.error("No changes detected.");
        }

        await axios.put('/api/users/update-profile', {
            username,
            name,
            email,
            bio,
            profilePic: previewImage,
        }).then(res => {
            setUser(res.data.data);
            toast.success(res.data.message);
        }).catch(err => {
            toast.error(err.response.data.error.message);
        });
    }

    useEffect(() => {
        reset({
            username: user?.username,
            name: user?.name,
            email: user?.email,
            bio: user?.bio,
        })
    }, [user, reset]);

    return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Flex
            align={'center'}
            justify={'center'}
        >
                <Stack
                    spacing={4}
                    w={'full'}
                    maxW={'md'}
                    bg={useColorModeValue('white', 'gray.dark')}
                    rounded={'xl'}
                    boxShadow={'lg'}
                    p={6}
                    my={12}>
                    <Heading lineHeight={1.1} fontSize={{base: '2xl', sm: '3xl'}}>
                        User Profile Edit
                    </Heading>
                    <FormControl>
                        <Stack direction={['column', 'row']} spacing={6}>
                            <Center>
                                <Avatar size="xl" src={previewImage || user?.profilePic || "https://bit.ly/sage-adebayo"}/>
                            </Center>
                            <Center w="full">
                                <Button onClick={() => imgRef && imgRef.current && imgRef.current.click()} w="full">Change Avatar</Button>
                                <input onChange={handleImageChange} ref={imgRef} type={"file"} hidden />
                            </Center>
                        </Stack>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Full name</FormLabel>
                        <Input
                            {...register('name')}
                            placeholder="John Doe"
                            _placeholder={{color: 'gray.500'}}
                            type="text"
                        />
                        <ErrorMessage name={"name"} errors={errors} render={({ message }) => (
                            <Box color={"red.500"} fontSize={"sm"}>{message}</Box>
                        )} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>User name</FormLabel>
                        <Input
                            {...register('username')}
                            placeholder="johndoe"
                            _placeholder={{color: 'gray.500'}}
                            type="text"
                        />
                        <ErrorMessage name={"username"} errors={errors} render={({ message }) => (
                            <Box color={"red.500"} fontSize={"sm"}>{message}</Box>
                        )} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Email address</FormLabel>
                        <Input
                            {...register("email")}
                            placeholder="your-email@example.com"
                            _placeholder={{color: 'gray.500'}}
                            type="email"
                        />
                        <ErrorMessage name={"email"} errors={errors} render={({ message }) => (
                            <Box color={"red.500"} fontSize={"sm"}>{message}</Box>
                        )} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Bio</FormLabel>
                        <Input
                            {...register("bio")}
                            placeholder="your bio..."
                            _placeholder={{color: 'gray.500'}}
                        />
                        <ErrorMessage name={"bio"} errors={errors} render={({ message }) => (
                            <Box color={"red.500"} fontSize={"sm"}>{message}</Box>
                        )} />
                    </FormControl>
                    <Stack spacing={6} direction={['column', 'row']}>
                        <Button
                            bg={'red.400'}
                            color={'white'}
                            w="full"
                            _hover={{
                                bg: 'red.500',
                            }}
                            onClick={() => navigate({
                                to: "/$username",
                                params: {
                                    username: user?.username as string,
                                }
                            })}
                        >
                            Cancel
                        </Button>
                        <Button
                            bg={'green.400'}
                            color={'white'}
                            w="full"
                            _hover={{
                                bg: 'green.500',
                            }}
                            type={"submit"}
                        >
                            Submit
                        </Button>
                    </Stack>
                </Stack>
        </Flex>
    </form>
)
}
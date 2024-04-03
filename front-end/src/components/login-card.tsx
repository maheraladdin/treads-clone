'use client'

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue, Link, InputGroup, InputRightElement,
} from '@chakra-ui/react'
import {useState} from "react";
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {useSetRecoilState} from "recoil";
import {userAtom} from "../atoms/userAtom.ts";
import {ErrorMessage} from "@hookform/error-message";
import {useNavigate} from "@tanstack/react-router";
import axios from "axios";

type LoginCardProps = {
    setLogin: (value: boolean) => void
}

type FormData = {
    username: string;
    password: string;
};

const formSchema = z.object({
    username: z.string().min(0, {message: "Username is required"}),
    password: z.string().min(8, {message: "Password must be at least 8 characters"}),
})

export default function LoginCard({setLogin}: LoginCardProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const setUserAtom = useSetRecoilState(userAtom);
    const navigate = useNavigate({ from: '/' })

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: ""
        },
        mode: "onBlur"
    });

    const onSubmit = async (formData: z.infer<typeof formSchema>) => {
        const {username, password } = formData;
        await axios.post("/api/auth/login", {
            username,
            password
        }, {
            headers: {
                rememberMe,
            }
        }).then((res) => {
            toast.success(res.data.message);
            setUserAtom(res.data.data);
            navigate({ to: '/$username', params: { username: res.data.data.username } })
        }).catch((error) => {
            toast.error(error.response.data.error.message);
        });
        reset();
    }

    return (
        <Flex
            align={'center'}
            justify={'center'}
        >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign in</Heading>
                </Stack>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.dark')}
                        boxShadow={'lg'}
                        p={8}
                        w={{
                            base: 'full',
                            sm: '464px',
                        }}
                    >
                        <Stack spacing={4}>
                            <FormControl id="username" isRequired>
                                <FormLabel>Username</FormLabel>
                                <Input type="text" {...register("username")} />
                                <ErrorMessage name={"username"} errors={errors} render={({ message }) => (
                                    <Box color={"red.500"} fontSize={"sm"}>{message}</Box>
                                )} />
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input type={showPassword ? 'text' : 'password'} {...register("password")} />
                                    <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                            {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <ErrorMessage name={"password"} errors={errors} render={({ message }) => (
                                    <Box color={"red.500"} fontSize={"sm"}>{message}</Box>
                                )} />
                            </FormControl>
                            <Stack spacing={10}>
                                <Stack
                                    direction={{base: 'column', sm: 'row'}}
                                    align={'start'}
                                    justify={'space-between'}>
                                    <Checkbox checked={rememberMe} onClick={() => setRememberMe(prev => !prev)}>Remember me</Checkbox>
                                    <Link color={'blue.400'}>Forgot password?</Link>
                                </Stack>
                                <Button
                                    bg={useColorModeValue("gray.600", "gray.700")}
                                    color={"white"}
                                    _hover={{
                                        bg: useColorModeValue("gray.700", "gray.800"),
                                    }}
                                    type={"submit"}
                                >
                                    Sign in
                                </Button>
                                <Stack>
                                    <Text align={'center'}>
                                        Don't have an account? <Link onClick={() => setLogin(false)} color={'blue.400'}>Sign
                                        up</Link>
                                    </Text>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Box>
                </form>
            </Stack>
        </Flex>
)
}
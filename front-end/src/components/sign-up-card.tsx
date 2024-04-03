import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
} from '@chakra-ui/react'
import {useState} from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {userAtom} from "../atoms/userAtom.ts";
import {useSetRecoilState} from "recoil";
import {useNavigate} from "@tanstack/react-router";
import axios from "axios";

type SignupCardProps = {
    setLogin: (value: boolean) => void
}

type FormData = {
    name: string;
    username: string;
    email: string;
    password: string;
};

const formSchema = z.object({
    name: z.string().min(0, {message: "Full Name is required"}),
    username: z.string().min(0, {message: "Username is required"}),
    email: z.string().email({message: "Invalid email"}),
    password: z.string().min(8, {message: "Password must be at least 8 characters"}),
})

export default function SignupCard({setLogin}: SignupCardProps) {
    const [showPassword, setShowPassword] = useState(false)
    const setUserAtom = useSetRecoilState(userAtom);
    const navigate = useNavigate({ from: '/' })


    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            username: "",
            email: "",
            password: ""
        },
        mode: "onBlur"
    });

    const onSubmit = async (formData: z.infer<typeof formSchema>) => {
        const { name, username, email, password } = formData;
        await axios.post("/api/auth/signup", {
            name,
            username,
            email,
            password
        }).then((res) => {
            toast.success(res.data.message);
            setUserAtom(res.data.data);
            navigate({ to: '/$username', params: { username: res.data.data.username } });
            reset();
        }).catch((error) => {
            toast.error(error.response.data.error.message);
        });
    }

    return (
        <Flex
            align={'center'}
            justify={'center'}
        >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Sign up
                    </Heading>
                </Stack>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.dark')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <HStack>
                                <Box>
                                    <FormControl id="fullName">
                                        <FormLabel>Full Name</FormLabel>
                                        <Input type="text" {...register("name")} />
                                        <ErrorMessage name={"name"} errors={errors} render={({ message }) => (
                                            <Box color={"red.500"} fontSize={"sm"}>{message}</Box>
                                        )} />
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl id="username">
                                        <FormLabel>Username</FormLabel>
                                        <Input type="text" {...register("username")} />
                                        <ErrorMessage name={"username"} errors={errors} render={({ message }) => (
                                            <Box color={"red.500"} fontSize={"sm"}>{message}</Box>
                                        )} />
                                    </FormControl>
                                </Box>
                            </HStack>
                            <FormControl id="email">
                                <FormLabel>Email address</FormLabel>
                                <Input type="email" {...register("email")} />
                                <ErrorMessage name={"email"} errors={errors} render={({ message }) => (
                                    <Box color={"red.500"} fontSize={"sm"}>{message}</Box>
                                )} />
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input type={showPassword ? 'text' : 'password'} {...register("password")} />
                                    <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <ErrorMessage name={"password"} errors={errors} render={({ message }) => (
                                    <Box color={"red.500"} fontSize={"sm"}>{message}</Box>
                                )} />
                            </FormControl>
                            <Stack spacing={10} pt={2}>
                                <Button
                                    loadingText="Submitting"
                                    size="lg"
                                    bg={useColorModeValue("gray.600","gray.700")}
                                    color={"white"}
                                    _hover={{
                                        bg: useColorModeValue("gray.700","gray.800"),
                                    }}
                                    type={"submit"}
                                >
                                    Sign up
                                </Button>
                            </Stack>
                            <Stack pt={6}>
                                <Text align={'center'}>
                                    Already a user? <Link onClick={() => setLogin(true)} color={'blue.400'}>Login</Link>
                                </Text>
                            </Stack>
                        </Stack>
                    </Box>
                </form>
            </Stack>
        </Flex>
    )
}
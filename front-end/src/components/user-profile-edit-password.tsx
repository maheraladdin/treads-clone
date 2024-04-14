import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
} from '@chakra-ui/react';
import {useForm} from "react-hook-form";
import {z} from "zod";
import {useRecoilValue} from "recoil";
import {userAtom} from "../atoms/userAtom.ts";
import axios from "axios";
import toast from "react-hot-toast";
import {ErrorMessage} from "@hookform/error-message";
import {useNavigate} from "@tanstack/react-router";

const formSchema = z.object({
    password: z.string().min(8, {message: "Password must be at least 8 characters"}),
    currentPassword: z.string().min(8, {message: "Password must be at least 8 characters"}),
})

export default function UserProfileEditPassword() {
    const navigate = useNavigate({
        from: "/profile/update",
    })
    const user= useRecoilValue(userAtom);
    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        defaultValues: {
            password: "",
            currentPassword: ""
        },
        mode: 'onBlur'
    });

    const onSubmit = async (formData: z.infer<typeof formSchema>) => {
        const {password, currentPassword} = formData;

        await axios.patch('/api/users/update-password', {
            password,
            currentPassword
        }).then(res => {
            toast.success(res.data.message);
            reset();
        }).catch(err => {
            toast.error(err.response.data.error.message);
        });
    }

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
                    <FormControl isRequired>
                        <FormLabel>Current Password</FormLabel>
                        <Input
                            {...register('currentPassword')}
                            type="password"
                        />
                        <ErrorMessage name={"currentPassword"} errors={errors} render={({ message }) => (
                            <Box color={"red.500"} fontSize={"sm"}>{message}</Box>
                        )} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>New Password</FormLabel>
                        <Input
                            {...register('password')}
                            type="password"
                        />
                        <ErrorMessage name={"password"} errors={errors} render={({ message }) => (
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
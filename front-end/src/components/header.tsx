import {Flex, Image, useColorMode} from "@chakra-ui/react";
import LightLogo from "../assets/light-logo.svg";
import DarkLogo from "../assets/dark-logo.svg";
import {useEffect} from "react";
import axios from "axios";
import {useSetRecoilState} from "recoil";
import {userAtom} from "../atoms/userAtom.ts";
import {useNavigate} from "@tanstack/react-router";
export function Header() {
    const {colorMode, toggleColorMode} = useColorMode();
    const setUserAtom = useSetRecoilState(userAtom);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("/api/users/get-logged-user").then(async (res) => {
            console.log(res.data.message);
            setUserAtom(res.data.data);
            await navigate({
                to: "/$username",
                params: {
                    username: res.data.data.username
                }
            })
        }).catch(async (error) => {
            console.error(error);
            await navigate({
                to: "/"
            });
        });
    }, []);
    return (
        <Flex justifyContent={"center"} mt={6} mb={12} >
            <Image
                onClick={toggleColorMode}
                cursor={"pointer"}
                alt={"Threads logo"}
                src={colorMode === "dark" ? LightLogo : DarkLogo}
                w={6}
            />
        </Flex>
    )
}
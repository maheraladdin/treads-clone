import {Flex, Image, useColorMode} from "@chakra-ui/react";
import LightLogo from "../assets/light-logo.svg";
import DarkLogo from "../assets/dark-logo.svg";
import {useEffect} from "react";
import axios from "axios";
import {useSetRecoilState} from "recoil";
import {userAtom} from "../atoms/userAtom.ts";
export function Header() {
    const {colorMode, toggleColorMode} = useColorMode();
    const setUserAtom = useSetRecoilState(userAtom);
    useEffect(() => {
        axios.get("/api/users/get-logged-user").then((res) => {
            console.log(res.data.message);
            setUserAtom(res.data.data);
        }).catch((error) => {
            console.error(error);
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
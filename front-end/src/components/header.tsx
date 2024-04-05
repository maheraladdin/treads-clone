import {Flex, Image, useColorMode} from "@chakra-ui/react";
import LightLogo from "../assets/light-logo.svg";
import DarkLogo from "../assets/dark-logo.svg";

export function Header() {
    const {colorMode, toggleColorMode} = useColorMode();
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
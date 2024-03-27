import {Flex, Image, useColorMode} from "@chakra-ui/react";
import LightLogo from "../../public/light-logo.svg";
import DarkLogo from "../../public/dark-logo.svg";
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
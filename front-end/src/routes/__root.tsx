import { createRootRoute, Outlet } from '@tanstack/react-router'
import {Container, useColorModeValue} from "@chakra-ui/react";
import {Header} from "../components/header.tsx";
import {Toaster} from "react-hot-toast";

export const Route = createRootRoute({
    component: () => {
        return (
            <Container maxW={"620px"}>
                <Header/>
                <Outlet/>
                <Toaster toastOptions={{
                    style: {
                        borderRadius: '10px',
                        background: useColorModeValue('#fff', '#333'),
                        color: useColorModeValue('#333', '#fff'),
                    }
                }}/>
            </Container>
        )
    }
})
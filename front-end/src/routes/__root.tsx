import { createRootRoute, Outlet } from '@tanstack/react-router'
import {Container, useColorModeValue} from "@chakra-ui/react";
import {Header} from "../components/header.tsx";
import {Toaster} from "react-hot-toast";
import {LogoutButton} from "../components/logout-button.tsx";
import Protected from "../components/protected.tsx";

export const Route = createRootRoute({
    component: () => {
        return (
            <Container maxW={"620px"}>
                <Header/>
                <Protected>
                    <Outlet/>
                </Protected>
                <Toaster toastOptions={{
                    style: {
                        borderRadius: '10px',
                        background: useColorModeValue('#fff', '#333'),
                        color: useColorModeValue('#333', '#fff'),
                    }
                }}/>
                <LogoutButton />
            </Container>
        )
    }
})
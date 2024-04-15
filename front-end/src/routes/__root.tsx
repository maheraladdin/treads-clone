import { createRootRoute, Outlet } from '@tanstack/react-router'
import {Container} from "@chakra-ui/react";
import {Header} from "../components/header.tsx";
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
                <LogoutButton />
            </Container>
        )
    }
})
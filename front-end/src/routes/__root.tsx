import { createRootRoute, Outlet } from '@tanstack/react-router'
import {Container} from "@chakra-ui/react";
import {Header} from "../components/header.tsx";

export const Route = createRootRoute({
    component: () => (
        <Container maxW={"620px"} >
            <Header />
            <Outlet />
        </Container>
    ),
})
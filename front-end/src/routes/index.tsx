import {createFileRoute} from "@tanstack/react-router";
import SignupCard from "../components/sign-up-card.tsx";
import {useState} from "react";
import LoginCard from "../components/login-card.tsx";


export const Route = createFileRoute("/")({
    component: Index,
});

function Index() {
    const [login, setLogin] = useState<boolean>(false);
    return (
        login ? <LoginCard setLogin={setLogin} /> : <SignupCard setLogin={setLogin} />
    )
}
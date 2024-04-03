import {createFileRoute, Navigate} from "@tanstack/react-router";
import SignupCard from "../components/sign-up-card.tsx";
import {useState} from "react";
import LoginCard from "../components/login-card.tsx";
import {useRecoilValue} from "recoil";
import {userAtom} from "../atoms/userAtom.ts";


export const Route = createFileRoute("/")({
    component: Index,
});

function Index() {
    const [login, setLogin] = useState<boolean>(false);
    const user = useRecoilValue(userAtom);
    return (
        user?.username ? <Navigate to={"/$username"} params={{username: user.username}} />  : (login ? <LoginCard setLogin={setLogin} /> : <SignupCard setLogin={setLogin} />)
    )
}
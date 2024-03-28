import {createFileRoute} from "@tanstack/react-router"
import {UserHeader} from "../components/user-header.tsx";



export const Route = createFileRoute("/$username")({
    component: $username,
});

function $username() {
    // const {username} = Route.useParams();
    return (
        <>
            <UserHeader />
        </>
    )
}
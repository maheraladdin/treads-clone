import {createFileRoute} from "@tanstack/react-router"



export const Route = createFileRoute("/$username")({
    component: $username,
});

function $username() {
    const {username} = Route.useParams();
    return (
        <div>
            <h1>username: {username}</h1>
        </div>
    )
}
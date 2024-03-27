import {createFileRoute} from "@tanstack/react-router";


export const Route = createFileRoute("/$user/post/$postId")({
    component: $user_post_$postId,
});

function $user_post_$postId() {
    const {postId, user} = Route.useParams();
    return (
        <div>
            <h1>postId: {postId}</h1>
            <h2>user: {user}</h2>
        </div>
    )
}
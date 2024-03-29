import {createFileRoute} from "@tanstack/react-router"
import {UserHeader} from "../components/user-header.tsx";
import {UserPost} from "../components/user-post.tsx";
import POST1 from "../assets/post1.png";
import POST2 from "../assets/post2.png";
import POST3 from "../assets/post3.png";



export const Route = createFileRoute("/$username")({
    component: $username,
});

const posts = [
    {
        likes: 100,
        replies: 50,
        postImage: POST1,
        postTitle: "Let's talk about threads"
    },
    {
        likes: 120,
        replies: 570,
        postImage: POST2,
        postTitle: "This is an awesome tutorial!"
    },
    {
        likes: 300,
        replies: 60,
        postImage: POST3,
        postTitle: "I love this guy"
    },
    {
        likes: 400,
        replies: 37,
        postTitle: "This is my first Thread"
    }
]

function $username() {
    // const {username} = Route.useParams();
    return (
        <>
            <UserHeader />
            {posts.map((post, index) => (
                <UserPost key={index} postImage={post.postImage} postTitle={post.postTitle} likes={post.likes} replies={post.replies} />
            ))}
        </>
    )
}
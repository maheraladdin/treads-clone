import {useRouterState} from "@tanstack/react-router";

export default function usePublicPaths() {

    const location = useRouterState({
        select: (state) => state.location,
    });

    const publicPaths = [
        "/",
        "/$username",
        "/$user/post/$postId",
    ];

    const isPublicPath = publicPaths.some((path) => location.pathname === path);

    return [isPublicPath];
}
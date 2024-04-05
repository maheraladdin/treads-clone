
export default function usePublicPaths() {
    const publicPaths = [
        /^\/$/,
        /^\/[^/]+$/,
        /^\/[^/]+\/post\/[^/]+$/
    ];

    const isPublicPath = publicPaths.some((regex) => regex.test(window.location.pathname));

    return [isPublicPath];
}
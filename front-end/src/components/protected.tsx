import {useNavigate, useRouterState} from "@tanstack/react-router";
import {useRecoilState} from "recoil";
import {userAtom} from "../atoms/userAtom.ts";
import React, {useLayoutEffect} from "react";
import toast from "react-hot-toast";
import usePublicPaths from "../hooks/use-puplic-paths.ts";
import axios from "axios";


export default function Protected({children}: {
    children: React.ReactNode
}) {
    const location = useRouterState({
        select: (state) => state.location,
    });
    const navigate = useNavigate({
        from: location.pathname,
    });
    const [isPublicPath] = usePublicPaths();
    const [user, setUserAtom] = useRecoilState(userAtom);

    useLayoutEffect(() => {
        if(user?.username) return;
        axios.get("/api/users/get-logged-user").then(async (res) => {
            setUserAtom(res.data.data);
            if(window.location.pathname === "/") {
                await navigate({
                    to: "/$username",
                    params: {
                        username: res.data.data.username
                    }
                });
            }
        }).catch(async (error) => {
            if(isPublicPath) return;
            console.error(error);
            await navigate({
                to: "/"
            }).then(() => {
                toast.error("You must be logged in to view this page.");
            });
        });
    }, [user?.username, isPublicPath, navigate, setUserAtom]);

    return children;
}
import {useNavigate} from "@tanstack/react-router";
import {useRecoilValue} from "recoil";
import {userAtom} from "../atoms/userAtom.ts";
import React, {useEffect} from "react";
import toast from "react-hot-toast";

export default function Protected({children}: {
    children: React.ReactNode
}) {
    const user = useRecoilValue(userAtom);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.username) {
            navigate({
                to: "/"
            }).then(() => {
              toast.error("You must be logged in to view this page.");
            });
        }
    }, [window.location.href]);

    return children;
}
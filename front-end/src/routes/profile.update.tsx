import {createFileRoute} from "@tanstack/react-router";
import UserProfileEdit from "../components/user-profile-edit.tsx";


export const Route = createFileRoute("/profile/update")({
    component: profileUpdate,
});

function profileUpdate() {
    return (
        <>
            <UserProfileEdit />
        </>
    )
}
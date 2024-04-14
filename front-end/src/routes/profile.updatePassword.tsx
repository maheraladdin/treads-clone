import {createFileRoute} from "@tanstack/react-router";
import UserProfileEditPassword from "../components/user-profile-edit-password.tsx";


export const Route = createFileRoute("/profile/updatePassword")({
    component: profileUpdatePassword,
});

function profileUpdatePassword() {
    return (
        <>
            <UserProfileEditPassword />
        </>
    )
}
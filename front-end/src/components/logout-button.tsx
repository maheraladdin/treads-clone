import {Button} from "@chakra-ui/react";
import axios from "axios";
import toast from "react-hot-toast";
import {useRecoilState} from "recoil";
import {userAtom} from "../atoms/userAtom.ts";
import {useNavigate} from "@tanstack/react-router";

export const LogoutButton = () => {

    const [user, setUserAtom] = useRecoilState(userAtom);
    const navigate = useNavigate();

    const logout = async () => {
        await axios.post("/api/auth/logout", {}, {withCredentials: true})
        .then((response) => {
            console.log(response.data.message);
            toast.success(response.data.message);
            setUserAtom(null);
            navigate({
                to: "/"
            })
        })
        .catch((error) => {
            console.log(error);
        });
    }

  return (
      user?.username ?
    <Button position={"fixed"} top={"30px"} right={"30px"} size={"sm"} onClick={logout}>
        Logout
    </Button>
          : null
  );
};
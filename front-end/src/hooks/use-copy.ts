import {useToast} from "@chakra-ui/react";
import {useCopyToClipboard} from "usehooks-ts";

export const useCopy = (herf: string) => {
    const toast = useToast();
    const [, copy] = useCopyToClipboard();
    const copyLink = async () => {
        toast.promise(copy(herf), {
            loading: {
                title: "Copying link...",
            },
            success: {
                title: "Link copied!",
            },
            error: {
                title: "Failed to copy link",
            },
        });
    }

    return {copyLink};
}

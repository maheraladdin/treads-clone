import {ChangeEvent, useState} from "react";
import toast from "react-hot-toast";
import imageCompression, {Options} from 'browser-image-compression';

export const usePreviewImage = (defaultImage?: string) => {
    const [previewImage, setPreviewImage] = useState<string | undefined>(defaultImage);

    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if(!file.type.includes("image")) {
                return toast.error("you can only upload images");
            }

            const options: Options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
                alwaysKeepResolution: true,
            };

            try {
                const compressedFile = await imageCompression(file, options);
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreviewImage(reader.result as string);
                };
                reader.readAsDataURL(compressedFile);
            } catch (error) {
                toast.error(`Could not compress image: ${error}`);
            }
        }
    }

    return {previewImage, handleImageChange};
}
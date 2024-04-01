import { useState } from "react";
import {uploadImg} from "../firebase/firebase";
import {ref,getDownloadURL,uploadBytesResumable} from "firebase/storage"


export const useUpload = () => {
    const [url, setUrl] = useState(null);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    
    const uploadFile = async (file) => {
        const filename = file.name;
        const storageRef = ref(uploadImg, filename);
        const uploadTask = uploadBytesResumable(storageRef, file);
       
        // update progess bar

        uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress);
        },
        (error) => {
            setError(error);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setUrl(downloadURL);
            });
        }
        );

       
       
    };
    
    return { uploadFile, url, progress, error };
    }
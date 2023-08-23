import React from 'react';
import { toast } from 'react-toastify';

const Toast = ({ error }) => {


    if (typeof error !== "object") {
        toast.error(error, {
            position: 'bottom-center',
            autoClose: 3000,
            closeButton: true
        });
    };

    return (
        <>
        </>
    )
}

export default Toast

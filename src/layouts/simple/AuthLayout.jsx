import { Outlet } from "react-router-dom";
import SnackbarAlert from "../../components/snackbar-alert/SnackbarAlert";
import { useEffect, useState } from 'react';

export default function Layout() {
    const [snackbarProps, setSnackbarProps] = useState(null);

    const displaySnackbar = (message, type) => {
        setSnackbarProps({ message, type });
    };

    return (
        <>
            <Outlet />
            {snackbarProps !== null && <SnackbarAlert message={snackbarProps.message} type={snackbarProps.type} />}
        </>
    )
}

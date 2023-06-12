import { Snackbar, Alert } from '@mui/material';
import { useState, useEffect } from 'react';

export default function SnackbarAlert(props) {
    const { message, type } = props;
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(true);
    }, [message, type]);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}

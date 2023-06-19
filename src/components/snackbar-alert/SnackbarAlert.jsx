import { Snackbar, Alert, IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import {
    Close as CloseIcon
} from '@mui/icons-material';

export default function SnackbarAlert(props) {
    const { message, variant } = props;
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    const action = (
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
    );

    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={message}
            action={action}
        >
            <Alert onClose={handleClose} severity={variant} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}

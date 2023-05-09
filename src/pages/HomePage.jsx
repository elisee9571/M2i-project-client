import {
    Container,
    Grid,
    Paper,
    TextField,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    Button,
    Typography
} from "@mui/material";
import {
    VisibilityOff,
    Visibility
} from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);


    return (
        <>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <Typography variant="h1">Home page</Typography>
        </>
    )
}

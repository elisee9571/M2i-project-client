import { Typography } from "@mui/material"
import { Helmet } from 'react-helmet-async';

export default function LoginPage() {
    return (
        <>
            <Helmet>
                <title> Login | Minimal UI </title>
            </Helmet>
            <Typography variant='h1'>Login</Typography>
        </>
    )
}

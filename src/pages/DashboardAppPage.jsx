import { Typography } from "@mui/material"
import { Helmet } from 'react-helmet-async';

export default function DashboardAppPage() {
    return (
        <>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            <Typography variant='h1'>Dashboard</Typography>
        </>
    )
}

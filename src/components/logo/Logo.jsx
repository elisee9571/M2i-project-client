import { Link as RouterLink } from 'react-router-dom';
import { Box, Link, Typography } from '@mui/material';

export default function Logo() {
    return (
        <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
            <Typography sx={{
                fontSize: "14px",
                fontWeight: "bold",
                color: "#000",
                display: 'flex',
                alignItems: "center"
            }}>
                ABSTRACT
                <span style={{
                    margin: "0 2.5px",
                    padding: "2.5px",
                    border: "1px solid #000",
                    borderRadius: "5px",
                    fontSize: "10px",
                    color: "#000"
                }}>
                    BETA
                </span>
            </Typography>
        </Link>
    )
}

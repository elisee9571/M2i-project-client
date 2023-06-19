import { Box, Button, Container, Link, Typography } from '@mui/material'
import React from 'react'
import Logo from '../logo/Logo'
import { Link as RouterLink } from 'react-router-dom'

export default function Footer() {
    return (
        <Container maxWidth="xl" sx={{
            pt: 5,
            px: {
                xs: 0,
                md: 3
            },
            display: 'flex',
            flexDirection: "column",
            justifyContent: 'center',
            alignItems: "center",
        }}>
            <Box sx={{
                width: "100%",
                background: "black",
                borderRadius: {
                    xs: "0px",
                    md: "15px"
                },
                mb: {
                    xs: 0,
                    md: 2
                },
                color: "white",

            }}>
                <Box sx={{
                    p: 5,
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mb: 5
                    }}>
                        <Typography variant='h5'>Lorem ipsum lorem ipsum lorem ipsum</Typography>
                        <Typography variant='body1'>Lorem ipsum lorem ipsum lorem ipsum</Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                mb: 3
                            }}>
                            <Link component={RouterLink} to="/" underline="none" sx={{
                                mx: 1,
                                my: 2,
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                                <Button variant="outlined"
                                    sx={{
                                        width: "100%",
                                        color: "white",
                                        borderColor: "white",
                                        '&:hover': {
                                            background: "#ffffff25",
                                            borderColor: "white",
                                        },
                                    }}>
                                    S'inscrire
                                </Button>
                            </Link>
                            <Link component={RouterLink} to="/" underline="none" sx={{
                                mx: 1,
                                my: 2,
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                                <Button variant="solid"
                                    sx={{
                                        width: "100%",
                                        color: "black",
                                        background: "white",
                                        '&:hover': {
                                            background: "#ffffff99",
                                        },
                                    }}>
                                    Se connecter
                                </Button>
                            </Link>
                        </Box>
                        <Typography variant='h6'>INFORMATIONS LÉGALES</Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                justifyContent: "center",
                                width: {
                                    xs: "100%",
                                    md: "75%"
                                }
                            }}
                        >
                            <Link component={RouterLink} to="/" sx={{
                                mx: 1,
                                my: 2,
                                display: 'flex',
                                justifyContent: 'center',
                                color: "white",
                                lineHeight: '25px',
                                textDecoration: "underline"
                            }}>
                                <Typography>Guides</Typography>
                            </Link>
                            <Link component={RouterLink} to="/" sx={{
                                mx: 1,
                                my: 2,
                                display: 'flex',
                                justifyContent: 'center',
                                color: "white",
                                lineHeight: '25px',
                                textDecoration: "underline"
                            }}>
                                <Typography>Conditions d'utilisation</Typography>
                            </Link>
                            <Link component={RouterLink} to="/" sx={{
                                mx: 1,
                                my: 2,
                                display: 'flex',
                                justifyContent: 'center',
                                color: "white",
                                lineHeight: '25px',
                                textDecoration: "underline"
                            }}>
                                <Typography>Conditions générales de vente</Typography>
                            </Link>
                            <Link component={RouterLink} to="/" sx={{
                                mx: 1,
                                my: 2,
                                display: 'flex',
                                justifyContent: 'center',
                                color: "white",
                                lineHeight: '25px',
                                textDecoration: "underline"
                            }}>
                                <Typography>Mentions légales</Typography>
                            </Link>
                            <Link component={RouterLink} to="/" sx={{
                                mx: 1,
                                my: 2,
                                display: 'flex',
                                justifyContent: 'center',
                                color: "white",
                                lineHeight: '25px',
                                textDecoration: "underline"
                            }}>
                                <Typography>Politique en matière de confidentialité et de cookies</Typography>
                            </Link>
                            <Link component={RouterLink} to="/" sx={{
                                mx: 1,
                                my: 2,
                                display: 'flex',
                                justifyContent: 'center',
                                color: "white",
                                lineHeight: '25px',
                                textDecoration: "underline"
                            }}>
                                <Typography>Paramètres des cookies</Typography>
                            </Link>
                        </Box>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <Box sx={{
                            filter: 'invert(1)',
                        }}>
                            <Logo />
                        </Box>
                        <Box>
                            <Typography>© 2023 ABSTRACT. Tout droit réservé.</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Container>
    )
}

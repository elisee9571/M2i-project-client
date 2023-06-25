import React from 'react'
import {
    Box,
    Typography,
    Card,
    CardMedia,
    Skeleton,
    Stack,
    CardActionArea,
    CardContent,
    Chip,
    Grid
} from '@mui/material';
import { fDate } from '../../utils/formatTime';
import { fCurrency } from '../../utils/formatNumber';
import { Link as RouterLink } from 'react-router-dom';
import Bookmark from '../bookmark/Bookmark';

export default function cardProduct({ product }) {
    const location = new URL(window.location.href);
    const pathname = location.pathname;

    return (
        <>
            {product ? (
                <Card sx={{
                    width: {
                        xs: 250,
                        md: 320
                    },
                    height: {
                        xs: 350,
                        md: 400
                    },
                    borderRadius: "15px",
                    boxShadow: 0,
                    border: "1px solid #CCC",
                    position: 'relative',
                    display: 'flex',
                    justifyContent: "center",
                    alignItems: "center",
                }} >
                    {pathname === "/favorites" ?
                        <Bookmark product={product} />
                        :
                        <>
                            {product?.status === "VISIBLE" &&
                                <Bookmark product={product} />
                            }
                        </>
                    }
                    <CardActionArea to={`/products/${product.id}`} component={RouterLink} sx={{
                        p: 1,
                    }}>
                        <Grid container>
                            <Grid item xs={12} sx={{
                                height: {
                                    xs: 140,
                                    md: 160
                                },
                                display: 'flex',
                                flexDirection: "column",
                                justifyContent: "space-between",
                                px: 1,
                                py: 2,
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}>
                                    <Typography variant="h6"
                                        sx={{ fontWeight: 300 }}
                                    >
                                        {product.user.pseudo}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'end',
                                        mb: 1
                                    }}>
                                        <Typography variant="body2"
                                            sx={{ fontWeight: "bold" }}
                                        >
                                            {product.title}
                                        </Typography>
                                        <Typography variant="body2"
                                            sx={{ fontWeight: "bold" }}
                                        >
                                            {fCurrency(product.price)}
                                        </Typography>
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <Chip label={product.category.title} />
                                        <Typography variant="body2">
                                            {fDate(product.createdAt)}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sx={{
                                height: {
                                    xs: 210,
                                    md: 240
                                },
                                borderRadius: "15px",
                                overflow: 'hidden',
                                display: 'flex',
                                justifyContent: 'space-between',
                                mb: 2
                            }}>
                                <CardMedia
                                    component="img"
                                    loading="lazy"
                                    alt={product.title}
                                    image={(product.images && product.images.length > 0)
                                        ? process.env.REACT_APP_API_URL + "/media/" + product.images[0].url
                                        : "/assets/images/image-not-found.png"}
                                    sx={{
                                        aspectRatio: 1 / 1,
                                        objectFit: 'cover',
                                        pr: {
                                            xs: 0,
                                            md: .5
                                        },
                                        width: {
                                            xs: "100%",
                                            md: (product.images && product.images.length > 2) ? "50%" : "100%"
                                        },
                                        height: "100%"
                                    }}
                                />
                                {(product.images && product.images.length > 2)
                                    ? (
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: "center",
                                            display: { xs: "none", md: "block" },
                                            width: "50%"
                                        }}>
                                            <CardMedia
                                                component="img"
                                                loading="lazy"
                                                alt={product.title}
                                                image={process.env.REACT_APP_API_URL + "/media/" + product.images[1].url}
                                                sx={{
                                                    aspectRatio: 1 / 1,
                                                    objectFit: 'cover',
                                                    pb: 0.5,
                                                    width: "100%",
                                                    height: "50%"
                                                }}
                                            />
                                            <CardMedia
                                                component="img"
                                                loading="lazy"
                                                alt={product.title}
                                                image={process.env.REACT_APP_API_URL + "/media/" + product.images[2].url}
                                                sx={{
                                                    aspectRatio: 1 / 1,
                                                    objectFit: 'cover',
                                                    width: "100%",
                                                    height: "50%"
                                                }}
                                            />
                                        </Box>
                                    )
                                    : null
                                }
                            </Grid>
                        </Grid>
                    </CardActionArea>
                    {product.status === "DRAFT" &&
                        <Box variant='body1' sx={{
                            position: 'absolute',
                            bottom: 0,
                            height: 50,
                            mx: "auto",
                            background: "#e0e0e0",
                            width: "100%",
                            display: "flex",
                            alignItems: "center"
                        }}>
                            <Typography variant='body1' sx={{ px: 2 }}>Brouillon</Typography>
                        </Box>
                    }
                    {product.status === "HIDE" &&
                        <Box variant='body1' sx={{
                            position: 'absolute',
                            bottom: 0,
                            height: 50,
                            mx: "auto",
                            background: "#eeeeee",
                            width: "100%",
                            display: "flex",
                            alignItems: "center"
                        }}>
                            <Typography variant='body1' sx={{ px: 2 }}>Masqué</Typography>
                        </Box>
                    }
                    {product.status === "SOLD" || product.status === "PENDING" &&
                        <Box variant='body1' sx={{
                            position: 'absolute',
                            bottom: 0,
                            height: 50,
                            mx: "auto",
                            background: "#4db6ac",
                            width: "100%",
                            display: "flex",
                            alignItems: "center"
                        }}>
                            <Typography variant='body1' sx={{ px: 2 }}>Vendu</Typography>
                        </Box>
                    }
                </Card >
            ) : (
                <Stack spacing={1} sx={{
                    width: {
                        xs: 250,
                        md: 320
                    },
                    height: {
                        xs: 350,
                        md: 400
                    },
                    mt: 2
                }}>
                    <Box sx={{
                        height: "50%",
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}>
                        <Skeleton variant="text" sx={{ fontSize: '2rem' }} width={"60%"} />
                        <Box>
                            <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                            <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                        </Box>
                    </Box>
                    <Skeleton variant="rounded" width={"100%"} height={"50%"} />
                </Stack>
            )
            }
        </>
    )
}

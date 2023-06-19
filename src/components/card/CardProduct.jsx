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
    Chip
} from '@mui/material';
import { fDate } from '../../utils/formatTime';
import { fCurrency } from '../../utils/formatNumber';
import { Link as RouterLink } from 'react-router-dom';
import Bookmark from '../bookmark/Bookmark';

export default function cardProduct({ product }) {
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
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }} >
                    <Bookmark product={product} />
                    <CardActionArea to={`/products/${product.id}`} component={RouterLink}>
                        <CardContent sx={{
                            height: "40%",
                            display: "flex",
                            flexDirection: 'column',
                            justifyContent: 'space-between'
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
                            <div>
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
                            </div>
                        </CardContent>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: "center",
                            m: 1,
                            borderRadius: "15px",
                            overflow: 'hidden',
                        }}>
                            <CardMedia
                                component="img"
                                alt={product.title}
                                image="/assets/images/bg-register.jpg"
                                sx={{
                                    pr: {
                                        xs: 0,
                                        md: .5
                                    },
                                    width: {
                                        xs: "100%",
                                        md: "50%"
                                    }
                                }}
                            />
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: "center",
                                display: { xs: "none", md: "block" }

                            }}>
                                <CardMedia
                                    component="img"
                                    alt={product.title}
                                    image="/assets/images/bg-register.jpg"
                                    sx={{
                                        pb: .5,
                                        width: "100%"
                                    }}
                                />
                                <CardMedia
                                    component="img"
                                    alt={product.title}
                                    image="/assets/images/bg-register.jpg"
                                    sx={{
                                        width: "100%"
                                    }}
                                />
                            </Box>
                        </Box>
                    </CardActionArea>
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
            )}
        </>
    )
}

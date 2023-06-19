import axios from 'axios';
import { useEffect, useState } from 'react'
import {
    Container,
    Box,
    CardMedia,
    Typography,
    Divider,
    Chip,
    Button,
    Link,
    Avatar
} from '@mui/material';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fDateTime } from '../../utils/formatTime';
import { fCurrency } from '../../utils/formatNumber';
import Bookmark from '../../components/bookmark/Bookmark';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
    LockOutlined as LockOutlinedIcon,
    GppGood as GppGoodIcon,
    LocalShipping as LocalShippingIcon,
    Group as GroupIcon,
    ArrowForwardIos as ArrowForwardIosIcon
} from '@mui/icons-material';
import { stringAvatarSquare } from '../../utils/stringAvatar';

export default function ProductPage({ user }) {
    const navigate = useNavigate();
    const location = new URL(window.location.href);
    const pathname = location.pathname;

    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            axios.get(`${process.env.REACT_APP_API_URL}${pathname}`)
                .then(res => {
                    setProduct(res.data);
                }).catch(err => {
                    console.error(err);
                    navigate("/404");
                });
        }
        fetchProduct();
    }, [pathname])

    return (
        <Container sx={{
            py: 5,
            minHeight: "100vh"
        }}>
            {product &&
                <>
                    <Box sx={{
                        display: "flex",
                        flexDirection: {
                            xs: "column",
                            md: "row"
                        },
                        justifyContent: 'center'
                    }}>
                        <Box sx={{
                            width: {
                                xs: "100%",
                                md: "60%"
                            }
                        }}>
                            <Box sx={{
                                display: {
                                    xs: "block",
                                    md: "none"
                                }
                            }}>
                                <Slider
                                    dots={false}
                                    infinite={false}
                                    speed={500}
                                    slidesToShow={1.1}
                                    slidesToScroll={1}
                                >
                                    <CardMedia
                                        component="img"
                                        alt={product.title}
                                        image="/assets/images/bg-register.jpg"
                                        sx={{
                                            aspectRatio: "16/9",
                                            objectFit: 'cover',
                                            width: "100%",
                                        }}
                                    />
                                    <CardMedia
                                        component="img"
                                        alt={product.title}
                                        image="/assets/images/bg-register.jpg"
                                        sx={{
                                            aspectRatio: "16/9",
                                            objectFit: 'cover',
                                            width: "100%",
                                            ml: 2
                                        }}
                                    />
                                </Slider>
                            </Box>
                            <Box sx={{
                                display: {
                                    xs: "none",
                                    md: "block"
                                }
                            }}>
                                <CardMedia
                                    component="img"
                                    alt={product.title}
                                    image="/assets/images/bg-register.jpg"
                                    sx={{
                                        aspectRatio: "16/9",
                                        objectFit: 'cover',
                                        width: "100%",
                                        mb: 2
                                    }}
                                />
                                <CardMedia
                                    component="img"
                                    alt={product.title}
                                    image="/assets/images/bg-register.jpg"
                                    sx={{
                                        aspectRatio: "16/9",
                                        objectFit: 'cover',
                                        width: "100%",
                                        mb: 2
                                    }}
                                />
                            </Box>
                        </Box>
                        <Box sx={{
                            width: {
                                xs: "100%",
                                md: "35%"
                            },
                        }}>
                            <Box sx={{
                                py: 2,
                                px: {
                                    xs: 2,
                                    md: 5
                                },
                                position: 'relative'
                            }}>

                                <Typography variant='h4' sx={{
                                    fontSize: "32px",
                                    mb: 2,
                                    width: "80%"
                                }}>
                                    {product.title}
                                </Typography>
                                <Typography variant='h6' sx={{ fontWeight: 300 }}>{product.content}</Typography>
                                <Bookmark product={product} />
                                <Box sx={{
                                    my: 1,
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    justifyContent: "start"
                                }}>
                                    <Link component={RouterLink} to={`/offers/propose?product=${product.id}`} underline="none" sx={{
                                        my: 1,
                                        mr: 1
                                    }}>
                                        <Button variant="outlined"
                                            sx={{
                                                color: "black",
                                                borderColor: "black",
                                                '&:hover': {
                                                    background: "#00000010",
                                                    borderColor: "black",
                                                },
                                            }}>
                                            Faire une offre
                                        </Button>
                                    </Link>
                                    <Link component={RouterLink} to="/login" underline="none" sx={{
                                        my: 1,
                                        mr: 1
                                    }}>
                                        <Button variant="solid"
                                            sx={{
                                                color: "white",
                                                background: "black",
                                                '&:hover': {
                                                    background: "#00000099",
                                                },
                                            }}>
                                            Acheter
                                        </Button>
                                    </Link>
                                </Box>
                                <Divider sx={{
                                    my: 1
                                }} />
                                <Typography variant='h6' sx={{ fontWeight: 300 }}>Date de publication</Typography>
                                <Typography variant='body1' sx={{ fontWeight: "bold" }}>{fDateTime(product.createdAt)}</Typography>
                                <Divider sx={{
                                    my: 1
                                }} />
                                <Typography variant='h6' sx={{ fontWeight: 300 }}>Auteur</Typography>
                                <Typography variant='body1' sx={{ fontWeight: "bold" }}>{product.user.pseudo}</Typography>
                                <Divider sx={{
                                    my: 1
                                }} />
                                <Typography variant='h6' sx={{ fontWeight: 300 }}>Catégorie</Typography>
                                <Chip label={product.category.title} sx={{ my: 1 }} />
                                <Divider sx={{
                                    my: 1
                                }} />
                                <Typography variant='h6' sx={{ fontWeight: 300 }}>Prix</Typography>
                                <Typography variant='body1' sx={{ fontWeight: "bold" }}>{fCurrency(product.price)}</Typography>
                                <Divider sx={{
                                    my: 1
                                }} />
                                <Box sx={{
                                    my: 2,
                                    p: 2,
                                    border: "1px solid #DDD",
                                    borderRadius: "7.5px"
                                }}>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'start',
                                        alignItems: 'center',
                                        mb: 2
                                    }}>
                                        <GppGoodIcon fontSize='small' sx={{
                                            background: "#00000014",
                                            p: .5,
                                            borderRadius: "50%"
                                        }} />
                                        <Typography variant='body2'
                                            sx={{ ml: 2 }}
                                        >
                                            Bénéficiez de la protection acheteurs
                                        </Typography>
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'start',
                                        alignItems: 'center',
                                        mb: 1
                                    }}>
                                        <LockOutlinedIcon fontSize='small' sx={{
                                            background: "#00000014",
                                            p: .5,
                                            borderRadius: "50%"
                                        }} />
                                        <Typography variant='body2'
                                            sx={{ ml: 2 }}
                                        >
                                            Paiement sécurisé CB - Visa - Master Card
                                        </Typography>
                                    </Box>

                                </Box>
                                <Divider sx={{
                                    my: 1
                                }} />
                                <Typography variant='body1' sx={{ fontWeight: 400, mb: 1 }}>Protection</Typography>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'start',
                                    alignItems: 'center',
                                    mb: 1
                                }}>
                                    <LocalShippingIcon fontSize='small' sx={{
                                        background: "#00000014",
                                        p: 1,
                                        borderRadius: "50%"
                                    }} />
                                    <Typography variant='body2'
                                        sx={{ ml: 2 }}
                                    >
                                        Votre argent est sécurisé jusqu’à la confirmation de récupération de l’article
                                    </Typography>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'start',
                                    alignItems: 'center',
                                    mb: 1
                                }}>
                                    <GroupIcon fontSize='small' sx={{
                                        background: "#00000014",
                                        p: 1,
                                        borderRadius: "50%"
                                    }} />
                                    <Typography variant='body2'
                                        sx={{ ml: 2 }}
                                    >
                                        Une équipe dédiée à votre service
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{
                        mt: 5,
                        p: 2
                    }}>
                        <Typography variant='h5' sx={{
                            width: {
                                xs: "100%",
                                md: "80%"
                            },
                            fontWeight: 300,
                            mb: 5
                        }}>
                            Si vous souhaitez explorer les autres œuvres de cette artiste, ne manquez pas cette occasion !
                        </Typography>
                        <Box sx={{
                            display: "flex",
                            alignItems: 'center',
                            mb: 3
                        }}>
                            <Avatar {...stringAvatarSquare(product.user.pseudo)} />
                            <Box>
                                <Typography variant='h4' sx={{ fontWeight: 300, mb: 1 }}>
                                    {product.user.pseudo}
                                </Typography>
                                <Typography variant='body1' sx={{ fontWeight: 300 }}>Auteur</Typography>
                            </Box>
                        </Box>
                        <Link component={RouterLink} to={`/profile/${product.user.pseudo}`} underline="none">
                            <Button
                                variant="outlined"
                                sx={{
                                    width: "35ch",
                                    color: "black",
                                    borderColor: "black",
                                    borderRadius: "50px",
                                    py: 1,
                                    px: 2,
                                    '&:hover': {
                                        background: "#00000010",
                                        borderColor: "black",
                                    },
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                Découvrir l'artiste
                                <ArrowForwardIosIcon />
                            </Button>
                        </Link>
                    </Box>
                </>
            }
        </Container >
    )
}

import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import {
    Container,
    Box,
    CardMedia,
    Button,
    FormControl,
    FormHelperText,
    Grid, IconButton,
    InputAdornment, InputLabel,
    OutlinedInput,
    Accordion,
    AccordionSummary,
    Divider,
    TextField,
    Typography,
    AccordionDetails,
    Chip
} from '@mui/material';

import { fCurrency } from '../../utils/formatNumber';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
    Check as CheckIcon,
    ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';

import { UserContext } from '../../utils/UserContext';
import { fDate } from '../../utils/formatTime';

export default function PaymentPage({ user }) {
    const { showNotification } = useContext(UserContext);
    const navigate = useNavigate();
    const location = new URL(window.location.href);
    const searchParams = new URLSearchParams(location.search);

    const [product, setProduct] = useState(null);
    const [total, setTotal] = useState("");

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleMenuMoreClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuMoreClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: `${process.env.REACT_APP_API_URL}/products/${searchParams.get('product')}`,
                    headers: user ? { 'Authorization': `Bearer ${user.token}` } : undefined
                };

                await axios.request(config)
                    .then(res => {
                        // console.log("product", res.data)
                        setProduct(res.data);
                    })

            } catch (err) {
                console.error(err);
                navigate("/404");
            }
        }

        const totalOrder = () => {
            if (product && product.priceOffer == null) {
                setTotal(product.price + (product.price * 4 / 100));
            } else if (product && product.priceOffer !== null) {
                setTotal(product.priceOffer + (product.priceOffer * 4 / 100));
            }
        }

        fetchProduct();
        totalOrder();
    }, [user, product])

    const handlePayment = () => {
        navigate(`/payment?product=${product.id}`);
    }

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
                            width: "100%",
                            display: { xs: "block", md: "none" },
                            mb: 5,
                            p: 0
                        }}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography variant='h6'>Détails commande</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box sx={{
                                        py: 2,
                                        px: {
                                            xs: 2,
                                            md: 5
                                        },
                                        position: 'relative'
                                    }}>
                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                        }}>
                                            <CardMedia
                                                key={product?.images[0]?.id}
                                                component="img"
                                                loading="lazy"
                                                alt={product?.images[0]?.url}
                                                image={process.env.REACT_APP_API_URL + "/media/" + product?.images[0]?.url}
                                                sx={{
                                                    aspectRatio: "4/4",
                                                    objectFit: 'cover',
                                                    width: 75,
                                                    height: 75,
                                                    border: "1px solid #DDD",
                                                    borderRadius: "7.5px"
                                                }}
                                            />
                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                width: "100%",
                                                py: 1,
                                                pl: 2
                                            }}>
                                                <Typography variant='body1' sx={{ fontWeight: 300 }}>
                                                    {product.title}
                                                </Typography>
                                                {product.priceOffer !== null ?
                                                    <Box sx={{
                                                        display: "flex"
                                                    }}>
                                                        <Typography variant='h6'
                                                            sx={{
                                                                fontWeight: "bold",
                                                                mr: 2
                                                            }}>{fCurrency(product.priceOffer)}</Typography>
                                                    </Box>
                                                    :
                                                    <Typography variant='h6'
                                                        sx={{
                                                            fontWeight: "bold"
                                                        }}>{fCurrency(product.price)}</Typography>
                                                }
                                            </Box>
                                        </Box>
                                        <Divider sx={{
                                            mt: 3
                                        }} />
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            py: 1
                                        }}>
                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                            }}>
                                                <Typography variant='h6' sx={{ fontWeight: 300 }}>
                                                    Sous-total
                                                </Typography>
                                                <Box sx={{
                                                    display: "flex"
                                                }}>
                                                    {product.priceOffer !== null ?
                                                        <Typography variant='h6'
                                                            sx={{
                                                                fontWeight: "bold",
                                                                mr: 2
                                                            }}>{fCurrency(product.priceOffer)}</Typography>
                                                        :
                                                        <Typography variant='h6'
                                                            sx={{
                                                                fontWeight: "bold"
                                                            }}>{fCurrency(product.price)}</Typography>
                                                    }
                                                </Box>
                                            </Box>
                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                            }}>
                                                <Typography variant='body1' sx={{ fontWeight: 300 }}>
                                                    Protection acheteurs
                                                </Typography>
                                                <Box sx={{
                                                    display: "flex"
                                                }}>
                                                    <Typography variant='body1'
                                                        sx={{
                                                            fontWeight: "bold"
                                                        }}>{fCurrency(product.price * 4 / 100)}</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Divider sx={{
                                            mt: 3
                                        }} />
                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            py: 1
                                        }}>
                                            <Typography variant='h6' sx={{ fontWeight: 300 }}>
                                                Total
                                            </Typography>
                                            <Box sx={{
                                                display: "flex"
                                            }}>
                                                <Typography variant='h6'
                                                    sx={{
                                                        fontWeight: "bold"
                                                    }}>{fCurrency(total)}</Typography>
                                            </Box>
                                        </Box>
                                        <Typography variant='body1' sx={{ fontWeight: 400, mt: 5 }}>Protection acheteurs</Typography>
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
                                                mb: 1
                                            }}>
                                                <CheckIcon fontSize='small' sx={{
                                                    color: "green"
                                                }} />
                                                <Typography variant='body2'
                                                    sx={{
                                                        ml: 2,
                                                        color: "grey"
                                                    }}
                                                >
                                                    Paiement sécurisé CB - Visa - Master Card
                                                </Typography>
                                            </Box>
                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'start',
                                                alignItems: 'center',
                                                mb: 1
                                            }}>
                                                <CheckIcon fontSize='small' sx={{
                                                    color: "green"
                                                }} />
                                                <Typography variant='body2'
                                                    sx={{
                                                        ml: 2,
                                                        color: "grey"
                                                    }}
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
                                                <CheckIcon fontSize='small' sx={{
                                                    color: "green"
                                                }} />
                                                <Typography variant='body2'
                                                    sx={{
                                                        ml: 2,
                                                        color: "grey"
                                                    }}
                                                >
                                                    Une équipe dédiée à votre service
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                        <Box sx={{
                            width: {
                                xs: "100%",
                                md: "60%",
                            },
                            position: 'relative',
                        }}>
                            <Box
                                component="form"
                                action="POST"
                                // onSubmit={handleSubmit(onSubmitPatchUser)}
                                sx={{
                                    position: "relative",
                                    px: {
                                        xs: 2,
                                        md: 5
                                    }
                                }}
                            >
                                <Typography variant='h5' sx={{ mb: 3 }}>Procédure de paiement</Typography>
                                <Grid container spacing={2} rowSpacing={2}>
                                    <Box
                                        sx={{
                                            width: "100%",
                                            display: 'flex',
                                            flexDirection: {
                                                xs: "column",
                                                md: "row"
                                            },
                                            justifyContent: 'space-between',
                                            px: 1,
                                            pt: 5,
                                            mb: 5
                                        }}>
                                        <Typography
                                            variant='subtitle1'
                                            sx={{
                                                width: {
                                                    xs: "100%",
                                                    md: "40%"
                                                },
                                                display: 'flex',
                                                alignItems: 'center',
                                                pl: {
                                                    xs: 0,
                                                    md: 2
                                                },
                                                mb: {
                                                    xs: 2,
                                                    md: 0
                                                }
                                            }}>Contact</Typography>
                                        <Grid container spacing={2} rowSpacing={2}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id="email"
                                                    // value={userProfile.email}
                                                    placeholder="Adresse email"
                                                    fullWidth
                                                // {...patchUser("email", {
                                                //     required: true,
                                                //     onChange: (e) => {
                                                //         setUserProfile({ ...userProfile, email: e.target.value });
                                                //     }
                                                // })}
                                                // helperText={errors.email && "Email requis."}
                                                // error={Boolean(errors.email)}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Typography variant='h6' sx={{ mx: 3, my: 1 }}>Adresse de livraison</Typography>
                                    <Box
                                        sx={{
                                            width: "100%",
                                            display: 'flex',
                                            flexDirection: {
                                                xs: "column",
                                                md: "row"
                                            },
                                            justifyContent: 'space-between',
                                            px: 1,
                                            py: 2,
                                        }}>
                                        <Typography
                                            variant='subtitle1'
                                            sx={{
                                                width: {
                                                    xs: "100%",
                                                    md: "40%"
                                                },
                                                display: 'flex',
                                                alignItems: 'center',
                                                pl: {
                                                    xs: 0,
                                                    md: 2
                                                },
                                                mb: {
                                                    xs: 2,
                                                    md: 0
                                                }
                                            }}>Adresse</Typography>
                                        <Grid container spacing={2} rowSpacing={2}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id="address"
                                                    // value={userProfile.address}
                                                    placeholder="Adresse"
                                                    fullWidth
                                                // {...patchUser("address", {
                                                //     required: true,
                                                //     onChange: (e) => {
                                                //         setUserProfile({ ...userProfile, address: e.target.value });
                                                //     }
                                                // })}
                                                // helperText={errors.address && "Adresse requis."}
                                                // error={Boolean(errors.address)}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Box
                                        sx={{
                                            width: "100%",
                                            display: 'flex',
                                            flexDirection: {
                                                xs: "column",
                                                md: "row"
                                            },
                                            justifyContent: 'space-between',
                                            px: 1,
                                            py: 2,
                                        }}>
                                        <Typography
                                            variant='subtitle1'
                                            sx={{
                                                width: {
                                                    xs: "100%",
                                                    md: "40%"
                                                },
                                                display: 'flex',
                                                alignItems: 'center',
                                                pl: {
                                                    xs: 0,
                                                    md: 2
                                                },
                                                mb: {
                                                    xs: 2,
                                                    md: 0
                                                }
                                            }}>Adresse complémentaire</Typography>
                                        <Grid container spacing={2} rowSpacing={2}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id="additionalAddress"
                                                    // value={userProfile.additionalAddress}
                                                    placeholder="Appartement, étage, suite..."
                                                    fullWidth
                                                // {...patchUser("additionalAddress", {
                                                //     onChange: (e) => {
                                                //         setUserProfile({ ...userProfile, additionalAddress: e.target.value });
                                                //     }
                                                // })}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Box
                                        sx={{
                                            width: "100%",
                                            display: 'flex',
                                            flexDirection: {
                                                xs: "column",
                                                md: "row"
                                            },
                                            justifyContent: 'space-between',
                                            px: 1,
                                            py: 2,
                                        }}>
                                        <Typography
                                            variant='subtitle1'
                                            sx={{
                                                width: {
                                                    xs: "100%",
                                                    md: "40%"
                                                },
                                                display: 'flex',
                                                alignItems: 'center',
                                                pl: {
                                                    xs: 0,
                                                    md: 2
                                                },
                                                mb: {
                                                    xs: 2,
                                                    md: 0
                                                }
                                            }}>Ville et code postale</Typography>
                                        <Grid container spacing={2} rowSpacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    id="city"
                                                    // value={userProfile.city}
                                                    placeholder="Ville"
                                                    fullWidth
                                                // {...patchUser("city", {
                                                //     required: true,
                                                //     onChange: (e) => {
                                                //         setUserProfile({ ...userProfile, city: e.target.value });
                                                //     }
                                                // })}
                                                // helperText={errors.city && "Ville requis."}
                                                // error={Boolean(errors.city)}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    type='number'
                                                    id="zipCode"
                                                    // value={userProfile.zipCode}
                                                    placeholder="Code postale"
                                                    fullWidth
                                                // {...patchUser("zipCode", {
                                                //     required: true,
                                                //     maxLength: {
                                                //         value: 5,
                                                //         message: "Code postale requis et ne peut pas dépasser 5 caractères"
                                                //     },
                                                //     minLength: {
                                                //         value: 5,
                                                //         message: "Code postale requis et doit être de 5 caractères"
                                                //     },
                                                //     onChange: (e) => {
                                                //         setUserProfile({ ...userProfile, zipCode: e.target.value.slice(0, 5) });
                                                //     }
                                                // })}
                                                // helperText={errors.zipCode && errors.zipCode.message}
                                                // error={Boolean(errors.zipCode)}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Grid item xs={12} sx={{
                                        display: "flex",
                                        justifyContent: 'end',
                                        gap: "15px"
                                    }}>
                                        <Button
                                            type='submit'
                                            variant="solid"
                                            sx={{
                                                py: 1.25,
                                                px: 3,
                                                color: "white",
                                                background: "black",
                                                '&:hover': {
                                                    background: "#00000099",
                                                },
                                            }}>
                                            Sauvegarder
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                        <Box sx={{
                            width: {
                                xs: "100%",
                                md: "40%"
                            },
                            display: { xs: "none", md: "flex" }
                        }}>
                            <Box sx={{
                                py: 2,
                                px: {
                                    xs: 2,
                                    md: 5
                                },
                                position: 'relative'
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}>
                                    <CardMedia
                                        key={product?.images[0]?.id}
                                        component="img"
                                        loading="lazy"
                                        alt={product?.images[0]?.url}
                                        image={process.env.REACT_APP_API_URL + "/media/" + product?.images[0]?.url}
                                        sx={{
                                            aspectRatio: "4/4",
                                            objectFit: 'cover',
                                            width: 75,
                                            height: 75,
                                            border: "1px solid #DDD",
                                            borderRadius: "7.5px"
                                        }}
                                    />
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        width: "100%",
                                        py: 1,
                                        pl: 2
                                    }}>
                                        <Typography variant='body1' sx={{ fontWeight: 300 }}>
                                            {product.title}
                                        </Typography>
                                        {product.priceOffer !== null ?
                                            <Box sx={{
                                                display: "flex"
                                            }}>
                                                <Typography variant='h6'
                                                    sx={{
                                                        fontWeight: "bold",
                                                        mr: 2
                                                    }}>{fCurrency(product.priceOffer)}</Typography>
                                            </Box>
                                            :
                                            <Typography variant='h6'
                                                sx={{
                                                    fontWeight: "bold"
                                                }}>{fCurrency(product.price)}</Typography>
                                        }
                                    </Box>
                                </Box>
                                <Divider sx={{
                                    mt: 3
                                }} />
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    py: 1
                                }}>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    }}>
                                        <Typography variant='h6' sx={{ fontWeight: 300 }}>
                                            Sous-total
                                        </Typography>
                                        <Box sx={{
                                            display: "flex"
                                        }}>
                                            {product.priceOffer !== null ?
                                                <Typography variant='h6'
                                                    sx={{
                                                        fontWeight: "bold",
                                                        mr: 2
                                                    }}>{fCurrency(product.priceOffer)}</Typography>
                                                :
                                                <Typography variant='h6'
                                                    sx={{
                                                        fontWeight: "bold"
                                                    }}>{fCurrency(product.price)}</Typography>
                                            }
                                        </Box>
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    }}>
                                        <Typography variant='body1' sx={{ fontWeight: 300 }}>
                                            Protection acheteurs
                                        </Typography>
                                        <Box sx={{
                                            display: "flex"
                                        }}>
                                            <Typography variant='body1'
                                                sx={{
                                                    fontWeight: "bold"
                                                }}>{fCurrency(product.price * 4 / 100)}</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                                <Divider sx={{
                                    mt: 3
                                }} />
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    py: 1
                                }}>
                                    <Typography variant='h6' sx={{ fontWeight: 300 }}>
                                        Total
                                    </Typography>
                                    <Box sx={{
                                        display: "flex"
                                    }}>
                                        <Typography variant='h6'
                                            sx={{
                                                fontWeight: "bold"
                                            }}>{fCurrency(total)}</Typography>
                                    </Box>
                                </Box>
                                <Typography variant='body1' sx={{ fontWeight: 400, mt: 5 }}>Protection acheteurs</Typography>
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
                                        mb: 1
                                    }}>
                                        <CheckIcon fontSize='small' sx={{
                                            color: "green"
                                        }} />
                                        <Typography variant='body2'
                                            sx={{
                                                ml: 2,
                                                color: "grey"
                                            }}
                                        >
                                            Paiement sécurisé CB - Visa - Master Card
                                        </Typography>
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'start',
                                        alignItems: 'center',
                                        mb: 1
                                    }}>
                                        <CheckIcon fontSize='small' sx={{
                                            color: "green"
                                        }} />
                                        <Typography variant='body2'
                                            sx={{
                                                ml: 2,
                                                color: "grey"
                                            }}
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
                                        <CheckIcon fontSize='small' sx={{
                                            color: "green"
                                        }} />
                                        <Typography variant='body2'
                                            sx={{
                                                ml: 2,
                                                color: "grey"
                                            }}
                                        >
                                            Une équipe dédiée à votre service
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </>
            }
        </Container >
    )
}

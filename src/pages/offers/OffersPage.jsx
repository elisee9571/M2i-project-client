import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Chip, Container, Divider, FormControl, FormHelperText, InputAdornment, InputLabel, OutlinedInput, Paper, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { fCurrency } from '../../utils/formatNumber';
import { fDate } from '../../utils/formatTime';
import {
    ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import CardOffer from '../../components/card/CardOffer';

export default function OffersPages({ user }) {
    const location = new URL(window.location.href);
    const searchParams = new URLSearchParams(location.search);

    const [product, setProduct] = useState([]);
    const [offers, setOffers] = useState([]);

    const [amount, setAmount] = useState(null);

    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        const fetchProduct = async () => {
            axios.get(`${process.env.REACT_APP_API_URL}/products/${searchParams.get('product')}`)
                .then(res => {
                    // console.log("product", res.data)
                    setProduct(res.data);
                }).catch(err => console.error(err));
        }

        const fetchOffers = async () => {
            if (user) {
                try {
                    const config = {
                        method: 'get',
                        maxBodyLength: Infinity,
                        url: `${process.env.REACT_APP_API_URL}/offers/${searchParams.get('product')}`,
                        headers: {
                            'Authorization': `Bearer ${user.token}`
                        }
                    };

                    await axios.request(config)
                        .then(res => {
                            // console.log("offers", res.data)
                            setOffers(res.data);
                        }).catch(err => console.error(err));

                } catch (error) {
                    console.error(error);
                }
            }
        }

        fetchProduct();
        fetchOffers();
    }, [searchParams.get('product'), user, offers]);

    const handleChangeAmout = async (e) => {
        setAmount(e.target.value);
    }

    const onSubmitOffer = async (data, e) => {
        e.preventDefault();

        if (user) {
            try {
                const config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: `${process.env.REACT_APP_API_URL}/offers/propose/${searchParams.get('product')}`,
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    },
                    data: data
                };

                await axios.request(config)
                    .then(res => {
                        console.log(res.data)
                    }).catch(err => console.error(err));

            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <Container sx={{
            py: 5,
            minHeight: "100vh"
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: {
                    xs: "column",
                    md: "row"
                },
                justifyContent: 'space-between',
                alignItems: {
                    xs: "center",
                    md: "start"
                },
                p: {
                    xs: 0,
                    md: 1
                }
            }}>
                {product.user &&
                    <Box sx={{
                        width: "100%",
                        display: { xs: "block", md: "none" },
                        mb: 3,
                        p: 0
                    }}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography variant='h6'>Résumé</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{
                                p: 3
                            }}>
                                <Typography variant='h4' sx={{
                                    fontSize: "32px",
                                    mb: 2,
                                    width: "80%"
                                }}>
                                    {product.title}
                                </Typography>
                                <Typography variant='h6' sx={{ fontWeight: 300 }}>{product.content}</Typography>
                                <Divider sx={{
                                    my: 1
                                }} />
                                <Typography variant='h6' sx={{ fontWeight: 300 }}>Date de publication</Typography>
                                <Typography variant='body1' sx={{ fontWeight: "bold" }}>{fDate(product.createdAt)}</Typography>
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
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                }
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: {
                        xs: "100%",
                        md: "55%"
                    }
                }}>
                    <Paper sx={{
                        mb: 2
                    }}>
                        <Box sx={{
                            p: 2
                        }}>
                            {product.user &&
                                <Typography variant='h6'
                                    sx={{
                                        pt: 2,
                                        textAlign: "center"
                                    }}
                                >
                                    Envoyer une offre à <strong>{product.user.pseudo}</strong>
                                </Typography>
                            }
                            <Box
                                sx={{
                                    flex: '1',
                                    display: 'flex',
                                    flexDirection: "column",
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    p: 5
                                }}
                                component="form"
                                action="POST"
                                onSubmit={handleSubmit(onSubmitOffer)}
                            >
                                <FormControl fullWidth sx={{
                                    pb: 2
                                }}>
                                    <InputLabel htmlFor="amount" error={Boolean(errors.amount)}>Montant de l'offre</InputLabel>
                                    <OutlinedInput
                                        id="amount"
                                        label="Montant de l'offre"
                                        type="number"
                                        endAdornment={
                                            <InputAdornment
                                                position="end"
                                                color={errors.amount && "error"}
                                            >
                                                €
                                            </InputAdornment>
                                        }
                                        {...register("amount", { required: true })}
                                        onChange={handleChangeAmout}
                                        error={Boolean(errors.amount)}
                                    />
                                    <FormHelperText error={Boolean(errors.amount)}>
                                        {(errors.amount && "Mot de passe requis et doit être superieur à 4 caracteres.")}
                                    </FormHelperText>
                                </FormControl>
                                <Button
                                    fullWidth
                                    type='submit'
                                    sx={{
                                        py: 1.5,
                                        borderRadius: 1.5,
                                        fontWeight: 700,
                                        background: "black",
                                        color: "white",
                                        '&:hover': {
                                            background: "#00000099"
                                        },
                                        '&:disabled': {
                                            background: "grey",
                                            color: "#fff"
                                        }
                                    }}
                                >
                                    Proposer
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                    {offers.length > 0 ? (
                        <>
                            {offers.map(offer => (
                                <CardOffer key={offer.id} offer={offer} user={user} />
                            ))}
                        </>
                    ) : (
                        <Typography variant='h6'>Vous avez aucune proposition d'offre</Typography>
                    )}
                </Box>
                {product.user &&
                    <Box sx={{
                        width: "40%",
                        p: 2,
                        display: { xs: "none", md: "block" }
                    }}>
                        <Typography variant='h3' sx={{
                            mb: 2
                        }}>
                            Résumé
                        </Typography>
                        <Typography variant='h4' sx={{
                            fontSize: "32px",
                            mb: 2,
                            width: "80%"
                        }}>
                            {product.title}
                        </Typography>
                        <Typography variant='h6' sx={{ fontWeight: 300 }}>{product.content}</Typography>
                        <Divider sx={{
                            my: 1
                        }} />
                        <Typography variant='h6' sx={{ fontWeight: 300 }}>Date de publication</Typography>
                        <Typography variant='body1' sx={{ fontWeight: "bold" }}>{fDate(product.createdAt)}</Typography>
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
                    </Box>
                }
            </Box>

        </Container>
    )
}
